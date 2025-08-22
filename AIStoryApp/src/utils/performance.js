import { Animated, InteractionManager, Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Performance Optimization Utilities
 * Provides enhanced animation, interaction, and memory management
 */

// Animation Performance Utilities
export class PerformanceAnimations {
  static createSpringAnimation(value, toValue, config = {}) {
    return Animated.spring(value, {
      toValue,
      useNativeDriver: true,
      tension: 300,
      friction: 8,
      ...config,
    });
  }

  static createTimingAnimation(value, toValue, config = {}) {
    return Animated.timing(value, {
      toValue,
      duration: 300,
      useNativeDriver: true,
      ...config,
    });
  }

  static createSequenceAnimation(animations) {
    return Animated.sequence(animations);
  }

  static createParallelAnimation(animations) {
    return Animated.parallel(animations);
  }

  // Optimized modal animations
  static modalSlideIn(translateY) {
    return this.createSpringAnimation(translateY, 0, {
      tension: 280,
      friction: 8,
    });
  }

  static modalSlideOut(translateY, screenHeight) {
    return this.createTimingAnimation(translateY, screenHeight, {
      duration: 250,
    });
  }

  static fadeIn(opacity) {
    return this.createTimingAnimation(opacity, 1, {
      duration: 200,
    });
  }

  static fadeOut(opacity) {
    return this.createTimingAnimation(opacity, 0, {
      duration: 150,
    });
  }

  // Scale animations for buttons
  static scalePress(scale) {
    return this.createSpringAnimation(scale, 0.95, {
      tension: 400,
      friction: 6,
    });
  }

  static scaleRelease(scale) {
    return this.createSpringAnimation(scale, 1, {
      tension: 400,
      friction: 6,
    });
  }
}

// Haptic Feedback Manager
export class HapticManager {
  static async lightImpact() {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      // Fallback for devices without haptics
      console.log('Haptics not available');
    }
  }

  static async mediumImpact() {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.log('Haptics not available');
    }
  }

  static async heavyImpact() {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      console.log('Haptics not available');
    }
  }

  static async selectionChanged() {
    try {
      await Haptics.selectionAsync();
    } catch (error) {
      console.log('Haptics not available');
    }
  }

  static async notificationSuccess() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.log('Haptics not available');
    }
  }

  static async notificationWarning() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch (error) {
      console.log('Haptics not available');
    }
  }

  static async notificationError() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
      console.log('Haptics not available');
    }
  }
}

// Interaction Performance Manager
export class CustomInteractionManager {
  static runAfterInteractions(callback) {
    return InteractionManager.runAfterInteractions(callback);
  }

  static createInteractionHandle() {
    return InteractionManager.createInteractionHandle();
  }

  static clearInteractionHandle(handle) {
    InteractionManager.clearInteractionHandle(handle);
  }

  // Optimized for heavy operations
  static async runHeavyTask(task) {
    return new Promise((resolve) => {
      this.runAfterInteractions(() => {
        const result = task();
        resolve(result);
      });
    });
  }
}

// Memory Management Utilities
export class MemoryManager {
  static memoizeWithLimit(fn, limit = 100) {
    const cache = new Map();
    
    return function(...args) {
      const key = JSON.stringify(args);
      
      if (cache.has(key)) {
        return cache.get(key);
      }
      
      const result = fn.apply(this, args);
      
      if (cache.size >= limit) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      
      cache.set(key, result);
      return result;
    };
  }

  static debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Performance Monitoring
export class PerformanceMonitor {
  static measureComponentRender(componentName, renderFunction) {
    const startTime = performance.now();
    const result = renderFunction();
    const endTime = performance.now();
    
    if (__DEV__) {
      console.log(`${componentName} render time: ${endTime - startTime}ms`);
    }
    
    return result;
  }

  static measureAsyncOperation(operationName, asyncFunction) {
    return async (...args) => {
      const startTime = performance.now();
      const result = await asyncFunction(...args);
      const endTime = performance.now();
      
      if (__DEV__) {
        console.log(`${operationName} execution time: ${endTime - startTime}ms`);
      }
      
      return result;
    };
  }

  static trackMemoryUsage() {
    if (__DEV__ && performance.memory) {
      console.log('Memory Usage:', {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB',
        allocated: Math.round(performance.memory.totalJSHeapSize / 1048576) + ' MB',
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + ' MB'
      });
    }
  }
}

// Image Optimization Utilities
export class ImageOptimizer {
  static getOptimizedImageUri(uri, width = 400, height = 400, quality = 80) {
    if (!uri) return null;
    
    // Add image optimization parameters if using a CDN
    if (uri.includes('cloudinary') || uri.includes('imgix')) {
      return `${uri}?w=${width}&h=${height}&q=${quality}&f=auto`;
    }
    
    return uri;
  }

  static preloadImages(imageUris) {
    return Promise.all(
      imageUris.map(uri => 
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = uri;
        })
      )
    );
  }
}

// Bundle Size Optimization
export const LazyComponents = {
  // Dynamic imports for code splitting
  CharacterDetailModal: () => import('../screens/CharacterDetailModal'),
  CreateModal: () => import('../components/CreateModal'),
  SelectImageModal: () => import('../components/SelectImageModal'),
  HelpModal: () => import('../components/HelpModal'),
  
  // Heavy screens
  CreateScreen: () => import('../screens/CreateScreen'),
  ChatConversationScreen: () => import('../screens/ChatConversationScreen'),
  ProfileScreen: () => import('../screens/ProfileScreen'),
};

export default {
  PerformanceAnimations,
  HapticManager,
  CustomInteractionManager,
  MemoryManager,
  PerformanceMonitor,
  ImageOptimizer,
  LazyComponents,
};