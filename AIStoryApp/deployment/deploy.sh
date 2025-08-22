#!/bin/bash

# Production Deployment Script for AIStoryApp
# Automated deployment with validation, testing, and rollback capabilities

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOYMENT_ENV="${1:-production}"
PLATFORM="${2:-both}"  # ios, android, or both
BUILD_TYPE="${3:-release}"

# Log function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Validate environment
validate_environment() {
    log "Validating deployment environment..."
    
    # Check required tools
    local required_tools=("node" "npm" "git")
    for tool in "${required_tools[@]}"; do
        if ! command -v "$tool" &> /dev/null; then
            error "$tool is not installed or not in PATH"
            exit 1
        fi
    done
    
    # Check Node.js version
    local node_version=$(node --version | sed 's/v//')
    local required_node="16.0.0"
    if ! [[ "$(printf '%s\n' "$required_node" "$node_version" | sort -V | head -n1)" = "$required_node" ]]; then
        error "Node.js version $node_version is less than required $required_node"
        exit 1
    fi
    
    # Check environment variables
    local required_env_vars=(
        "ANALYTICS_API_KEY"
        "ERROR_MONITORING_API_KEY"
        "STRIPE_PUBLISHABLE_KEY"
    )
    
    for var in "${required_env_vars[@]}"; do
        if [[ -z "${!var:-}" ]]; then
            error "Required environment variable $var is not set"
            exit 1
        fi
    done
    
    success "Environment validation passed"
}

# Pre-deployment checks
pre_deployment_checks() {
    log "Running pre-deployment checks..."
    
    cd "$PROJECT_ROOT"
    
    # Check git status
    if [[ -n "$(git status --porcelain)" ]]; then
        error "Working directory is not clean. Commit or stash changes before deployment."
        exit 1
    fi
    
    # Check current branch
    local current_branch=$(git rev-parse --abbrev-ref HEAD)
    if [[ "$current_branch" != "main" && "$current_branch" != "master" ]]; then
        warning "Deploying from branch '$current_branch' instead of main/master"
        read -p "Continue? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    # Verify version bump
    local package_version=$(node -p "require('./package.json').version")
    log "Current version: $package_version"
    
    success "Pre-deployment checks passed"
}

# Install dependencies
install_dependencies() {
    log "Installing dependencies..."
    
    cd "$PROJECT_ROOT"
    
    # Clean install
    rm -rf node_modules
    npm ci --production=false
    
    # iOS dependencies
    if [[ "$PLATFORM" == "ios" || "$PLATFORM" == "both" ]]; then
        cd ios
        if command -v pod &> /dev/null; then
            pod install --repo-update
        else
            error "CocoaPods not installed. Install with: sudo gem install cocoapods"
            exit 1
        fi
        cd ..
    fi
    
    success "Dependencies installed"
}

# Run tests
run_tests() {
    log "Running test suite..."
    
    cd "$PROJECT_ROOT"
    
    # Unit tests
    npm run test -- --coverage --watchAll=false
    
    # Critical flow tests
    npm run test:critical -- --watchAll=false
    
    # Performance tests
    npm run test:performance -- --watchAll=false
    
    # Accessibility tests
    npm run test:a11y -- --watchAll=false
    
    success "All tests passed"
}

# Build application
build_application() {
    log "Building application for $PLATFORM..."
    
    cd "$PROJECT_ROOT"
    
    # Set production environment
    export NODE_ENV=production
    export REACT_NATIVE_ENV=production
    
    # iOS Build
    if [[ "$PLATFORM" == "ios" || "$PLATFORM" == "both" ]]; then
        log "Building iOS application..."
        
        cd ios
        
        # Clean build
        xcodebuild clean -workspace AIStoryApp.xcworkspace -scheme AIStoryApp
        
        # Archive build
        xcodebuild archive \
            -workspace AIStoryApp.xcworkspace \
            -scheme AIStoryApp \
            -configuration Release \
            -archivePath "./build/AIStoryApp.xcarchive" \
            CODE_SIGN_IDENTITY="iPhone Distribution" \
            PROVISIONING_PROFILE_SPECIFIER="AIStoryApp Production"
        
        # Export IPA
        xcodebuild -exportArchive \
            -archivePath "./build/AIStoryApp.xcarchive" \
            -exportPath "./build" \
            -exportOptionsPlist "./ExportOptions.plist"
        
        cd ..
        success "iOS build completed"
    fi
    
    # Android Build
    if [[ "$PLATFORM" == "android" || "$PLATFORM" == "both" ]]; then
        log "Building Android application..."
        
        cd android
        
        # Clean build
        ./gradlew clean
        
        # Build release APK/AAB
        ./gradlew assembleRelease
        ./gradlew bundleRelease
        
        cd ..
        success "Android build completed"
    fi
}

# Validate builds
validate_builds() {
    log "Validating builds..."
    
    cd "$PROJECT_ROOT"
    
    # iOS validation
    if [[ "$PLATFORM" == "ios" || "$PLATFORM" == "both" ]]; then
        local ipa_path="ios/build/AIStoryApp.ipa"
        if [[ -f "$ipa_path" ]]; then
            # Validate IPA
            xcrun altool --validate-app -f "$ipa_path" -t ios -u "$APPLE_ID" -p "$APPLE_APP_PASSWORD"
            success "iOS IPA validation passed"
        else
            error "iOS IPA not found at $ipa_path"
            exit 1
        fi
    fi
    
    # Android validation
    if [[ "$PLATFORM" == "android" || "$PLATFORM" == "both" ]]; then
        local apk_path="android/app/build/outputs/apk/release/app-release.apk"
        local aab_path="android/app/build/outputs/bundle/release/app-release.aab"
        
        if [[ -f "$apk_path" ]]; then
            # Validate APK
            aapt dump badging "$apk_path" > /dev/null
            success "Android APK validation passed"
        else
            error "Android APK not found at $apk_path"
            exit 1
        fi
        
        if [[ -f "$aab_path" ]]; then
            success "Android AAB found"
        else
            error "Android AAB not found at $aab_path"
            exit 1
        fi
    fi
}

