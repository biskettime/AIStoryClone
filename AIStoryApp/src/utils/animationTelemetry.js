/**
 * Production Animation Performance Telemetry
 * Monitors animation performance and sends telemetry data for production optimization
 */

import { Platform } from 'react-native';

class AnimationTelemetry {
  constructor() {
    this.metrics = new Map();
    this.isProduction = __DEV__ === false;
    this.batchSize = 10;
    this.telemetryQueue = [];
    this.isEnabled = this.isProduction;
  }

  /**
   * Start tracking an animation performance metric
   */
  startTracking(animationId, animationType = 'default') {
    if (!this.isEnabled) return;

    const startTime = performance.now();
    this.metrics.set(animationId, {
      animationType,
      startTime,
      platform: Platform.OS,
      timestamp: Date.now(),
    });
  }

  /**
   * End tracking and record animation performance
   */
  endTracking(animationId, success = true, frameDrops = 0) {
    if (!this.isEnabled || !this.metrics.has(animationId)) return;

    const endTime = performance.now();
    const metric = this.metrics.get(animationId);
    const duration = endTime - metric.startTime;

    const telemetryData = {
      animationId,
      animationType: metric.animationType,
      duration: Math.round(duration * 100) / 100, // Round to 2 decimal places
      success,
      frameDrops,
      platform: metric.platform,
      timestamp: metric.timestamp,
      performance: this.categorizePerformance(duration),
      deviceInfo: this.getDeviceInfo(),
    };

    this.recordMetric(telemetryData);
    this.metrics.delete(animationId);
  }

  /**
   * Record frame drop for ongoing animation
   */
  recordFrameDrop(animationId) {
    if (!this.isEnabled || !this.metrics.has(animationId)) return;

    const metric = this.metrics.get(animationId);
    metric.frameDrops = (metric.frameDrops || 0) + 1;
  }

  /**
   * Categorize animation performance
   */
  categorizePerformance(duration) {
    if (duration <= 16.67) return 'excellent'; // 60fps
    if (duration <= 33.33) return 'good';      // 30fps
    if (duration <= 50) return 'fair';         // 20fps
    return 'poor';                             // <20fps
  }

  /**
   * Get basic device information for performance context
   */
  getDeviceInfo() {
    return {
      platform: Platform.OS,
      version: Platform.Version,
      isPad: Platform.isPad,
      isTV: Platform.isTV,
    };
  }

  /**
   * Record metric and manage batching
   */
  recordMetric(data) {
    this.telemetryQueue.push(data);

    // Send batch when queue is full
    if (this.telemetryQueue.length >= this.batchSize) {
      this.sendTelemetryBatch();
    }
  }

  /**
   * Send telemetry batch to analytics service
   */
  async sendTelemetryBatch() {
    if (!this.isEnabled || this.telemetryQueue.length === 0) return;

    const batch = [...this.telemetryQueue];
    this.telemetryQueue = [];

    try {
      // In production, this would send to your analytics service
      // For now, we'll log to console in development and store locally in production
      if (__DEV__) {
        console.log('🎬 Animation Telemetry Batch:', batch);
      } else {
        // In production, send to your analytics endpoint
        await this.sendToAnalytics(batch);
      }
    } catch (error) {
      console.warn('Failed to send animation telemetry:', error);
      // Re-queue failed items (up to a limit to prevent memory issues)
      if (this.telemetryQueue.length < 50) {
        this.telemetryQueue.unshift(...batch);
      }
    }
  }

  /**
   * Send telemetry to production analytics service
   */
  async sendToAnalytics(batch) {
    const payload = {
      type: 'animation_performance',
      timestamp: Date.now(),
      batch,
      sessionId: this.getSessionId(),
    };

    // Replace with your actual analytics endpoint
    const response = await fetch('https://your-analytics-service.com/telemetry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getApiKey()}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Analytics service responded with ${response.status}`);
    }
  }

  /**
   * Get or generate session ID for tracking
   */
  getSessionId() {
    if (!this.sessionId) {
      this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    return this.sessionId;
  }

  /**
   * Get API key for analytics service (implement based on your security model)
   */
  getApiKey() {
    // In production, this should come from secure storage or environment
    return process.env.ANALYTICS_API_KEY || 'your-api-key';
  }

  /**
   * Track common animation patterns
   */
  trackVIPScreenEntrance() {
    this.startTracking('vip_screen_entrance', 'screen_transition');
  }

  trackVIPScreenExit() {
    this.endTracking('vip_screen_entrance');
  }

  trackTabSwitch(fromTab, toTab) {
    const animationId = `tab_switch_${fromTab}_${toTab}`;
    this.startTracking(animationId, 'tab_switch');
    
    // Auto-end tracking after reasonable timeout
    setTimeout(() => {
      this.endTracking(animationId);
    }, 1000);
  }

  trackPlanSelection(planId) {
    const animationId = `plan_selection_${planId}`;
    this.startTracking(animationId, 'plan_selection');
    
    setTimeout(() => {
      this.endTracking(animationId);
    }, 500);
  }

  trackPurchaseButton() {
    this.startTracking('purchase_button_animation', 'button_interaction');
    
    setTimeout(() => {
      this.endTracking('purchase_button_animation');
    }, 300);
  }

  /**
   * Force send any remaining telemetry (call on app backgrounding)
   */
  flush() {
    if (this.telemetryQueue.length > 0) {
      this.sendTelemetryBatch();
    }
  }

  /**
   * Enable/disable telemetry (for debugging or user preference)
   */
  setEnabled(enabled) {
    this.isEnabled = enabled && this.isProduction;
  }

  /**
   * Get performance summary for debugging
   */
  getPerformanceSummary() {
    if (!__DEV__) return null;

    const summary = {
      totalMetrics: this.telemetryQueue.length,
      queueSize: this.telemetryQueue.length,
      isEnabled: this.isEnabled,
      platform: Platform.OS,
    };

    if (this.telemetryQueue.length > 0) {
      const performances = this.telemetryQueue.map(m => m.performance);
      summary.performanceDistribution = {
        excellent: performances.filter(p => p === 'excellent').length,
        good: performances.filter(p => p === 'good').length,
        fair: performances.filter(p => p === 'fair').length,
        poor: performances.filter(p => p === 'poor').length,
      };
    }

    return summary;
  }
}

// Export singleton instance
export const animationTelemetry = new AnimationTelemetry();

// Helper functions for common use cases
export const trackAnimation = (id, type) => animationTelemetry.startTracking(id, type);
export const endAnimation = (id, success, frameDrops) => animationTelemetry.endTracking(id, success, frameDrops);
export const trackFrameDrop = (id) => animationTelemetry.recordFrameDrop(id);

export default animationTelemetry;