import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

const EditGenderScreen = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState('');

  const genders = [
    'Male',
    'Female',
    'Non-binary',
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Gender</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Gender Options */}
      <View style={styles.optionsContainer}>
        {genders.map((gender) => (
          <TouchableOpacity
            key={gender}
            style={styles.option}
            onPress={() => {
              setSelectedGender(gender);
              setTimeout(() => navigation.goBack(), 200);
            }}
          >
            <View style={styles.radioButton}>
              <View style={[styles.radioCircle, selectedGender === gender && styles.radioSelected]}>
                {selectedGender === gender && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </View>
            <Text style={styles.optionText}>{gender}</Text>
          </TouchableOpacity>
        ))}
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
  optionsContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  radioButton: {
    marginRight: 14,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: Colors.text,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.text,
  },
  optionText: {
    fontSize: 15,
    color: Colors.text,
  },
});

export default EditGenderScreen;