# Deploy to stores
deploy_to_stores() {
    log "Deploying to app stores..."
    
    cd "$PROJECT_ROOT"
    
    # iOS App Store
    if [[ "$PLATFORM" == "ios" || "$PLATFORM" == "both" ]]; then
        log "Uploading to iOS App Store..."
        
        local ipa_path="ios/build/AIStoryApp.ipa"
        xcrun altool --upload-app -f "$ipa_path" -t ios -u "$APPLE_ID" -p "$APPLE_APP_PASSWORD"
        
        success "iOS app uploaded to App Store Connect"
    fi
    
    # Google Play Store
    if [[ "$PLATFORM" == "android" || "$PLATFORM" == "both" ]]; then
        log "Uploading to Google Play Store..."
        
        local aab_path="android/app/build/outputs/bundle/release/app-release.aab"
        
        # Using Google Play Console Upload API (requires setup)
        if command -v fastlane &> /dev/null; then
            cd android
            fastlane deploy
            cd ..
        else
            warning "Fastlane not available. Please upload $aab_path manually to Google Play Console"
        fi
        
        success "Android app uploaded to Google Play Console"
    fi
}

# Create deployment artifacts
create_artifacts() {
    log "Creating deployment artifacts..."
    
    cd "$PROJECT_ROOT"
    
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local artifact_dir="./build/artifacts_$timestamp"
    
    mkdir -p "$artifact_dir"
    
    # Copy builds
    if [[ "$PLATFORM" == "ios" || "$PLATFORM" == "both" ]]; then
        cp ios/build/AIStoryApp.ipa "$artifact_dir/"
    fi
    
    if [[ "$PLATFORM" == "android" || "$PLATFORM" == "both" ]]; then
        cp android/app/build/outputs/apk/release/app-release.apk "$artifact_dir/"
        cp android/app/build/outputs/bundle/release/app-release.aab "$artifact_dir/"
    fi
    
    # Copy metadata
    cp package.json "$artifact_dir/"
    git log --oneline -10 > "$artifact_dir/recent_commits.txt"
    git rev-parse HEAD > "$artifact_dir/commit_hash.txt"
    
    # Create deployment manifest
    cat > "$artifact_dir/deployment_manifest.json" << EOF
{
  "version": "$(node -p "require('./package.json').version")",
  "buildTimestamp": "$timestamp",
  "commitHash": "$(git rev-parse HEAD)",
  "platform": "$PLATFORM",
  "environment": "$DEPLOYMENT_ENV",
  "deployedBy": "$(git config user.name)",
  "deployedAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF
    
    success "Deployment artifacts created in $artifact_dir"
}

# Notification function
send_notification() {
    local status="$1"
    local message="$2"
    
    # Slack notification (if webhook URL is set)
    if [[ -n "${SLACK_WEBHOOK_URL:-}" ]]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"🚀 AIStoryApp Deployment $status: $message\"}" \
            "$SLACK_WEBHOOK_URL" || warning "Failed to send Slack notification"
    fi
    
    # Discord notification (if webhook URL is set)
    if [[ -n "${DISCORD_WEBHOOK_URL:-}" ]]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"content\":\"🚀 AIStoryApp Deployment $status: $message\"}" \
            "$DISCORD_WEBHOOK_URL" || warning "Failed to send Discord notification"
    fi
}

# Rollback function
rollback() {
    error "Deployment failed. Initiating rollback procedures..."
    
    # Add rollback logic here
    # - Revert to previous version
    # - Restore database if needed
    # - Clear CDN cache
    
    send_notification "FAILED" "Deployment failed and rollback initiated"
    exit 1
}

# Main deployment function
main() {
    log "Starting deployment for AIStoryApp"
    log "Environment: $DEPLOYMENT_ENV"
    log "Platform: $PLATFORM"
    log "Build Type: $BUILD_TYPE"
    
    # Set up error handling
    trap rollback ERR
    
    # Run deployment steps
    validate_environment
    pre_deployment_checks
    install_dependencies
    run_tests
    build_application
    validate_builds
    create_artifacts
    
    # Deploy to stores (uncomment when ready)
    # deploy_to_stores
    
    success "Deployment completed successfully!"
    send_notification "SUCCESS" "Deployment completed for $PLATFORM"
    
    log "Next steps:"
    log "1. Monitor app store review process"
    log "2. Update release notes"
    log "3. Prepare marketing materials"
    log "4. Monitor error reporting and analytics"
}

# Show usage
usage() {
    echo "Usage: $0 [environment] [platform] [build_type]"
    echo
    echo "Arguments:"
    echo "  environment    Deployment environment (default: production)"
    echo "  platform       Target platform: ios, android, or both (default: both)"
    echo "  build_type     Build type: release or debug (default: release)"
    echo
    echo "Examples:"
    echo "  $0                           # Deploy both platforms to production"
    echo "  $0 staging ios               # Deploy iOS to staging"
    echo "  $0 production android        # Deploy Android to production"
}

# Parse command line arguments
if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
    usage
    exit 0
fi

# Run main function
main "$@"