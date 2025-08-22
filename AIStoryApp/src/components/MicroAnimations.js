import React, { memo, useRef, useEffect, useCallback } from 'react';
import { Animated, Easing } from 'react-native';
import { PerformanceAnimations } from '../utils/performance';
import AccessibilityManager from '../utils/accessibility';

/**
 * Premium micro-animations library for sophisticated UI polish
 * Features:
 * - Respects user's reduced motion preferences
 * - High-performance native driver animations
 * - Contextual animation timing
 * - Memory-efficient implementations
 * - Accessibility-aware animations
 */

// Animated components with built-in micro-animations
export const AnimatedPressable = memo(({ 
  children, 
  onPress, 
  onPressIn, 
  onPressOut,
  scaleDownTo = 0.97,
  springConfig = { tension: 300, friction: 8 },
  enableHaptics = true,
  style,
  ...props 
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    if (AccessibilityManager.shouldReduceMotion()) return;
    
    Animated.parallel([
      PerformanceAnimations.createSpringAnimation(scaleValue, scaleDownTo, springConfig),
      PerformanceAnimations.createTimingAnimation(opacityValue, 0.8, { duration: 100 })
    ]).start();
    
    if (onPressIn) onPressIn();
  }, [scaleValue, opacityValue, scaleDownTo, springConfig, onPressIn]);

  const handlePressOut = useCallback(() => {
    if (AccessibilityManager.shouldReduceMotion()) return;
    
    Animated.parallel([
      PerformanceAnimations.createSpringAnimation(scaleValue, 1, springConfig),
      PerformanceAnimations.createTimingAnimation(opacityValue, 1, { duration: 100 })
    ]).start();
    
    if (onPressOut) onPressOut();
  }, [scaleValue, opacityValue, springConfig, onPressOut]);

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
        },
        style,
      ]}
      {...props}
    >
      <Animated.View
        onTouchStart={handlePressIn}
        onTouchEnd={handlePressOut}
        onTouchCancel={handlePressOut}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
});

// Staggered list animations
export const StaggeredList = memo(({ 
  children, 
  staggerDelay = 50, 
  initialDelay = 0,
  animationType = 'slideUp' // slideUp, fadeIn, scale
}) => {
  const animations = useRef([]).current;

  useEffect(() => {
    if (AccessibilityManager.shouldReduceMotion()) return;

    const childCount = React.Children.count(children);
    
    // Clear previous animations
    animations.forEach(anim => anim.setValue(0));
    animations.length = 0;

    // Create new animations
    for (let i = 0; i < childCount; i++) {
      animations.push(new Animated.Value(0));
    }

    // Start staggered animations
    const animationSequence = animations.map((animation, index) => {
      const delay = initialDelay + (index * staggerDelay);
      
      return Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      });
    });

    Animated.stagger(staggerDelay, animationSequence).start();
  }, [children, staggerDelay, initialDelay, animations]);

  const getAnimatedStyle = (animation, index) => {
    switch (animationType) {
      case 'slideUp':
        return {
          opacity: animation,
          transform: [{
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          }],
        };
      case 'fadeIn':
        return {
          opacity: animation,
        };
      case 'scale':
        return {
          opacity: animation,
          transform: [{
            scale: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            }),
          }],
        };
      default:
        return { opacity: animation };
    }
  };

  return (
    <>
      {React.Children.map(children, (child, index) => (
        <Animated.View
          key={index}
          style={animations[index] ? getAnimatedStyle(animations[index], index) : {}}
        >
          {child}
        </Animated.View>
      ))}
    </>
  );
});

// Floating action button with breathing animation
export const FloatingActionButton = memo(({ 
  children, 
  breathingEffect = true,
  glowEffect = true,
  style,
  ...props 
}) => {
  const breatheValue = useRef(new Animated.Value(1)).current;
  const glowValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (AccessibilityManager.shouldReduceMotion()) return;

    if (breathingEffect) {
      const breathingAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(breatheValue, {
            toValue: 1.05,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(breatheValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );
      breathingAnimation.start();
      
      return () => breathingAnimation.stop();
    }
  }, [breathingEffect, breatheValue]);

  useEffect(() => {
    if (AccessibilityManager.shouldReduceMotion()) return;

    if (glowEffect) {
      const glowAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(glowValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(glowValue, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );
      glowAnimation.start();
      
      return () => glowAnimation.stop();
    }
  }, [glowEffect, glowValue]);

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: breatheValue }],
          shadowOpacity: glowValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 0.6],
          }),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
});

