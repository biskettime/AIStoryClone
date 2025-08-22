import { StyleSheet } from 'react-native';
import { Colors } from './colors';

// 8px Grid System Constants
const SPACING = {
  xs: 4,   // 0.5x
  sm: 8,   // 1x base
  md: 16,  // 2x
  lg: 24,  // 3x
  xl: 32,  // 4x
  xxl: 40, // 5x
  xxxl: 48, // 6x
};

// Typography Scale (1.25 ratio with premium weights)
const TYPOGRAPHY = {
  // Display styles
  display: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  
  // Headline styles
  h1: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  h4: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: 0,
  },
  h5: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    letterSpacing: 0,
  },
  
  // Body styles
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  
  // Caption styles
  caption: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  captionSmall: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  
  // Button styles
  buttonLarge: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  button: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  buttonSmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
};

// Korean Typography Optimizations
const KOREAN_TYPOGRAPHY = {
  // Korean text needs slightly increased line heights for readability
  koreanBody: {
    fontSize: 14,
    lineHeight: 22, // Increased from 20 for Korean readability
    fontWeight: '400',
    letterSpacing: 0,
  },
  koreanBodyLarge: {
    fontSize: 16,
    lineHeight: 26, // Increased from 24 for Korean readability
    fontWeight: '400',
    letterSpacing: 0,
  },
  koreanHeading: {
    fontSize: 18,
    lineHeight: 26, // Optimized for Korean characters
    fontWeight: '600',
    letterSpacing: 0,
  },
  koreanTitle: {
    fontSize: 22,
    lineHeight: 32, // Enhanced for Korean text visibility
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  koreanButton: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 0, // No letter spacing for Korean
  },
  koreanCaption: {
    fontSize: 12,
    lineHeight: 18, // Increased for Korean readability
    fontWeight: '400',
    letterSpacing: 0,
  },
};

