import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../styles/colors';
import { GlobalStyles, SPACING, TYPOGRAPHY } from '../styles/globalStyles';
import Typography from './Typography';

const Button = ({
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
  ...props
}) => {
  
  // Get button style based on variant and size
  const getButtonStyle = () => {
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
  };
  
  // Get text color based on variant
  const getTextColor = () => {
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
  };
  
  // Get typography variant based on size
  const getTypographyVariant = () => {
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
  };
  
  const renderContent = () => {
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
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading }}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

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

});

export default Button;

// Usage examples:
// <Button title="Primary Button" onPress={handlePress} />
// <Button title="Secondary" variant="secondary" size="small" onPress={handlePress} />
// <Button title="Loading..." loading={true} onPress={handlePress} />
// <Button title="With Icon" icon={<Icon />} iconPosition="left" onPress={handlePress} />