// Parallax scroll effect
export const ParallaxView = memo(({ 
  children, 
  scrollY, 
  parallaxFactor = 0.5,
  style 
}) => {
  const translateY = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 300 * parallaxFactor],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateY }],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
});

// Shimmer effect for loading states
export const ShimmerEffect = memo(({ 
  width = 200, 
  height = 20, 
  colors = ['#f0f0f0', '#e0e0e0', '#f0f0f0'],
  style 
}) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (AccessibilityManager.shouldReduceMotion()) return;

    const shimmerAnimation = Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false, // LinearGradient doesn't support native driver
      })
    );
    
    shimmerAnimation.start();
    return () => shimmerAnimation.stop();
  }, [shimmerValue]);

  const translateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: colors[0],
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: colors[1],
          transform: [{ translateX }],
        }}
      />
    </Animated.View>
  );
});

// Bounce-in animation for new content
export const BounceIn = memo(({ 
  children, 
  delay = 0, 
  springConfig = { tension: 300, friction: 6 } 
}) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (AccessibilityManager.shouldReduceMotion()) {
      scaleValue.setValue(1);
      opacityValue.setValue(1);
      return;
    }

    const animation = Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        delay,
        ...springConfig,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 200,
        delay,
        useNativeDriver: true,
      }),
    ]);

    animation.start();
  }, [scaleValue, opacityValue, delay, springConfig]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleValue }],
        opacity: opacityValue,
      }}
    >
      {children}
    </Animated.View>
  );
});

// Slide transition for navigation
export const SlideTransition = memo(({ 
  children, 
  direction = 'right', // left, right, up, down
  isVisible = true,
  duration = 300 
}) => {
  const translateValue = useRef(new Animated.Value(isVisible ? 0 : 100)).current;
  const opacityValue = useRef(new Animated.Value(isVisible ? 1 : 0)).current;

  useEffect(() => {
    if (AccessibilityManager.shouldReduceMotion()) {
      translateValue.setValue(isVisible ? 0 : 100);
      opacityValue.setValue(isVisible ? 1 : 0);
      return;
    }

    Animated.parallel([
      Animated.timing(translateValue, {
        toValue: isVisible ? 0 : 100,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: isVisible ? 1 : 0,
        duration: duration * 0.7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isVisible, translateValue, opacityValue, duration]);

  const getTransformStyle = () => {
    switch (direction) {
      case 'left':
        return { translateX: translateValue.interpolate({
          inputRange: [0, 100],
          outputRange: [0, -100],
        })};
      case 'right':
        return { translateX: translateValue };
      case 'up':
        return { translateY: translateValue.interpolate({
          inputRange: [0, 100],
          outputRange: [0, -100],
        })};
      case 'down':
        return { translateY: translateValue };
      default:
        return { translateX: translateValue };
    }
  };

  return (
    <Animated.View
      style={{
        transform: [getTransformStyle()],
        opacity: opacityValue,
      }}
    >
      {children}
    </Animated.View>
  );
});

// Pulsing heart animation for likes
export const PulsingHeart = memo(({ 
  isActive = false, 
  color = '#ff4757',
  size = 24 
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    if (AccessibilityManager.shouldReduceMotion()) return;

    if (isActive) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.2,
            duration: 300,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
        ])
      );
      
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      
      pulseAnimation.start();
      
      return () => pulseAnimation.stop();
    } else {
      Animated.timing(opacityValue, {
        toValue: 0.7,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isActive, scaleValue, opacityValue]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleValue }],
        opacity: opacityValue,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: size / 2,
      }}
    />
  );
});

export default {
  AnimatedPressable,
  StaggeredList,
  FloatingActionButton,
  ParallaxView,
  ShimmerEffect,
  BounceIn,
  SlideTransition,
  PulsingHeart,
};