import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';
import { TYPOGRAPHY } from '../styles/globalStyles';

// Typography component with proper Korean font support and accessibility
const Typography = ({ 
  variant = 'body', 
  color = 'text',
  align = 'left',
  weight,
  children,
  numberOfLines,
  ellipsizeMode = 'tail',
  style,
  ...props 
}) => {
  
  // Get color from Colors object or use direct color value
  const textColor = Colors[color] || color;
  
  // Get typography style based on variant
  const getTypographyStyle = () => {
    switch (variant) {
      case 'display':
        return styles.display;
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'h4':
        return styles.h4;
      case 'h5':
        return styles.h5;
      case 'bodyLarge':
        return styles.bodyLarge;
      case 'body':
        return styles.body;
      case 'bodySmall':
        return styles.bodySmall;
      case 'caption':
        return styles.caption;
      case 'captionSmall':
        return styles.captionSmall;
      case 'buttonLarge':
        return styles.buttonLarge;
      case 'button':
        return styles.button;
      case 'buttonSmall':
        return styles.buttonSmall;
      default:
        return styles.body;
    }
  };

  // Combine styles
  const combinedStyle = [
    getTypographyStyle(),
    {
      color: textColor,
      textAlign: align,
      fontWeight: weight,
    },
    style,
  ];

  return (
    <Text
      style={combinedStyle}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      accessible={true}
      accessibilityRole="text"
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  display: {
    ...TYPOGRAPHY.display,
    fontFamily: 'System', // Falls back to NotoSansKR on Android
    includeFontPadding: false, // Android-specific for better alignment
  },
  h1: {
    ...TYPOGRAPHY.h1,
    fontFamily: 'System',
    includeFontPadding: false,
  },
  h2: {
    ...TYPOGRAPHY.h2,
    fontFamily: 'System',
    includeFontPadding: false,
  },
  h3: {
    ...TYPOGRAPHY.h3,
    fontFamily: 'System',
    includeFontPadding: false,
  },
  h4: {
    ...TYPOGRAPHY.h4,
    fontFamily: 'System',
    includeFontPadding: false,
  },
  h5: {
    ...TYPOGRAPHY.h5,
    fontFamily: 'System',
    includeFontPadding: false,
  },
  bodyLarge: {
    ...TYPOGRAPHY.bodyLarge,
    fontFamily: 'System',
    includeFontPadding: false,
  },
  body: {
    ...TYPOGRAPHY.body,
    fontFamily: 'System',
    includeFontPadding: false,
  },
  bodySmall: {
    ...TYPOGRAPHY.bodySmall,
    fontFamily: 'System',
    includeFontPadding: false,
  },
  caption: {
    ...TYPOGRAPHY.caption,
    fontFamily: 'System',
    includeFontPadding: false,
  },
  captionSmall: {
    ...TYPOGRAPHY.captionSmall,
    fontFamily: 'System',
    includeFontPadding: false,
  },
  buttonLarge: {
    ...TYPOGRAPHY.buttonLarge,
    fontFamily: 'System',
    includeFontPadding: false,
  },
  button: {
    ...TYPOGRAPHY.button,
    fontFamily: 'System',
    includeFontPadding: false,
  },
  buttonSmall: {
    ...TYPOGRAPHY.buttonSmall,
    fontFamily: 'System',
    includeFontPadding: false,
  },
});

export default Typography;

// Usage examples:
// <Typography variant="h1" color="text">Main Title</Typography>
// <Typography variant="body" color="textSecondary" numberOfLines={2}>Description text</Typography>
// <Typography variant="button" color="primary" weight="700">Button Text</Typography>
// <Typography variant="caption" align="center">Small caption</Typography>