import React, { useEffect, useRef, useCallback } from 'react';
import { 
  AccessibilityInfo, 
  findNodeHandle, 
  UIManager,
  Platform,
  Alert 
} from 'react-native';
import { HapticManager } from './performance';

/**
 * Comprehensive accessibility utilities for premium app experience
 * Features:
 * - Screen reader optimization
 * - Keyboard navigation support
 * - Focus management
 * - Voice-over announcements
 * - High contrast support
 * - Reduced motion support
 */

export class AccessibilityManager {
  static isScreenReaderEnabled = false;
  static isReduceMotionEnabled = false;
  static isHighContrastEnabled = false;
  static isSwitchControlEnabled = false;

  static async initialize() {
    // Temporarily disabled to avoid API compatibility issues
    // Will re-enable with proper event subscription API
    if (__DEV__) {
      console.log('Accessibility Manager initialized (simplified mode)');
    }
  }

  static cleanup() {
    // No cleanup needed in simplified mode
  }

  static handleScreenReaderChange = (isEnabled) => {
    this.isScreenReaderEnabled = isEnabled;
    if (__DEV__) {
      console.log('Screen reader changed:', isEnabled);
    }
  };

  static handleReduceMotionChange = (isEnabled) => {
    this.isReduceMotionEnabled = isEnabled;
    if (__DEV__) {
      console.log('Reduce motion changed:', isEnabled);
    }
  };

  static handleHighContrastChange = (isEnabled) => {
    this.isHighContrastEnabled = isEnabled;
    if (__DEV__) {
      console.log('High contrast changed:', isEnabled);
    }
  };

  static handleSwitchControlChange = (isEnabled) => {
    this.isSwitchControlEnabled = isEnabled;
    if (__DEV__) {
      console.log('Switch control changed:', isEnabled);
    }
  };

  // Focus management
  static setAccessibilityFocus(ref) {
    if (!ref.current) return;
    
    const node = findNodeHandle(ref.current);
    if (node) {
      AccessibilityInfo.setAccessibilityFocus(node);
    }
  }

  // Announcements
  static announce(message, options = {}) {
    AccessibilityInfo.announceForAccessibility(message);
    
    // Add haptic feedback for important announcements
    if (options.withHaptics) {
      HapticManager.notificationSuccess();
    }
  }

  // Get accessibility props based on current state
  static getAccessibilityProps(props = {}) {
    const baseProps = {
      accessible: true,
      ...props,
    };

    // Enhance for screen reader users
    if (this.isScreenReaderEnabled) {
      baseProps.accessibilityElementsHidden = false;
      baseProps.importantForAccessibility = 'yes';
    }

    // Adjust for switch control users
    if (this.isSwitchControlEnabled) {
      baseProps.accessibilityTraits = ['button'];
    }

    return baseProps;
  }

  // Check if animations should be reduced
  static shouldReduceMotion() {
    return this.isReduceMotionEnabled;
  }

  // Check if high contrast is needed
  static shouldUseHighContrast() {
    return this.isHighContrastEnabled;
  }

  // Get timing adjustments for accessibility
  static getAccessibilityTiming() {
    if (this.isScreenReaderEnabled || this.isSwitchControlEnabled) {
      return {
        animationDuration: 500, // Slower animations
        debounceDelay: 300, // Longer debounce
        autoCloseDelay: 8000, // Longer auto-close
      };
    }
    
    return {
      animationDuration: 250,
      debounceDelay: 150,
      autoCloseDelay: 4000,
    };
  }
}

