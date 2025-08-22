import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

const BGVideoScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BG Video</Text>
        <TouchableOpacity>
          <Text style={styles.manageButton}>Manage</Text>
        </TouchableOpacity>
      </View>

      {/* Empty State */}
      <View style={styles.emptyContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.star1}>✨</View>
          <View style={styles.star2}>✨</View>
          <View style={styles.star3}>✨</View>
        </View>
        <Text style={styles.emptyText}>
          It's empty here, come generate my first video now!
        </Text>
        <Text style={styles.subText}>
          Videos created for others' scripts are only visible to yourself.
        </Text>
        
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => {
            // Navigate to video creation
          }}
        >
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  manageButton: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3A3A4A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  star1: {
    position: 'absolute',
    fontSize: 20,
    top: 25,
    left: 25,
  },
  star2: {
    position: 'absolute',
    fontSize: 20,
    top: 25,
    right: 25,
  },
  star3: {
    position: 'absolute',
    fontSize: 20,
    bottom: 25,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 40,
  },
  createButton: {
    paddingHorizontal: 50,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: '#FFB74D',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default BGVideoScreen;