import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

const AboutSayloScreen = ({ navigation }) => {
  const aboutOptions = [
    {
      id: 'privacy',
      title: 'Privacy policy',
      icon: 'shield-outline',
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      icon: 'document-text-outline',
    },
    {
      id: 'community',
      title: 'Community Guidelines',
      icon: 'chatbubbles-outline',
    },
    {
      id: 'report',
      title: 'Report and Complaint',
      icon: 'warning-outline',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Saylo</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* About Options */}
      <View style={styles.optionsContainer}>
        {aboutOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionRow}
            onPress={() => {
              if (option.id === 'report') {
                navigation.navigate('Report');
              }
            }}
          >
            <View style={styles.optionLeft}>
              <Ionicons name={option.icon} size={22} color={Colors.text} />
              <Text style={styles.optionText}>{option.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>
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
  optionsContainer: {
    marginTop: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.surfaceLight,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
});

export default AboutSayloScreen;