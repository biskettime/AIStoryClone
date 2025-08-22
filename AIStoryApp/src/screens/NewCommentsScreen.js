import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

const NewCommentsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New comments</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Empty State */}
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <View style={styles.iconCircle}>
            <View style={styles.diamond1} />
            <View style={styles.diamond2} />
          </View>
        </View>
        <Text style={styles.emptyText}>No message.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    marginBottom: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  diamond1: {
    width: 12,
    height: 12,
    backgroundColor: Colors.textSecondary,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: 20,
    top: 20,
  },
  diamond2: {
    width: 12,
    height: 12,
    backgroundColor: Colors.textSecondary,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    right: 20,
    top: 20,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});

export default NewCommentsScreen;