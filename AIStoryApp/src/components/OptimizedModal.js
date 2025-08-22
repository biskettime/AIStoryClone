import React, { memo, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Modal,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { PerformanceAnimations, HapticManager } from '../utils/performance';
import { Colors } from '../styles/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/**
 * High-performance optimized modal with advanced animations and haptic feedback
 * Features:
 * - Native driver animations for 60fps performance
 * - Haptic feedback integration
 * - Memory leak prevention with proper cleanup
 * - Backdrop blur effect
 * - Gesture-based dismissal
 */
const OptimizedModal = memo(({
  visible,
  onClose,
  children,
  animationType = 'slide',
  enableHaptics = true,
  enableBlur = true,
  gestureEnabled = true,
  style,
  contentStyle,
}) => {
  // Animation values
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  
  // Interaction handle for performance
  const interactionHandle = useRef(null);

  // Memoized styles to prevent recreation
  const containerStyle = useMemo(() => [
    styles.container,
    style,
  ], [style]);

  const modalContentStyle = useMemo(() => [
    styles.modalContent,
    contentStyle,
  ], [contentStyle]);

  // Animation configurations
  const animationConfig = useMemo(() => ({
    spring: {
      tension: 280,
      friction: 8,
      useNativeDriver: true,
    },
    timing: {
      duration: 300,
      useNativeDriver: true,
    },
  }), []);

  // Handle modal opening animation
  const animateIn = useCallback(() => {
    if (enableHaptics) {
      HapticManager.lightImpact();
    }

    // Create interaction handle to prevent interruptions
    interactionHandle.current = require('react-native').InteractionManager.createInteractionHandle();

    const animations = [];

    switch (animationType) {
      case 'slide':
        animations.push(
          PerformanceAnimations.modalSlideIn(translateY),
          PerformanceAnimations.fadeIn(opacity),
          PerformanceAnimations.fadeIn(backdropOpacity)
        );
        break;
      case 'fade':
        animations.push(
          PerformanceAnimations.fadeIn(opacity),
          PerformanceAnimations.fadeIn(backdropOpacity),
          PerformanceAnimations.createSpringAnimation(scale, 1, animationConfig.spring)
        );
        break;
      default:
        animations.push(
          PerformanceAnimations.fadeIn(opacity),
          PerformanceAnimations.fadeIn(backdropOpacity)
        );
    }

    Animated.parallel(animations).start(() => {
      // Clear interaction handle after animation
      if (interactionHandle.current) {
        require('react-native').InteractionManager.clearInteractionHandle(interactionHandle.current);
        interactionHandle.current = null;
      }
    });
  }, [animationType, enableHaptics, translateY, opacity, backdropOpacity, scale, animationConfig]);

  // Handle modal closing animation
  const animateOut = useCallback(() => {
    if (enableHaptics) {
      HapticManager.selectionChanged();
    }

    const animations = [];

    switch (animationType) {
      case 'slide':
        animations.push(
          PerformanceAnimations.modalSlideOut(translateY, screenHeight),
          PerformanceAnimations.fadeOut(opacity),
          PerformanceAnimations.fadeOut(backdropOpacity)
        );
        break;
      case 'fade':
        animations.push(
          PerformanceAnimations.fadeOut(opacity),
          PerformanceAnimations.fadeOut(backdropOpacity),
          PerformanceAnimations.createSpringAnimation(scale, 0.9, animationConfig.spring)
        );
        break;
      default:
        animations.push(
          PerformanceAnimations.fadeOut(opacity),
          PerformanceAnimations.fadeOut(backdropOpacity)
        );
    }

    Animated.parallel(animations).start(() => {
      onClose();
    });
  }, [animationType, enableHaptics, translateY, opacity, backdropOpacity, scale, onClose, animationConfig]);

  // Handle backdrop press
  const handleBackdropPress = useCallback(() => {
    if (gestureEnabled) {
      animateOut();
    }
  }, [gestureEnabled, animateOut]);

  // Prevent event bubbling for content press
  const handleContentPress = useCallback(() => {
    // Prevent backdrop press when touching content
  }, []);

  // Effects
  useEffect(() => {
    if (visible) {
      // Reset animation values
      translateY.setValue(screenHeight);
      opacity.setValue(0);
      scale.setValue(0.9);
      backdropOpacity.setValue(0);
      
      // Start opening animation
      animateIn();
    }
  }, [visible, animateIn, translateY, opacity, scale, backdropOpacity]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (interactionHandle.current) {
        require('react-native').InteractionManager.clearInteractionHandle(interactionHandle.current);
      }
    };
  }, []);

  // Render backdrop
  const renderBackdrop = useCallback(() => {
    if (enableBlur) {
      return (
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <BlurView
            intensity={20}
            tint="dark"
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
      );
    } else {
      return (
        <Animated.View
          style={[
            styles.backdrop,
            styles.solidBackdrop,
            { opacity: backdropOpacity }
          ]}
        />
      );
    }
  }, [enableBlur, backdropOpacity]);

  // Render modal content with animations
  const renderContent = useCallback(() => {
    const animatedStyle = {};

    switch (animationType) {
      case 'slide':
        animatedStyle.transform = [{ translateY }];
        animatedStyle.opacity = opacity;
        break;
      case 'fade':
        animatedStyle.opacity = opacity;
        animatedStyle.transform = [{ scale }];
        break;
      default:
        animatedStyle.opacity = opacity;
    }

    return (
      <Animated.View style={[modalContentStyle, animatedStyle]}>
        <TouchableWithoutFeedback onPress={handleContentPress}>
          <View style={styles.contentWrapper}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }, [animationType, translateY, opacity, scale, modalContentStyle, handleContentPress, children]);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="none" // We handle animations manually
      onRequestClose={gestureEnabled ? animateOut : undefined}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={containerStyle}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          {renderBackdrop()}
        </TouchableWithoutFeedback>
        {renderContent()}
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  solidBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.9,
    overflow: 'hidden',
    // Add shadow for iOS
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  contentWrapper: {
    flex: 1,
  },
});

export default OptimizedModal;