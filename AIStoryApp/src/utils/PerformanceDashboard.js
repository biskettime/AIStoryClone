import React, { useState, useEffect, useRef, memo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { SPACING } from '../styles/globalStyles';
import { PerformanceMonitor } from './performance';

/**
 * Development Performance Dashboard
 * Real-time monitoring of app performance metrics
 * Only available in development mode
 */

const { width } = Dimensions.get('window');

const PerformanceDashboard = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState({
    fps: 60,
    memoryUsage: 0,
    jsHeapSize: 0,
    renderTime: 0,
    bundleSize: 0,
    imagesCached: 0,
    animationsActive: 0,
  });

  const intervalRef = useRef(null);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  // Calculate FPS
  const measureFPS = () => {
    const now = performance.now();
    frameCountRef.current++;
    
    if (now - lastTimeRef.current >= 1000) {
      const fps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current));
      setMetrics(prev => ({ ...prev, fps }));
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }
    
    requestAnimationFrame(measureFPS);
  };

  // Monitor performance metrics
  useEffect(() => {
    if (!__DEV__ || !isVisible) return;

    // Start FPS monitoring
    measureFPS();

    // Monitor other metrics
    intervalRef.current = setInterval(() => {
      // Memory usage
      if (performance.memory) {
        const memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1048576); // MB
        const jsHeapSize = Math.round(performance.memory.totalJSHeapSize / 1048576); // MB
        
        setMetrics(prev => ({
          ...prev,
          memoryUsage,
          jsHeapSize,
        }));
      }

      // Track memory usage
      PerformanceMonitor.trackMemoryUsage();
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible]);

  // Performance status indicators
  const getPerformanceStatus = (metric, value) => {
    switch (metric) {
      case 'fps':
        if (value >= 55) return { color: Colors.performanceGood, status: 'Excellent' };
        if (value >= 30) return { color: Colors.performanceWarning, status: 'Good' };
        return { color: Colors.performancePoor, status: 'Poor' };
      
      case 'memory':
        if (value < 100) return { color: Colors.performanceGood, status: 'Low' };
        if (value < 250) return { color: Colors.performanceWarning, status: 'Medium' };
        return { color: Colors.performancePoor, status: 'High' };
      
      default:
        return { color: Colors.performanceGood, status: 'OK' };
    }
  };

  if (!__DEV__) return null;

  return (
    <>
      {/* Floating toggle button */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsVisible(!isVisible)}
        accessibilityLabel="Toggle performance dashboard"
      >
        <Ionicons 
          name={isVisible ? 'close' : 'speedometer'} 
          size={24} 
          color={Colors.text} 
        />
      </TouchableOpacity>

      {/* Performance overlay */}
      {isVisible && (
        <View style={styles.overlay}>
          <View style={styles.dashboard}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Performance Monitor</Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Ionicons name="close" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {/* FPS Monitor */}
              <View style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <Text style={styles.metricTitle}>Frame Rate</Text>
                  <View style={[
                    styles.statusIndicator,
                    { backgroundColor: getPerformanceStatus('fps', metrics.fps).color }
                  ]} />
                </View>
                <Text style={styles.metricValue}>{metrics.fps} FPS</Text>
                <Text style={[
                  styles.metricStatus,
                  { color: getPerformanceStatus('fps', metrics.fps).color }
                ]}>
                  {getPerformanceStatus('fps', metrics.fps).status}
                </Text>
              </View>

              {/* Memory Usage */}
              <View style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <Text style={styles.metricTitle}>Memory Usage</Text>
                  <View style={[
                    styles.statusIndicator,
                    { backgroundColor: getPerformanceStatus('memory', metrics.memoryUsage).color }
                  ]} />
                </View>
                <Text style={styles.metricValue}>{metrics.memoryUsage} MB</Text>
                <Text style={styles.metricSubtext}>
                  Heap: {metrics.jsHeapSize} MB
                </Text>
                <Text style={[
                  styles.metricStatus,
                  { color: getPerformanceStatus('memory', metrics.memoryUsage).color }
                ]}>
                  {getPerformanceStatus('memory', metrics.memoryUsage).status}
                </Text>
              </View>

              {/* Optimization Tips */}
              <View style={styles.metricCard}>
                <Text style={styles.metricTitle}>Optimization Tips</Text>
                <View style={styles.tipsList}>
                  {metrics.fps < 30 && (
                    <Text style={styles.tip}>• Consider reducing animation complexity</Text>
                  )}
                  {metrics.memoryUsage > 200 && (
                    <Text style={styles.tip}>• Check for memory leaks in components</Text>
                  )}
                  {metrics.fps >= 55 && metrics.memoryUsage < 100 && (
                    <Text style={[styles.tip, { color: Colors.performanceGood }]}>
                      • Performance is optimal!
                    </Text>
                  )}
                </View>
              </View>

              {/* Performance Actions */}
              <View style={styles.actionsCard}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => {
                    // Clear image cache
                    const { clearImageCache } = require('../components/OptimizedImage');
                    clearImageCache();
                    console.log('Image cache cleared');
                  }}
                >
                  <Text style={styles.actionButtonText}>Clear Image Cache</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => {
                    // Force garbage collection (if available)
                    if (global.gc) {
                      global.gc();
                      console.log('Garbage collection triggered');
                    }
                  }}
                >
                  <Text style={styles.actionButtonText}>Force GC</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => {
                    // Log performance summary
                    console.log('Performance Summary:', {
                      fps: metrics.fps,
                      memory: `${metrics.memoryUsage}MB`,
                      heap: `${metrics.jsHeapSize}MB`,
                      timestamp: new Date().toISOString(),
                    });
                  }}
                >
                  <Text style={styles.actionButtonText}>Log Summary</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  toggleButton: {
    position: 'absolute',
    top: 100,
    right: SPACING.md,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dashboard: {
    width: width * 0.9,
    maxHeight: '80%',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },

  content: {
    padding: SPACING.lg,
  },

  metricCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },

  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },

  metricTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: SPACING.xs,
  },

  metricSubtext: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginBottom: SPACING.xs,
  },

  metricStatus: {
    fontSize: 12,
    fontWeight: '600',
  },

  tipsList: {
    marginTop: SPACING.sm,
  },

  tip: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
    marginBottom: SPACING.xs,
  },

  actionsCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },

  actionButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    alignItems: 'center',
  },

  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default PerformanceDashboard;