// Keyboard navigation hook
export const useKeyboardNavigation = (items = [], onSelect) => {
  const selectedIndex = useRef(0);
  const itemRefs = useRef([]);

  const handleKeyPress = useCallback((event) => {
    if (Platform.OS !== 'web') return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        selectedIndex.current = Math.min(selectedIndex.current + 1, items.length - 1);
        focusItem(selectedIndex.current);
        break;
      
      case 'ArrowUp':
        event.preventDefault();
        selectedIndex.current = Math.max(selectedIndex.current - 1, 0);
        focusItem(selectedIndex.current);
        break;
      
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (onSelect && items[selectedIndex.current]) {
          onSelect(items[selectedIndex.current], selectedIndex.current);
        }
        break;
      
      case 'Escape':
        event.preventDefault();
        selectedIndex.current = 0;
        break;
    }
  }, [items, onSelect]);

  const focusItem = useCallback((index) => {
    const ref = itemRefs.current[index];
    if (ref?.current) {
      AccessibilityManager.setAccessibilityFocus(ref);
    }
  }, []);

  const registerItemRef = useCallback((index) => {
    if (!itemRefs.current[index]) {
      itemRefs.current[index] = React.createRef();
    }
    return itemRefs.current[index];
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [handleKeyPress]);

  return {
    selectedIndex: selectedIndex.current,
    registerItemRef,
    focusItem,
  };
};

// Focus management hook
export const useFocusManagement = (isVisible) => {
  const previousFocus = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      // Store previous focus
      if (Platform.OS === 'web' && document.activeElement) {
        previousFocus.current = document.activeElement;
      }
      
      // Set focus to container
      setTimeout(() => {
        if (containerRef.current) {
          AccessibilityManager.setAccessibilityFocus(containerRef);
        }
      }, 100);
    } else {
      // Restore previous focus
      if (Platform.OS === 'web' && previousFocus.current) {
        previousFocus.current.focus();
      }
    }
  }, [isVisible]);

  return containerRef;
};

// Voice-over announcements hook
export const useVoiceOverAnnouncements = () => {
  const announce = useCallback((message, priority = 'polite') => {
    AccessibilityManager.announce(message, { priority });
  }, []);

  const announceLoading = useCallback((message = 'Loading') => {
    announce(`${message}, please wait`, 'assertive');
  }, [announce]);

  const announceSuccess = useCallback((message = 'Success') => {
    announce(message, 'polite');
    HapticManager.notificationSuccess();
  }, [announce]);

  const announceError = useCallback((message = 'Error occurred') => {
    announce(message, 'assertive');
    HapticManager.notificationError();
  }, [announce]);

  return {
    announce,
    announceLoading,
    announceSuccess,
    announceError,
  };
};

// Accessibility-enhanced component props
export const getA11yProps = (config = {}) => {
  const {
    label,
    hint,
    role = 'button',
    state = {},
    traits = [],
    value,
  } = config;

  const props = {
    accessible: true,
    accessibilityRole: role,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityState: state,
    accessibilityValue: value,
  };

  // iOS specific traits
  if (Platform.OS === 'ios' && traits.length > 0) {
    props.accessibilityTraits = traits;
  }

  // Enhanced for screen readers
  if (AccessibilityManager.isScreenReaderEnabled) {
    props.importantForAccessibility = 'yes';
  }

  return props;
};

// Screen reader utilities
export const ScreenReaderUtils = {
  // Check if content should be read
  shouldAnnounce: () => AccessibilityManager.isScreenReaderEnabled,
  
  // Format numbers for screen readers
  formatNumber: (num) => {
    if (num >= 1000000) {
      return `${Math.floor(num / 100000) / 10} million`;
    } else if (num >= 1000) {
      return `${Math.floor(num / 100) / 10} thousand`;
    }
    return num.toString();
  },
  
  // Format time for screen readers
  formatTime: (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours} hours, ${minutes} minutes, ${secs} seconds`;
    } else if (minutes > 0) {
      return `${minutes} minutes, ${secs} seconds`;
    }
    return `${secs} seconds`;
  },
  
  // Create descriptive labels for complex UI
  createLabel: (parts) => parts.filter(Boolean).join(', '),
};

// Initialize accessibility manager
AccessibilityManager.initialize();

export default AccessibilityManager;