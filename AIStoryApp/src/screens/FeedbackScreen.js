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

const FeedbackScreen = ({ navigation }) => {
  const [selectedProblem, setSelectedProblem] = useState('Bug');
  const [selectedFrequency, setSelectedFrequency] = useState('Every Time');
  
  const canSubmit = selectedProblem && selectedFrequency;

  const problems = [
    'Bug',
    'Product Advice',
    'Chat Experience',
    'Content Report',
    'Other Issues',
  ];

  const frequencies = [
    'Every Time',
    'Always',
    'Occasionally',
    'Only Once',
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Your feedback is valuable. Please fill out the form.
        </Text>

        {/* Problems Section */}
        <Text style={styles.sectionTitle}>*Problems</Text>
        <View style={styles.optionsContainer}>
          {problems.map((problem) => (
            <TouchableOpacity
              key={problem}
              style={styles.option}
              onPress={() => setSelectedProblem(problem)}
            >
              <View style={styles.radioButton}>
                {selectedProblem === problem ? (
                  <View style={styles.selectedRadio}>
                    <Ionicons name="checkmark" size={16} color={Colors.text} />
                  </View>
                ) : (
                  <View style={styles.radioCircle} />
                )}
              </View>
              <Text style={styles.optionText}>{problem}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Frequency Section */}
        <Text style={styles.sectionTitle}>*Frequency</Text>
        <View style={styles.optionsContainer}>
          {frequencies.map((frequency) => (
            <TouchableOpacity
              key={frequency}
              style={styles.option}
              onPress={() => setSelectedFrequency(frequency)}
            >
              <View style={styles.radioButton}>
                {selectedFrequency === frequency ? (
                  <View style={styles.selectedRadio}>
                    <Ionicons name="checkmark" size={16} color={Colors.text} />
                  </View>
                ) : (
                  <View style={styles.radioCircle} />
                )}
              </View>
              <Text style={styles.optionText}>{frequency}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upload Screenshot */}
        <Text style={styles.sectionTitle}>Upload Screenshot</Text>
        <TouchableOpacity style={styles.uploadContainer}>
          <Ionicons name="image-outline" size={40} color={Colors.textSecondary} />
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity 
          style={[styles.submitButton, canSubmit && styles.submitButtonEnabled]}
          disabled={!canSubmit}
        >
          <Text style={[styles.submitButtonText, canSubmit && styles.submitButtonTextEnabled]}>
            Submit
          </Text>
        </TouchableOpacity>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  content: {
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    marginTop: 20,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioButton: {
    marginRight: 12,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.textSecondary,
  },
  selectedRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: Colors.text,
  },
  uploadContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: Colors.surface,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 40,
  },
  submitButtonEnabled: {
    backgroundColor: '#FFB74D',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  submitButtonTextEnabled: {
    color: '#000',
  },
});

export default FeedbackScreen;