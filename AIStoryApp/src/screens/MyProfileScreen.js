import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

const MyProfileScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('My Profile');
  const [profileName, setProfileName] = useState('');
  const [selectedGender, setSelectedGender] = useState('Male');
  const [chatPersona, setChatPersona] = useState('');
  const [isApplied, setIsApplied] = useState(false);
  
  const hasChanges = profileName.length > 0 || chatPersona.length > 0;

  const genders = ['Male', 'Female', 'Non-binary'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'My Profile' && styles.activeTab]}
          onPress={() => setSelectedTab('My Profile')}
        >
          <Text style={[styles.tabText, selectedTab === 'My Profile' && styles.activeTabText]}>
            My Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Default Persona' && styles.activeTab]}
          onPress={() => setSelectedTab('Default Persona')}
        >
          <Text style={[styles.tabText, selectedTab === 'Default Persona' && styles.activeTabText]}>
            Default Persona
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Name Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={profileName}
              onChangeText={setProfileName}
              placeholder="How Saylor addresses you"
              placeholderTextColor={Colors.textSecondary}
              maxLength={30}
            />
            <Text style={styles.charCount}>{profileName.length}/30</Text>
          </View>
        </View>

        {/* Gender Selection */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Gender</Text>
          <View style={styles.genderContainer}>
            {genders.map((gender) => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.genderButton,
                  selectedGender === gender && styles.genderButtonActive
                ]}
                onPress={() => setSelectedGender(gender)}
              >
                <Text style={[
                  styles.genderButtonText,
                  selectedGender === gender && styles.genderButtonTextActive
                ]}>
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Chat Persona */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Chat Persona</Text>
          <Text style={styles.inputDescription}>
            The character you play. You can describe your character's personality, identity, experiences, etc.
          </Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              value={chatPersona}
              onChangeText={setChatPersona}
              placeholder=""
              placeholderTextColor={Colors.textSecondary}
              multiline
              maxLength={1000}
              textAlignVertical="top"
            />
            <Text style={styles.charCountBottom}>{chatPersona.length}/1000</Text>
          </View>
        </View>

        {/* Applied Button */}
        <TouchableOpacity 
          style={[
            styles.appliedButton, 
            hasChanges && styles.appliedButtonEnabled,
            isApplied && styles.appliedButtonActive
          ]}
          onPress={() => {
            if (hasChanges) {
              setIsApplied(!isApplied);
            }
          }}
          disabled={!hasChanges}
        >
          <Text style={[
            styles.appliedButtonText, 
            hasChanges && styles.appliedButtonTextEnabled,
            isApplied && styles.appliedButtonTextActive
          ]}>
            {hasChanges ? 'Apply' : 'Applied'}
          </Text>
        </TouchableOpacity>

        {/* Note */}
        <Text style={styles.noteText}>
          Global chat persona apply only to Saylor without custom chat persona
        </Text>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 2,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 18,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.text,
  },
  tabText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.background,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 16,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  inputDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 16,
  },
  inputContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  charCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: Colors.text,
  },
  genderButtonText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  genderButtonTextActive: {
    color: Colors.background,
    fontWeight: '500',
  },
  textAreaContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    height: 120,
    position: 'relative',
  },
  textArea: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    textAlignVertical: 'top',
  },
  charCountBottom: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  appliedButton: {
    backgroundColor: '#8B7355',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  appliedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  appliedButtonEnabled: {
    backgroundColor: '#FFB74D',
  },
  appliedButtonTextEnabled: {
    color: '#000',
  },
  appliedButtonActive: {
    backgroundColor: '#4CAF50',
  },
  appliedButtonTextActive: {
    color: Colors.background,
  },
  noteText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 40,
  },
});

export default MyProfileScreen;