import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

const SwitchLanguageScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { id: 'simplified', name: 'Simplified Chinese' },
    { id: 'traditional', name: 'Traditional Chinese' },
    { id: 'english', name: 'English' },
    { id: 'japanese', name: 'Japanese' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Switch Language</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Language Options */}
      <View style={styles.languageList}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.id}
            style={styles.languageOption}
            onPress={() => setSelectedLanguage(language.name)}
          >
            <View style={styles.radioButton}>
              <View style={[styles.radioCircle, selectedLanguage === language.name && styles.selectedRadio]}>
                {selectedLanguage === language.name && (
                  <Ionicons name="checkmark" size={14} color={Colors.text} />
                )}
              </View>
            </View>
            <Text style={styles.languageText}>{language.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Note */}
      <View style={styles.noteContainer}>
        <Text style={styles.noteTitle}>Note:</Text>
        <Text style={styles.noteText}>
          1.Different languages correspond to independent accounts, and account information, created roles, recommendations, searches, chat records, memberships, diamonds, etc., are not shared between accounts.
        </Text>
        <Text style={styles.noteText}>
          2.Switching to a new language version for the first time will generate a new account ID, which will take effect after restarting the app.
        </Text>
      </View>
    </ScrollView>
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
  languageList: {
    paddingTop: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.surfaceLight,
  },
  radioButton: {
    marginRight: 16,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  languageText: {
    fontSize: 16,
    color: Colors.text,
  },
  noteContainer: {
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
});

export default SwitchLanguageScreen;