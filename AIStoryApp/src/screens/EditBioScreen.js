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

const EditBioScreen = ({ navigation }) => {
  const [bio, setBio] = useState('');
  const maxLength = 54;

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
        <Text style={styles.headerTitle}>Edit Bio</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Bio Input */}
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={bio}
            onChangeText={(text) => {
              if (text.length <= maxLength) {
                setBio(text);
              }
            }}
            placeholder="Improve your Bio so others can know you better!"
            placeholderTextColor={Colors.textSecondary}
            multiline
            maxLength={maxLength}
          />
          <Text style={styles.charCount}>
            {bio.length}/{maxLength}
          </Text>
        </View>
      </View>

      {/* Confirm Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.confirmButton, bio.length > 0 && styles.confirmButtonEnabled]}
          disabled={bio.length === 0}
          onPress={() => {
            // Save bio and go back
            navigation.goBack();
          }}
        >
          <Text style={[styles.confirmButtonText, bio.length > 0 && styles.confirmButtonTextEnabled]}>
            Confirm
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
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  inputContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
  },
  textInput: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
  },
  charCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'right',
    marginTop: 8,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  confirmButton: {
    backgroundColor: '#3A3A4A',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    opacity: 0.6,
  },
  confirmButtonEnabled: {
    backgroundColor: '#4A4A5A',
    opacity: 1,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  confirmButtonTextEnabled: {
    color: Colors.text,
  },
});

export default EditBioScreen;