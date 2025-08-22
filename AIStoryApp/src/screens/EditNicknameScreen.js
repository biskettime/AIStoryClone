import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

const EditNicknameScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState('User4ffe');

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit nickname</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Input Section */}
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={nickname}
            onChangeText={setNickname}
            placeholder="Enter nickname"
            placeholderTextColor={Colors.textSecondary}
            autoFocus
          />
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setNickname('')}
          >
            <Ionicons name="close-circle" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.hintText}>No spaces at the start or end.</Text>
      </View>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.saveButton, nickname.trim().length > 0 && styles.saveButtonEnabled]}
          disabled={nickname.trim().length === 0}
          onPress={() => {
            // Save nickname and go back
            navigation.goBack();
          }}
        >
          <Text style={[styles.saveButtonText, nickname.trim().length > 0 && styles.saveButtonTextEnabled]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },
  clearButton: {
    marginLeft: 8,
  },
  hintText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 16,
    right: 16,
  },
  saveButton: {
    backgroundColor: '#3A3A4A',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    opacity: 0.6,
  },
  saveButtonEnabled: {
    backgroundColor: '#FFB74D',
    opacity: 1,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  saveButtonTextEnabled: {
    color: '#000',
  },
});

export default EditNicknameScreen;