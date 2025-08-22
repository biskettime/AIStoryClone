/**
 * Production Error Logging and Monitoring System
 * Comprehensive error tracking, reporting, and crash analytics
 */

import { Platform, DeviceInfo } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ErrorMonitoring {
  constructor() {
    this.isInitialized = false;
    this.isProduction = __DEV__ === false;
    this.errorQueue = [];
    this.maxQueueSize = 100;
    this.sessionId = this.generateSessionId();
    this.appStartTime = Date.now();
    this.criticalErrorTypes = new Set(['ReferenceError', 'TypeError', 'SyntaxError', 'NetworkError']);
    
    this.initialize();
  }

  /**
   * Initialize error monitoring system
   */
  async initialize() {
    if (this.isInitialized) return;

    try {
      // Set up global error handlers
      this.setupGlobalErrorHandlers();
      
      // Initialize device information
      await this.initializeDeviceInfo();
      
      // Set up periodic error reporting
      this.setupPeriodicReporting();
      
      // Load queued errors from storage
      await this.loadQueuedErrors();
      
      this.isInitialized = true;
      
      if (__DEV__) {
        console.log('🔍 Error Monitoring initialized');
      }
    } catch (error) {
      console.warn('Failed to initialize error monitoring:', error);
    }
  }

  /**
   * Setup global error handlers
   */
  setupGlobalErrorHandlers() {
    // React Native global error handler
    if (global.ErrorUtils) {
      const originalHandler = global.ErrorUtils.getGlobalHandler();
      
      global.ErrorUtils.setGlobalHandler((error, isFatal) => {
        this.logError(error, {
          isFatal,
          source: 'global_handler',
          timestamp: Date.now(),
        });
        
        // Call original handler to maintain default behavior
        if (originalHandler) {
          originalHandler(error, isFatal);
        }
      });
    }

    // Promise rejection handler
    const originalUnhandledRejection = global.onunhandledrejection;
    global.onunhandledrejection = (event) => {
      this.logError(new Error(event.reason || 'Unhandled Promise Rejection'), {
        source: 'unhandled_promise',
        reason: event.reason,
        promise: event.promise,
        timestamp: Date.now(),
      });
      
      if (originalUnhandledRejection) {
        originalUnhandledRejection(event);
      }
    };

    // Console error tracking
    const originalConsoleError = console.error;
    console.error = (...args) => {
      this.logConsoleError(args);
      originalConsoleError.apply(console, args);
    };
  }

  /**
   * Initialize device information for context
   */
  async initializeDeviceInfo() {
    try {
      this.deviceInfo = {
        platform: Platform.OS,
        platformVersion: Platform.Version,
        appVersion: require('../../package.json').version,
        buildNumber: Platform.OS === 'ios' ? 
          require('react-native').NativeModules.PlatformConstants?.buildNumber :
          require('react-native').NativeModules.PlatformConstants?.versionCode,
        deviceModel: Platform.OS === 'ios' ? 
          Platform.constants.systemName + ' ' + Platform.constants.systemVersion :
          'Android ' + Platform.Version,
        timestamp: Date.now(),
      };
    } catch (error) {
      this.deviceInfo = {
        platform: Platform.OS,
        error: 'Failed to get device info',
        timestamp: Date.now(),
      };
    }
  }

  /**
   * Log an error with context
   */
  logError(error, context = {}) {
    if (!this.isProduction && !context.force) {
      // In development, just log to console
      console.error('🚨 Error logged:', error, context);
      return;
    }

    const errorData = this.formatError(error, context);
    
    // Add to queue
    this.addToQueue(errorData);
    
    // Send immediately if critical
    if (this.isCriticalError(error)) {
      this.sendErrorImmediate(errorData);
    }
  }

  /**
   * Log VIP screen specific errors
   */
  logVIPScreenError(error, action, context = {}) {
    this.logError(error, {
      ...context,
      screen: 'VIPScreen',
      action,
      vip_context: true,
      timestamp: Date.now(),
    });
  }

  /**
   * Log purchase flow errors
   */
  logPurchaseError(error, step, planType, planId, context = {}) {
    this.logError(error, {
      ...context,
      error_type: 'purchase_flow',
      purchase_step: step,
      plan_type: planType,
      plan_id: planId,
      critical: true,
      timestamp: Date.now(),
    });
  }

  /**
   * Log animation performance issues
   */
  logAnimationError(error, animationType, duration, context = {}) {
    this.logError(error, {
      ...context,
      error_type: 'animation_performance',
      animation_type: animationType,
      duration_ms: duration,
      performance_issue: true,
      timestamp: Date.now(),
    });
  }

  /**
   * Log network errors
   */
  logNetworkError(error, endpoint, method, statusCode, context = {}) {
    this.logError(error, {
      ...context,
      error_type: 'network',
      endpoint,
      method,
      status_code: statusCode,
      network_issue: true,
      timestamp: Date.now(),
    });
  }

  /**
   * Log accessibility errors
   */
  logAccessibilityError(error, element, action, context = {}) {
    this.logError(error, {
      ...context,
      error_type: 'accessibility',
      element,
      action,
      accessibility_issue: true,
      timestamp: Date.now(),
    });
  }

  /**
   * Format error for consistent structure
   */
  formatError(error, context) {
    return {
      // Error details
      message: error.message || 'Unknown error',
      name: error.name || 'Error',
      stack: error.stack || 'No stack trace',
      
      // Context
      ...context,
      
      // Session information
      session_id: this.sessionId,
      timestamp: Date.now(),
      
      // Device information
      device_info: this.deviceInfo,
      
      // App state
      app_state: {
        uptime_ms: Date.now() - this.appStartTime,
        memory_usage: this.getMemoryUsage(),
        platform: Platform.OS,
      },
      
      // Error metadata
      error_id: this.generateErrorId(),
      severity: this.getSeverity(error, context),
      fingerprint: this.generateFingerprint(error),
    };
  }

  /**
   * Determine if error is critical
   */
  isCriticalError(error) {
    return this.criticalErrorTypes.has(error.name) ||
           error.message?.includes('payment') ||
           error.message?.includes('purchase') ||
           error.message?.includes('crash');
  }

  /**
   * Generate error severity level
   */
  getSeverity(error, context) {
    if (context.isFatal || context.critical) return 'critical';
    if (this.isCriticalError(error)) return 'high';
    if (context.performance_issue || context.accessibility_issue) return 'medium';
    return 'low';
  }

  /**
   * Generate unique error fingerprint for grouping
   */
  generateFingerprint(error) {
    const key = `${error.name}_${error.message}_${this.getStackSignature(error.stack)}`;
    return this.hashCode(key);
  }

  /**
   * Get stack trace signature for fingerprinting
   */
  getStackSignature(stack) {
    if (!stack) return 'no_stack';
    
    const lines = stack.split('\n').slice(0, 3); // First 3 lines
    return lines.map(line => {
      // Extract function name and file
      const match = line.match(/at (.+?) \((.+?):(\d+):\d+\)/);
      return match ? `${match[1]}@${match[2]}:${match[3]}` : line.trim();
    }).join('|');
  }

  /**
   * Simple hash function for fingerprinting
   */
  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Add error to queue for batch processing
   */
  addToQueue(errorData) {
    this.errorQueue.push(errorData);
    
    // Maintain queue size
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift(); // Remove oldest error
    }
    
    // Save to storage for persistence
    this.saveQueueToStorage();
  }

  /**
   * Send error immediately for critical issues
   */
  async sendErrorImmediate(errorData) {
    try {
      await this.sendErrorToService([errorData]);
    } catch (error) {
      console.warn('Failed to send critical error immediately:', error);
    }
  }

  /**
   * Setup periodic error reporting
   */
  setupPeriodicReporting() {
    // Send errors every 5 minutes
    setInterval(() => {
      if (this.errorQueue.length > 0) {
        this.flushErrors();
      }
    }, 5 * 60 * 1000);
  }

  /**
   * Flush all queued errors
   */
  async flushErrors() {
    if (this.errorQueue.length === 0) return;
    
    const errorsToSend = [...this.errorQueue];
    this.errorQueue = [];
    
    try {
      await this.sendErrorToService(errorsToSend);
      await this.clearStoredErrors();
    } catch (error) {
      // Re-queue errors if sending failed
      this.errorQueue.unshift(...errorsToSend);
      console.warn('Failed to send errors, re-queuing:', error);
    }
  }

  /**
   * Send errors to monitoring service
   */
  async sendErrorToService(errors) {
    if (!this.isProduction) {
      console.log('🔍 Would send errors to monitoring service:', errors);
      return;
    }

    const payload = {
      errors,
      session_id: this.sessionId,
      app_info: {
        version: this.deviceInfo.appVersion,
        platform: Platform.OS,
      },
      timestamp: Date.now(),
    };

    // Replace with your actual error monitoring service
    const response = await fetch('https://your-error-monitoring-service.com/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getApiKey()}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error service responded with ${response.status}`);
    }
  }

  /**
   * Log console errors
   */
  logConsoleError(args) {
    const error = new Error('Console Error');
    error.name = 'ConsoleError';
    error.message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    
    this.logError(error, {
      source: 'console',
      console_args: args,
      timestamp: Date.now(),
    });
  }

  /**
   * Get memory usage information
   */
  getMemoryUsage() {
    try {
      if (Platform.OS === 'android' && global.nativePerformanceNow) {
        return {
          heap_used: global.performance.memory?.usedJSHeapSize || 0,
          heap_total: global.performance.memory?.totalJSHeapSize || 0,
        };
      }
      return { available: false };
    } catch (error) {
      return { error: 'Failed to get memory info' };
    }
  }

  /**
   * Save error queue to persistent storage
   */
  async saveQueueToStorage() {
    try {
      await AsyncStorage.setItem(
        'error_monitoring_queue',
        JSON.stringify(this.errorQueue)
      );
    } catch (error) {
      console.warn('Failed to save error queue to storage:', error);
    }
  }

  /**
   * Load error queue from persistent storage
   */
  async loadQueuedErrors() {
    try {
      const stored = await AsyncStorage.getItem('error_monitoring_queue');
      if (stored) {
        const errors = JSON.parse(stored);
        this.errorQueue.push(...errors);
      }
    } catch (error) {
      console.warn('Failed to load queued errors:', error);
    }
  }

  /**
   * Clear stored errors after successful send
   */
  async clearStoredErrors() {
    try {
      await AsyncStorage.removeItem('error_monitoring_queue');
    } catch (error) {
      console.warn('Failed to clear stored errors:', error);
    }
  }

  /**
   * Generate unique session ID
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate unique error ID
   */
  generateErrorId() {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get API key for error monitoring service
   */
  getApiKey() {
    // In production, this should come from secure storage or environment
    return process.env.ERROR_MONITORING_API_KEY || 'your-api-key';
  }

  /**
   * Create error boundary component
   */
  createErrorBoundary() {
    const ErrorMonitoringInstance = this;
    
    return class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
      }

      static getDerivedStateFromError(error) {
        return { hasError: true, error };
      }

      componentDidCatch(error, errorInfo) {
        ErrorMonitoringInstance.logError(error, {
          source: 'react_error_boundary',
          component_stack: errorInfo.componentStack,
          error_boundary: true,
          critical: true,
        });
      }

      render() {
        if (this.state.hasError) {
          return this.props.fallback || null;
        }

        return this.props.children;
      }
    };
  }

  /**
   * Get monitoring statistics for debugging
   */
  getStats() {
    return {
      session_id: this.sessionId,
      queue_size: this.errorQueue.length,
      uptime_ms: Date.now() - this.appStartTime,
      is_initialized: this.isInitialized,
      is_production: this.isProduction,
      device_info: this.deviceInfo,
    };
  }
}

// Export singleton instance
export const errorMonitoring = new ErrorMonitoring();

// Helper functions for common use cases
export const logError = (error, context) => errorMonitoring.logError(error, context);
export const logVIPError = (error, action, context) => errorMonitoring.logVIPScreenError(error, action, context);
export const logPurchaseError = (error, step, planType, planId, context) => 
  errorMonitoring.logPurchaseError(error, step, planType, planId, context);
export const logAnimationError = (error, type, duration, context) => 
  errorMonitoring.logAnimationError(error, type, duration, context);
export const logNetworkError = (error, endpoint, method, status, context) => 
  errorMonitoring.logNetworkError(error, endpoint, method, status, context);

// Error Boundary Component
export const ErrorBoundary = errorMonitoring.createErrorBoundary();

export default errorMonitoring;