export { SPACING, TYPOGRAPHY, KOREAN_TYPOGRAPHY };

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenPadding: {
    paddingHorizontal: SPACING.md,
  },
  screenPaddingLarge: {
    paddingHorizontal: SPACING.lg,
  },
  
  // Typography with enhanced contrast and Korean support
  display: {
    ...TYPOGRAPHY.display,
    color: Colors.text,
    fontFamily: 'System', // Falls back to NotoSansKR on Android
    marginBottom: SPACING.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  h1: {
    ...TYPOGRAPHY.h1,
    color: Colors.text,
    fontFamily: 'System',
    marginBottom: SPACING.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  h2: {
    ...TYPOGRAPHY.h2,
    color: Colors.text,
    fontFamily: 'System',
    marginBottom: SPACING.xs,
  },
  h3: {
    ...TYPOGRAPHY.h3,
    color: Colors.text,
    fontFamily: 'System',
    marginBottom: SPACING.xs,
  },
  h4: {
    ...TYPOGRAPHY.h4,
    color: Colors.text,
    fontFamily: 'System',
  },
  h5: {
    ...TYPOGRAPHY.h5,
    color: Colors.text,
    fontFamily: 'System',
  },
  bodyLarge: {
    ...TYPOGRAPHY.bodyLarge,
    color: Colors.textSecondary,
    fontFamily: 'System',
  },
  body: {
    ...TYPOGRAPHY.body,
    color: Colors.textSecondary,
    fontFamily: 'System',
  },
  bodySmall: {
    ...TYPOGRAPHY.bodySmall,
    color: Colors.textTertiary,
    fontFamily: 'System',
  },
  caption: {
    ...TYPOGRAPHY.caption,
    color: Colors.textTertiary,
    fontFamily: 'System',
  },
  captionSmall: {
    ...TYPOGRAPHY.captionSmall,
    color: Colors.textTertiary,
    fontFamily: 'System',
  },
  
  // Spacing utilities
  spacingXS: { margin: SPACING.xs },
  spacingSM: { margin: SPACING.sm },
  spacingMD: { margin: SPACING.md },
  spacingLG: { margin: SPACING.lg },
  spacingXL: { margin: SPACING.xl },
  
  paddingXS: { padding: SPACING.xs },
  paddingSM: { padding: SPACING.sm },
  paddingMD: { padding: SPACING.md },
  paddingLG: { padding: SPACING.lg },
  paddingXL: { padding: SPACING.xl },
  
  marginBottomXS: { marginBottom: SPACING.xs },
  marginBottomSM: { marginBottom: SPACING.sm },
  marginBottomMD: { marginBottom: SPACING.md },
  marginBottomLG: { marginBottom: SPACING.lg },
  marginBottomXL: { marginBottom: SPACING.xl },
  
  // Common components with 8px grid
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: SPACING.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  cardSmall: {
    backgroundColor: Colors.cardBackground,
    borderRadius: SPACING.sm,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  cardLarge: {
    backgroundColor: Colors.cardBackground,
    borderRadius: SPACING.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  
  // Layout utilities
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spaceAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerVertical: {
    justifyContent: 'center',
  },
  centerHorizontal: {
    alignItems: 'center',
  },
  
  // Enhanced shadows with premium feel
  shadowSmall: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  shadowLarge: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  
  // Button system with consistent typography
  buttonPrimary: {
    backgroundColor: Colors.primary,
    paddingVertical: SPACING.sm + SPACING.xs, // 12px
    paddingHorizontal: SPACING.lg,
    borderRadius: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // Accessibility target size
  },
  buttonSecondary: {
    backgroundColor: Colors.surface,
    paddingVertical: SPACING.sm + SPACING.xs,
    paddingHorizontal: SPACING.lg,
    borderRadius: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  buttonSmall: {
    backgroundColor: Colors.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: SPACING.xs,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32,
  },
  buttonLarge: {
    backgroundColor: Colors.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  
  // Button text with proper typography
  buttonTextPrimary: {
    ...TYPOGRAPHY.button,
    color: Colors.background, // High contrast on gold background
    fontFamily: 'System',
  },
  buttonTextSecondary: {
    ...TYPOGRAPHY.button,
    color: Colors.text,
    fontFamily: 'System',
  },
  buttonTextSmall: {
    ...TYPOGRAPHY.buttonSmall,
    color: Colors.background,
    fontFamily: 'System',
  },
  buttonTextLarge: {
    ...TYPOGRAPHY.buttonLarge,
    color: Colors.background,
    fontFamily: 'System',
  },
  
  // Korean-specific text styles
  koreanBody: {
    ...KOREAN_TYPOGRAPHY.koreanBody,
    color: Colors.textSecondary,
    fontFamily: 'System',
  },
  koreanBodyLarge: {
    ...KOREAN_TYPOGRAPHY.koreanBodyLarge,
    color: Colors.text,
    fontFamily: 'System',
  },
  koreanHeading: {
    ...KOREAN_TYPOGRAPHY.koreanHeading,
    color: Colors.text,
    fontFamily: 'System',
    marginBottom: SPACING.xs,
  },
  koreanTitle: {
    ...KOREAN_TYPOGRAPHY.koreanTitle,
    color: Colors.text,
    fontFamily: 'System',
    marginBottom: SPACING.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  koreanButton: {
    ...KOREAN_TYPOGRAPHY.koreanButton,
    color: Colors.background,
    fontFamily: 'System',
  },
  koreanCaption: {
    ...KOREAN_TYPOGRAPHY.koreanCaption,
    color: Colors.textTertiary,
    fontFamily: 'System',
  },
  
  // Korean-specific containers with proper spacing
  koreanTextContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  koreanParagraph: {
    marginBottom: SPACING.md,
    lineHeight: 24, // Enhanced for Korean text flow
  },
  
  // Korean error and success messages
  koreanErrorText: {
    ...KOREAN_TYPOGRAPHY.koreanBody,
    color: '#FF4444',
    textAlign: 'center',
    fontFamily: 'System',
  },
  koreanSuccessText: {
    ...KOREAN_TYPOGRAPHY.koreanBody,
    color: '#4CAF50',
    textAlign: 'center',
    fontFamily: 'System',
  },
  koreanWarningText: {
    ...KOREAN_TYPOGRAPHY.koreanCaption,
    color: '#FF9800',
    textAlign: 'center',
    fontFamily: 'System',
    fontStyle: 'italic',
  },
});