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

const BlackListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BlackList</Text>
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
        <Text style={styles.emptyText}>BlackList is empty</Text>
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
    paddingTop: Platform.OS === 'ios' ? 45 : 25,
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
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3A3A4A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  diamond1: {
    width: 16,
    height: 16,
    backgroundColor: '#5A5A6A',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: 30,
    top: 30,
  },
  diamond2: {
    width: 16,
    height: 16,
    backgroundColor: '#5A5A6A',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    right: 30,
    top: 30,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textSecondary,
    opacity: 0.7,
  },
});

export default BlackListScreen;