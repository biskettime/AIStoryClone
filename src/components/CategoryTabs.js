import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Colors } from '../styles/colors';

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
    height: 44,
  },
  contentContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: Colors.categoryInactive,
  },
  activeTab: {
    backgroundColor: Colors.categoryActive,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.categoryTextInactive,
  },
  activeTabText: {
    color: Colors.categoryText,
    fontWeight: '600',
  },
});

export default CategoryTabs;