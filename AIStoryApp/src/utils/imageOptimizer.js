/**
 * Image Optimization Utility for Production Bundle Size Reduction
 * Provides optimized image loading and caching strategies
 */

import { Platform, PixelRatio, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

class ImageOptimizer {
  constructor() {
    this.cache = new Map();
    this.preloadedImages = new Set();
    this.maxCacheSize = 50; // Maximum number of cached images
  }

  /**
   * Get optimized image dimensions based on screen size and pixel ratio
   */
  getOptimizedDimensions(originalWidth, originalHeight, maxWidth = screenWidth, maxHeight = screenHeight) {
    const targetWidth = Math.min(maxWidth * pixelRatio, originalWidth);
    const targetHeight = Math.min(maxHeight * pixelRatio, originalHeight);
    
    // Maintain aspect ratio
    const aspectRatio = originalWidth / originalHeight;
    
    if (targetWidth / aspectRatio <= targetHeight) {
      return {
        width: targetWidth,
        height: targetWidth / aspectRatio,
      };
    } else {
      return {
        width: targetHeight * aspectRatio,
        height: targetHeight,
      };
    }
  }

  /**
   * Get optimized image source based on device capabilities
   */
  getOptimizedSource(baseSource, options = {}) {
    const {
      quality = 0.8,
      format = 'auto',
      maxWidth = screenWidth,
      maxHeight = screenHeight,
      webp = true,
    } = options;

    // For local images, return as-is (already optimized during build)
    if (typeof baseSource === 'number') {
      return baseSource;
    }

    // For remote images, apply optimizations
    if (typeof baseSource === 'string') {
      const cacheKey = `${baseSource}_${maxWidth}_${maxHeight}_${quality}`;
      
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      let optimizedUrl = baseSource;
      
      // Add optimization parameters for supported services
      if (this.supportsCloudinaryOptimization(baseSource)) {
        optimizedUrl = this.addCloudinaryOptimizations(baseSource, {
          quality,
          format,
          maxWidth: maxWidth * pixelRatio,
          maxHeight: maxHeight * pixelRatio,
          webp,
        });
      } else if (this.supportsImageKitOptimization(baseSource)) {
        optimizedUrl = this.addImageKitOptimizations(baseSource, {
          quality,
          format,
          maxWidth: maxWidth * pixelRatio,
          maxHeight: maxHeight * pixelRatio,
          webp,
        });
      }

      // Cache the optimized URL
      this.addToCache(cacheKey, optimizedUrl);
      
      return optimizedUrl;
    }

    // For objects with uri property
    if (baseSource && baseSource.uri) {
      return {
        ...baseSource,
        uri: this.getOptimizedSource(baseSource.uri, options),
      };
    }

    return baseSource;
  }

  /**
   * Check if URL supports Cloudinary optimizations
   */
  supportsCloudinaryOptimization(url) {
    return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
  }

  /**
   * Add Cloudinary optimization parameters
   */
  addCloudinaryOptimizations(url, options) {
    const { quality, format, maxWidth, maxHeight, webp } = options;
    
    // Build transformation string
    const transformations = [];
    
    if (maxWidth && maxHeight) {
      transformations.push(`c_limit,w_${Math.round(maxWidth)},h_${Math.round(maxHeight)}`);
    }
    
    if (quality < 1) {
      transformations.push(`q_${Math.round(quality * 100)}`);
    }
    
    if (webp && Platform.OS !== 'ios') {
      transformations.push('f_webp');
    } else if (format !== 'auto') {
      transformations.push(`f_${format}`);
    }
    
    // Add fetch format for auto-optimization
    transformations.push('f_auto');
    
    const transformString = transformations.join(',');
    
    // Insert transformation string into Cloudinary URL
    return url.replace(
      /\/upload\//,
      `/upload/${transformString}/`
    );
  }

  /**
   * Check if URL supports ImageKit optimizations
   */
  supportsImageKitOptimization(url) {
    return url.includes('imagekit.io');
  }

  /**
   * Add ImageKit optimization parameters
   */
  addImageKitOptimizations(url, options) {
    const { quality, format, maxWidth, maxHeight, webp } = options;
    
    const params = new URLSearchParams();
    
    if (maxWidth && maxHeight) {
      params.append('tr', `w-${Math.round(maxWidth)},h-${Math.round(maxHeight)},c-at_max`);
    }
    
    if (quality < 1) {
      params.append('tr', `q-${Math.round(quality * 100)}`);
    }
    
    if (webp && Platform.OS !== 'ios') {
      params.append('tr', 'f-webp');
    } else if (format !== 'auto') {
      params.append('tr', `f-${format}`);
    }
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }

  /**
   * Add optimized URL to cache
   */
  addToCache(key, value) {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, value);
  }

  /**
   * Preload critical images for better performance
   */
  async preloadImages(imageSources, options = {}) {
    const { priority = 'normal' } = options;
    
    const preloadPromises = imageSources.map(async (source) => {
      const optimizedSource = this.getOptimizedSource(source, options);
      
      if (this.preloadedImages.has(optimizedSource)) {
        return Promise.resolve();
      }
      
      try {
        if (Platform.OS === 'web') {
          // Web preloading
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              this.preloadedImages.add(optimizedSource);
              resolve();
            };
            img.onerror = reject;
            img.src = optimizedSource;
          });
        } else {
          // React Native preloading
          const { Image } = require('react-native');
          await Image.prefetch(optimizedSource);
          this.preloadedImages.add(optimizedSource);
        }
      } catch (error) {
        console.warn('Failed to preload image:', optimizedSource, error);
      }
    });
    
    if (priority === 'high') {
      // Wait for all critical images
      await Promise.all(preloadPromises);
    } else {
      // Fire and forget for non-critical images
      Promise.all(preloadPromises).catch(() => {
        // Silently handle errors for non-critical preloading
      });
    }
  }

  /**
   * Get placeholder image while loading
   */
  getPlaceholder(width, height, color = '#f0f0f0') {
    if (Platform.OS === 'web') {
      // Generate SVG placeholder for web
      const svg = `data:image/svg+xml;charset=UTF-8,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='${color}'/%3E%3C/svg%3E`;
      return { uri: svg };
    } else {
      // Use solid color for React Native
      return { uri: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==` };
    }
  }

  /**
   * Clear image cache
   */
  clearCache() {
    this.cache.clear();
    this.preloadedImages.clear();
  }

  /**
   * Get cache statistics for debugging
   */
  getCacheStats() {
    return {
      cacheSize: this.cache.size,
      preloadedImages: this.preloadedImages.size,
      maxCacheSize: this.maxCacheSize,
    };
  }
}

// Export singleton instance
export const imageOptimizer = new ImageOptimizer();

// Helper functions for common use cases
export const getOptimizedImage = (source, options) => imageOptimizer.getOptimizedSource(source, options);
export const preloadImages = (sources, options) => imageOptimizer.preloadImages(sources, options);
export const getImagePlaceholder = (width, height, color) => imageOptimizer.getPlaceholder(width, height, color);

export default imageOptimizer;