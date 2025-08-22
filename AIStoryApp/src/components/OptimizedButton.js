import React, { memo, useCallback, useRef, useMemo } from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { Colors } from '../styles/colors';
import { GlobalStyles, SPACING, TYPOGRAPHY } from '../styles/globalStyles';
import Typography from './Typography';
import { PerformanceAnimations, HapticManager } from '../utils/performance';

const OptimizedButton = memo(({
  title,
  onPress,
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'medium', // small, medium, large
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left', // left, right
  style,
  textStyle,
  enableHaptics = true,
  ...props
}) => {
  // Animation values for press effects
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  
  // Get button style based on variant and size
  const getButtonStyle = useCallback(() => {
    const baseStyle = [styles.base];
    
    // Add variant styles
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primary);
        break;
      case 'secondary':
        baseStyle.push(styles.secondary);
        break;
      case 'outline':
        baseStyle.push(styles.outline);
        break;
      case 'ghost':
        baseStyle.push(styles.ghost);
        break;
    }
    
    // Add size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.small);
        break;
      case 'medium':
        baseStyle.push(styles.medium);
        break;
      case 'large':
        baseStyle.push(styles.large);
        break;
    }
    
    // Add disabled state
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }
    
    return baseStyle;
  }, [variant, size, disabled, loading]);
  
  // Get text color based on variant
  const getTextColor = useCallback(() => {
    if (disabled || loading) return Colors.textTertiary;
    
    switch (variant) {
      case 'primary':
        return Colors.textOnPrimary;
      case 'secondary':
        return Colors.text;
      case 'outline':
        return Colors.primary;
      case 'ghost':
        return Colors.primary;
      default:
        return Colors.textOnPrimary;
    }
  }, [variant, disabled, loading]);
  
  // Get typography variant based on size
  const getTypographyVariant = useCallback(() => {
    switch (size) {
      case 'small':
        return 'buttonSmall';
      case 'medium':
        return 'button';
      case 'large':
        return 'buttonLarge';
      default:
        return 'button';
    }
  }, [size]);
  
  // Handle press with haptic feedback and animation
  const handlePressIn = useCallback(() => {
    if (disabled || loading) return;
    
    if (enableHaptics) {
      HapticManager.lightImpact();
    }
    
    Animated.parallel([
      PerformanceAnimations.scalePress(scaleValue),
      PerformanceAnimations.createTimingAnimation(opacityValue, 0.8, { duration: 150 })
    ]).start();
  }, [disabled, loading, enableHaptics, scaleValue, opacityValue]);

  const handlePressOut = useCallback(() => {
    if (disabled || loading) return;
    
    Animated.parallel([
      PerformanceAnimations.scaleRelease(scaleValue),
      PerformanceAnimations.createTimingAnimation(opacityValue, 1, { duration: 150 })
    ]).start();
  }, [disabled, loading, scaleValue, opacityValue]);

  const handlePress = useCallback(() => {
    if (disabled || loading || !onPress) return;
    
    if (enableHaptics) {
      HapticManager.selectionChanged();
    }
    
    onPress();
  }, [disabled, loading, onPress, enableHaptics]);
  
  // Memoize rendered content
  const renderContent = useCallback(() => {
    if (loading) {
      return (
        <ActivityIndicator 
          size="small" 
          color={getTextColor()} 
        />
      );
    }
    
    const textElement = (
      <Typography
        variant={getTypographyVariant()}
        color={getTextColor()}
        style={[styles.text, textStyle]}
      >
        {title}
      </Typography>
    );
    
    if (!icon) return textElement;
    
    return (
      <>
        {iconPosition === 'left' && icon}
        {textElement}
        {iconPosition === 'right' && icon}
      </>
    );
  }, [loading, getTextColor, getTypographyVariant, textStyle, title, icon, iconPosition]);

  // Memoize button styles
  const buttonStyles = useMemo(() => [getButtonStyle(), style], [getButtonStyle, style]);
  
  // Memoize animated styles
  const animatedStyles = useMemo(() => ({
    transform: [{ scale: scaleValue }],
    opacity: opacityValue,
  }), [scaleValue, opacityValue]);

  return (
    <Animated.View style={animatedStyles}>
      <TouchableOpacity
        style={buttonStyles}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ disabled: disabled || loading }}
        activeOpacity={1} // We handle opacity with animations
        {...props}
      >
        {renderContent()}
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SPACING.sm,
    gap: SPACING.sm,
  },
  
  // Variants
  primary: {
    backgroundColor: Colors.primary,
    ...GlobalStyles.shadow,
  },
  secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  
  // Sizes
  small: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    minHeight: 32,
  },
  medium: {
    paddingVertical: SPACING.sm + SPACING.xs, // 12px
    paddingHorizontal: SPACING.lg,
    minHeight: 44,
  },
  large: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    minHeight: 56,
  },
  
  // States
  disabled: {
    opacity: 0.4,
  },
  
  text: {
    textAlign: 'center',
  },
});

export default OptimizedButton;