import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Switch,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { GlobalStyles } from '../styles/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';

const DebugModeScreen = ({ navigation }) => {
  const [selectedModel, setSelectedModel] = useState('Basic model');
  const [showModelModal, setShowModelModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [modelName, setModelName] = useState('');
  const [modelDescription, setModelDescription] = useState('');
  const [replyStyle, setReplyStyle] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const modelOptions = [
    { name: 'Ordinary mode', icon: '', description: '' },
    { name: 'Memory model', icon: '👤', description: 'A model with better memory' },
    { name: 'Advanced Model', icon: '👤', description: 'A more intelligent model' },
    { name: 'Long text mode', icon: '👤', description: 'AI model responds longer' },
  ];

  return (
    <View style={GlobalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Debug Mode</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Basic Model Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>* Basic model</Text>
          <TouchableOpacity 
            style={styles.inputField}
            onPress={() => setShowModelModal(true)}
          >
            <Text style={styles.inputText}>
              {selectedModel === 'Basic model' ? 'Please select the basic model' : selectedModel}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Model Name Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>* Model name</Text>
          <View style={styles.inputField}>
            <TextInput
              style={styles.textInput}
              placeholder="Name your customized model"
              placeholderTextColor={Colors.textSecondary}
              value={modelName}
              onChangeText={setModelName}
              maxLength={20}
            />
            <Text style={styles.charCount}>{modelName.length}/20</Text>
          </View>
        </View>

        {/* Model Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>* Model description</Text>
          <View style={[styles.inputField, styles.textAreaField]}>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Help others quickly understand your model"
              placeholderTextColor={Colors.textSecondary}
              value={modelDescription}
              onChangeText={setModelDescription}
              multiline
              maxLength={30}
            />
            <Text style={styles.charCount}>{modelDescription.length}/30</Text>
          </View>
        </View>

        {/* Reply Style Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>* Reply style</Text>
            <TouchableOpacity onPress={() => setShowInstructionsModal(true)}>
              <Text style={styles.instructionsLink}>Instructions</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.inputField, styles.largeTextAreaField]}>
            <TextInput
              style={[styles.textInput, styles.largeTextArea]}
              placeholder="How do you want your model to reply"
              placeholderTextColor={Colors.textSecondary}
              value={replyStyle}
              onChangeText={setReplyStyle}
              multiline
              maxLength={1000}
            />
            <Text style={styles.charCount}>{replyStyle.length}/1000</Text>
          </View>
        </View>

        {/* Visibility Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>* Visibility</Text>
          <View style={styles.visibilityRow}>
            <Text style={styles.visibilityText}>Public</Text>
            <Switch
              value={isPublic}
              onValueChange={setIsPublic}
              trackColor={{ false: Colors.surface, true: Colors.primary }}
              thumbColor={Colors.text}
            />
          </View>
        </View>

        {/* Note */}
        <Text style={styles.note}>
          Note: All chat history in debug mode will not be saved after you exit.
        </Text>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.debugButton}>
            <Text style={styles.debugButtonText}>👤Debug</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>👤Create</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Model Selection Modal */}
      <Modal
        visible={showModelModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModelModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModelModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Basic model</Text>
              <TouchableOpacity onPress={() => setShowModelModal(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            {modelOptions.map((model, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modelOption}
                onPress={() => {
                  setSelectedModel(model.name);
                  setShowModelModal(false);
                }}
              >
                <View style={styles.modelInfo}>
                  <Text style={styles.modelIcon}>{model.icon}</Text>
                  <View>
                    <Text style={styles.modelName}>{model.name}</Text>
                    {model.description ? (
                      <Text style={styles.modelDescription}>{model.description}</Text>
                    ) : null}
                  </View>
                </View>
                <View style={styles.radioButton}>
                  {selectedModel === model.name && (
                    <View style={styles.radioButtonSelected} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
            
            <Text style={styles.moreModelsText}>More models are coming soon</Text>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Instructions Modal */}
      <Modal
        visible={showInstructionsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowInstructionsModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowInstructionsModal(false)}
        >
          <View style={styles.instructionsModalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Instructions</Text>
              <TouchableOpacity onPress={() => setShowInstructionsModal(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.instructionsContent}>
              <Text style={styles.instructionText}>
                1. Each instruction must start with *, and you should output a new instruction after a line break.
              </Text>
              <Text style={styles.instructionText}>
                2. The length of each instruction should not be too long.
              </Text>
              <Text style={styles.instructionText}>
                3. The description of the instruction should be as clear and direct as possible.
              </Text>
              <Text style={styles.instructionText}>
                4. You can only use the second person "you" to describe the instruction.
              </Text>
              <Text style={styles.instructionTip}>
                Tips: Using forceful or strict wording and adding an exclamation mark at the end of the sentence will achieve a better effect (but don't do it too frequently)
              </Text>
            </ScrollView>
            
            <TouchableOpacity 
              style={styles.gotItButton}
              onPress={() => setShowInstructionsModal(false)}
            >
              <Text style={styles.gotItButtonText}>Get !</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  instructionsLink: {
    fontSize: 14,
    color: Colors.primary,
  },
  inputField: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textAreaField: {
    height: 80,
    alignItems: 'flex-start',
  },
  largeTextAreaField: {
    height: 150,
    alignItems: 'flex-start',
  },
  inputText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
  },
  largeTextArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    position: 'absolute',
    right: 14,
    bottom: 14,
  },
  visibilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  visibilityText: {
    fontSize: 16,
    color: Colors.text,
  },
  note: {
    fontSize: 12,
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 30,
  },
  debugButton: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  debugButtonText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  createButton: {
    flex: 1,
    backgroundColor: '#FFB74D',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  modelOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  modelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modelIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  modelName: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  modelDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  moreModelsText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 16,
  },
  instructionsModalContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
    maxHeight: '80%',
  },
  instructionsContent: {
    padding: 20,
  },
  instructionText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  instructionTip: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 10,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  gotItButton: {
    backgroundColor: '#FFB74D',
    borderRadius: 24,
    paddingVertical: 14,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  gotItButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
});

export default DebugModeScreen;