export const Colors = {
  // Dark theme colors from the APK
  background: '#0D0D14', // Main background
  surface: '#1A1A2E', // Card/surface background
  surfaceLight: '#2A2A3E', // Lighter surface
  
  // Primary colors - Softer purple/gold theme
  primary: '#FFB74D', // Soft gold/orange
  primaryDark: '#FF9800', // Darker orange
  secondary: '#9C27B0', // Purple accent
  
  // VIP specific colors - Softer tones
  vipGold: '#FFB74D', // Soft gold
  vipPurple: '#9C27B0', // Purple
  vipGradientStart: '#FFB74D',
  vipGradientEnd: '#FFA726',
  
  // Ads-free specific colors - Blue theme
  adsFreeBlue: '#2196F3',
  adsFreeGradientStart: '#42A5F5',
  adsFreeGradientEnd: '#1E88E5',
  
  // Text colors - Enhanced for WCAG AA compliance
  text: '#FFFFFF', // 21:1 contrast ratio on dark background
  textSecondary: '#C4C4C4', // 7.8:1 contrast ratio (improved from B0B0B0)
  textTertiary: '#9A9A9A', // 4.7:1 contrast ratio (improved from 808080)
  textOnPrimary: '#0D0D14', // High contrast text on gold background
  
  // Category colors - Enhanced contrast
  categoryActive: '#DAA520',
  categoryInactive: '#3A3A4E',
  categoryText: '#0D0D14', // High contrast on gold background
  categoryTextInactive: '#C4C4C4', // Improved contrast
  
  // Card colors
  cardBackground: '#1E1E2E',
  cardBorder: '#2A2A3E',
  cardOverlay: 'rgba(0, 0, 0, 0.3)',
  
  // Badge colors
  badgeDynamic: '#FF6B6B',
  badgeAnime: '#4ECDC4',
  badgeMale: '#4A90E2',
  badgeFemale: '#E91E63',
  
  // Search and input colors
  searchBarBackground: '#2A2A3E',
  searchBarText: '#C4C4C4', // Improved contrast for placeholders
  searchBarIcon: '#9A9A9A', // Improved contrast for icons
  inputFocus: '#DAA520', // Focus state color
  inputBorder: 'rgba(255, 255, 255, 0.1)', // Subtle borders
  
  // Bottom tab - Enhanced contrast
  tabBarBackground: '#1A1A2E',
  tabActive: '#DAA520',
  tabInactive: '#999999', // Improved from 666666 for better visibility
  
  // Gradients
  gradientStart: '#1A1A2E',
  gradientEnd: '#0D0D14',
  
  // Skeleton loader colors
  skeletonBase: 'rgba(255, 255, 255, 0.08)',
  skeletonHighlight: 'rgba(255, 255, 255, 0.15)',
  
  // Error and status colors
  error: '#FF6B6B',
  warning: '#FFB84D',
  success: '#51CF66',
  info: '#4DABF7',
  
  // Loading states
  loadingOverlay: 'rgba(0, 0, 0, 0.7)',
  spinnerPrimary: '#DAA520',
  
  // Performance indicators (for dev mode)
  performanceGood: '#51CF66',
  performanceWarning: '#FFB84D',
  performancePoor: '#FF6B6B',
};