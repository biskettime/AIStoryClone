import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Colors } from '../styles/colors';
import { GlobalStyles, SPACING, TYPOGRAPHY } from '../styles/globalStyles';

const CategoryTabs = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <TouchableOpacity
            key={category}
            style={[
              styles.tab,
              isActive && styles.activeTab
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text style={[
              styles.tabText,
              isActive && styles.activeTabText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52, // Increased for better touch targets
  },
  contentContainer: {
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    gap: SPACING.sm, // Consistent spacing between tabs
  },
  tab: {
    paddingHorizontal: SPACING.lg, // 24px
    paddingVertical: SPACING.sm + SPACING.xs, // 12px
    marginRight: SPACING.sm, // 8px
    borderRadius: SPACING.lg, // 24px
    backgroundColor: Colors.categoryInactive,
    minHeight: 40, // Accessibility touch target
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeTab: {
    backgroundColor: Colors.categoryActive,
    borderColor: Colors.primary,
    ...GlobalStyles.shadowSmall,
  },
  tabText: {
    ...TYPOGRAPHY.button, // 14px with proper typography
    color: Colors.categoryTextInactive,
    fontFamily: 'System',
    fontWeight: '500',
    textAlign: 'center',
  },
  activeTabText: {
    color: Colors.background, // High contrast on gold background
    fontWeight: '600',
    letterSpacing: 0.3, // Improved readability when active
  },
});

export default CategoryTabs;