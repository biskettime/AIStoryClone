/**
 * Production Deployment Configuration
 * Environment-specific settings for production deployment
 */

module.exports = {
  // App Configuration
  app: {
    name: 'AIStoryApp',
    displayName: 'AI Story',
    version: '1.0.0',
    buildNumber: '1',
    bundleIdentifier: {
      ios: 'com.aistory.app',
      android: 'com.aistory.app',
    },
    scheme: 'aistoryapp',
  },

  // Environment Variables
  environment: {
    NODE_ENV: 'production',
    API_BASE_URL: 'https://api.aistory.app',
    WS_BASE_URL: 'wss://ws.aistory.app',
    CDN_BASE_URL: 'https://cdn.aistory.app',
    
    // Analytics & Monitoring
    ANALYTICS_API_KEY: process.env.ANALYTICS_API_KEY,
    ERROR_MONITORING_API_KEY: process.env.ERROR_MONITORING_API_KEY,
    PERFORMANCE_MONITORING_KEY: process.env.PERFORMANCE_MONITORING_KEY,
    
    // Payment & Subscription
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    APPLE_PAY_MERCHANT_ID: process.env.APPLE_PAY_MERCHANT_ID,
    GOOGLE_PAY_MERCHANT_ID: process.env.GOOGLE_PAY_MERCHANT_ID,
    
    // Feature Flags
    ENABLE_VIP_FEATURES: 'true',
    ENABLE_ADS_FREE: 'true',
    ENABLE_TELEMETRY: 'true',
    ENABLE_ERROR_REPORTING: 'true',
    ENABLE_KOREAN_LOCALIZATION: 'true',
    
    // Security
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
  },

  // Build Configuration
  build: {
    optimization: {
      minify: true,
      obfuscation: true,
      treeShaking: true,
      bundleAnalyzer: false, // Set to true for bundle analysis
    },
    
    // Code Signing (iOS)
    ios: {
      codeSigningIdentity: 'iPhone Distribution',
      provisioningProfile: 'AIStoryApp Production',
      teamId: process.env.APPLE_TEAM_ID,
      bundleIdentifier: 'com.aistory.app',
      infoPlistPath: './ios/AIStoryApp/Info.plist',
      entitlementsPath: './ios/AIStoryApp/AIStoryApp.entitlements',
    },
    
    // Keystore (Android)
    android: {
      keystorePath: './android/app/release.keystore',
      keystorePassword: process.env.ANDROID_KEYSTORE_PASSWORD,
      keyAlias: process.env.ANDROID_KEY_ALIAS,
      keyPassword: process.env.ANDROID_KEY_PASSWORD,
      buildType: 'release',
      applicationId: 'com.aistory.app',
    },
  },

  // Asset Configuration
  assets: {
    compression: {
      images: {
        quality: 85,
        format: 'webp', // Fallback to original for unsupported devices
        progressive: true,
      },
      fonts: {
        subset: ['latin', 'korean'],
        formats: ['woff2', 'woff'],
      },
    },
    
    optimization: {
      lazyLoading: true,
      prefetching: true,
      cacheStrategy: 'network-first',
      maxCacheSize: '50MB',
    },
  },

  // Performance Configuration
  performance: {
    bundleSize: {
      maxInitialBundle: '2MB',
      maxAsyncChunk: '500KB',
      maxTotalSize: '10MB',
    },
    
    animation: {
      targetFrameRate: 60,
      maxAnimationDuration: '300ms',
      enableHardwareAcceleration: true,
    },
    
    memory: {
      maxHeapSize: '512MB',
      garbageCollectionThreshold: '256MB',
      imageMemoryLimit: '100MB',
    },
  },

  // Security Configuration
  security: {
    https: {
      enforceSSL: true,
      hsts: true,
      certificatePinning: true,
    },
    
    encryption: {
      algorithm: 'AES-256-GCM',
      keyRotationPeriod: '30d',
      encryptSensitiveData: true,
    },
    
    authentication: {
      sessionTimeout: '24h',
      maxLoginAttempts: 5,
      lockoutDuration: '15m',
    },
  },

  // Monitoring Configuration
  monitoring: {
    errorReporting: {
      enabled: true,
      sampleRate: 1.0, // 100% in production
      includeSourceMaps: false,
      maxBreadcrumbs: 50,
    },
    
    performanceMonitoring: {
      enabled: true,
      sampleRate: 0.1, // 10% sampling
      trackUserInteractions: true,
      trackNetworkRequests: true,
    },
    
    analytics: {
      enabled: true,
      trackScreenViews: true,
      trackUserActions: true,
      trackPurchases: true,
      anonymizeUserData: true,
    },
  },

  // Deployment Targets
  deployment: {
    ios: {
      minimumVersion: '13.0',
      targetDevices: ['iPhone', 'iPad'],
      orientations: ['portrait'],
      backgroundModes: ['background-processing'],
      capabilities: [
        'in-app-purchase',
        'push-notifications',
        'app-groups',
      ],
    },
    
    android: {
      minimumSdkVersion: 21, // Android 5.0
      targetSdkVersion: 34,  // Android 14
      compileSdkVersion: 34,
      architectures: ['arm64-v8a', 'armeabi-v7a', 'x86_64'],
      permissions: [
        'INTERNET',
        'ACCESS_NETWORK_STATE',
        'VIBRATE',
        'BILLING',
      ],
    },
  },

  // CDN Configuration
  cdn: {
    provider: 'CloudFlare', // or 'AWS CloudFront', 'Azure CDN'
    regions: ['us-east-1', 'eu-west-1', 'ap-southeast-1'],
    caching: {
      staticAssets: '1y',
      dynamicContent: '1h',
      apiResponses: '5m',
    },
    compression: {
      gzip: true,
      brotli: true,
      minSize: '1KB',
    },
  },

  // Database Configuration
  database: {
    type: 'postgresql', // or 'mongodb', 'mysql'
    connectionPool: {
      min: 5,
      max: 20,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
    },
    ssl: {
      required: true,
      rejectUnauthorized: true,
    },
    backup: {
      enabled: true,
      schedule: '0 2 * * *', // Daily at 2 AM
      retention: '30d',
    },
  },

  // Scaling Configuration
  scaling: {
    autoScaling: {
      enabled: true,
      minInstances: 2,
      maxInstances: 10,
      targetCPU: 70,
      targetMemory: 80,
    },
    
    loadBalancer: {
      algorithm: 'round-robin',
      healthCheck: {
        path: '/health',
        interval: '30s',
        timeout: '5s',
        threshold: 3,
      },
    },
  },

  // Compliance Configuration
  compliance: {
    gdpr: {
      enabled: true,
      consentRequired: true,
      dataRetention: '2y',
      rightToErasure: true,
    },
    
    ccpa: {
      enabled: true,
      optOutEnabled: true,
      dataTransparency: true,
    },
    
    appStore: {
      privacyManifest: true,
      dataCollection: {
        personalData: true,
        analyticsData: true,
        crashData: true,
      },
    },
  },
};