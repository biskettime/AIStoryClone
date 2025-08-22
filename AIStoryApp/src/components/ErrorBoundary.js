import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { SPACING } from '../styles/globalStyles';
import { HapticManager } from '../utils/performance';

/**
 * Production-ready Error Boundary with enhanced error handling
 * Features:
 * - Comprehensive error logging and reporting
 * - User-friendly error recovery options
 * - Development vs production error displays
 * - Haptic feedback for error states
 * - Memory leak prevention
 */

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    this.setState({
      error,
      errorInfo,
    });

    // Trigger haptic feedback for error
    HapticManager.notificationError();

    // Log to crash reporting service in production
    if (!__DEV__) {
      this.logErrorToService(error, errorInfo);
    }

    // Development logging
    if (__DEV__) {
      console.error('ErrorBoundary caught an error:', error);
      console.error('Error info:', errorInfo);
    }
  }

  logErrorToService = (error, errorInfo) => {
    // In a real app, you would send this to a crash reporting service
    // like Crashlytics, Bugsnag, or Sentry
    try {
      const errorReport = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location?.href,
        userId: this.props.userId || 'anonymous',
        buildVersion: this.props.buildVersion || '1.0.0',
        retryCount: this.state.retryCount,
      };

      // Replace with your actual error reporting service
      // crashlytics().recordError(error);
      // Bugsnag.notify(error, errorReport);
      // Sentry.captureException(error, { extra: errorReport });
      
      console.log('Error report:', errorReport);
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };

  handleRetry = () => {
    HapticManager.lightImpact();
    
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
    }));

    // Optional callback for parent components
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  handleReportBug = () => {
    HapticManager.selectionChanged();
    
    // In a real app, you might open an email client or bug reporting form
    if (this.props.onReportBug) {
      this.props.onReportBug(this.state.error, this.state.errorInfo);
    } else {
      // Default behavior - could open email or feedback form
      console.log('Bug report requested');
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      // Default error UI
      return (
        <View style={styles.container}>
          <View style={styles.errorContainer}>
            {/* Error Icon */}
            <View style={styles.iconContainer}>
              <Ionicons 
                name="warning-outline" 
                size={64} 
                color={Colors.error} 
              />
            </View>

            {/* Error Message */}
            <Text style={styles.title}>
              {this.props.title || 'Oops! Something went wrong'}
            </Text>
            
            <Text style={styles.message}>
              {this.props.message || 'We\'re sorry for the inconvenience. Please try again.'}
            </Text>

            {/* Development Error Details */}
            {__DEV__ && this.state.error && (
              <View style={styles.debugContainer}>
                <Text style={styles.debugTitle}>Debug Information:</Text>
                <Text style={styles.debugText}>
                  {this.state.error.message}
                </Text>
                <Text style={styles.debugText}>
                  {this.state.error.stack}
                </Text>
              </View>
            )}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={this.handleRetry}
                accessible={true}
                accessibilityLabel="Retry"
                accessibilityRole="button"
              >
                <Ionicons name="refresh" size={20} color={Colors.text} />
                <Text style={styles.buttonText}>Try Again</Text>
              </TouchableOpacity>

              {!__DEV__ && (
                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton]}
                  onPress={this.handleReportBug}
                  accessible={true}
                  accessibilityLabel="Report Bug"
                  accessibilityRole="button"
                >
                  <Ionicons name="bug-outline" size={20} color={Colors.primary} />
                  <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                    Report Bug
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Retry Count */}
            {this.state.retryCount > 0 && (
              <Text style={styles.retryCount}>
                Retry attempts: {this.state.retryCount}
              </Text>
            )}
          </View>
        </View>
      );
    }

    // Render children normally
    return this.props.children;
  }
}

// Higher-order component for easy wrapping
export const withErrorBoundary = (WrappedComponent, errorBoundaryProps = {}) => {
  const WithErrorBoundaryComponent = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = 
    `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
};

// Lightweight error boundary for small components
export const SafeComponent = ({ children, fallback }) => (
  <ErrorBoundary 
    fallback={fallback || ((error, retry) => (
      <View style={styles.minimalistError}>
        <Text style={styles.minimalistText}>Failed to load</Text>
        <TouchableOpacity onPress={retry}>
          <Text style={styles.minimalistRetry}>Retry</Text>
        </TouchableOpacity>
      </View>
    ))}
  >
    {children}
  </ErrorBoundary>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  
  errorContainer: {
    alignItems: 'center',
    maxWidth: 300,
  },
  
  iconContainer: {
    marginBottom: SPACING.lg,
  },
  
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  
  message: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  
  debugContainer: {
    backgroundColor: Colors.surface,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.lg,
    width: '100%',
  },
  
  debugTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.error,
    marginBottom: SPACING.sm,
  },
  
  debugText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'monospace',
    marginBottom: SPACING.xs,
  },
  
  buttonContainer: {
    width: '100%',
    gap: SPACING.md,
  },
  
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 12,
    gap: SPACING.sm,
  },
  
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  
  secondaryButtonText: {
    color: Colors.primary,
  },
  
  retryCount: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: SPACING.md,
  },
  
  minimalistError: {
    backgroundColor: Colors.surface,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  minimalistText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: SPACING.sm,
  },
  
  minimalistRetry: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default ErrorBoundary;