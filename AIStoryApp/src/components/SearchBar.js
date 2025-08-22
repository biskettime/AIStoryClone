import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { GlobalStyles, SPACING, TYPOGRAPHY } from '../styles/globalStyles';

const SearchBar = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={Colors.searchBarIcon} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.searchBarText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.searchBarBackground,
    borderRadius: SPACING.lg, // 24px for premium rounded look
    paddingHorizontal: SPACING.md, // 16px
    height: 48, // Increased for better touch target
    minHeight: 48, // Accessibility requirement
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)', // Subtle border
  },
  icon: {
    marginRight: SPACING.sm + SPACING.xs, // 12px
    opacity: 0.7, // Subtle icon
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.body, // 14px with proper line height
    color: Colors.text,
    fontFamily: 'System',
    paddingVertical: 0, // Remove default padding for consistent height
    includeFontPadding: false, // Android-specific for better alignment
  },
});

export default SearchBar;