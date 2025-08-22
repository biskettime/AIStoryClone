import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Switch,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

const { width, height } = Dimensions.get('window');

const CustomizeModelModal = ({ visible, onClose, navigation }) => {
  const [selectedModel, setSelectedModel] = useState('Memory model');
  const [modelName, setModelName] = useState('');
  const [modelDescription, setModelDescription] = useState('');
  const [replyStyle, setReplyStyle] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  const modelOptions = [
    { name: 'Memory model', description: 'A model with better memory' },
    { name: 'Advanced Model', description: 'A more intelligent model' },
    { name: 'Long text mode', description: 'AI model responds longer' },
    { name: 'Ordinary mode', description: '' },
  ];

  const handleDebug = () => {
    // Navigate to debug mode with the model
    onClose();
    navigation.navigate('DebugMode');
  };

  const handleCreate = () => {
    // Create the model
    onClose();
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Debug Mode</Text>
                <View style={{ width: 24 }} />
              </View>

              {/* Basic Model Section */}
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>* Basic model</Text>
                <TouchableOpacity 
                  style={styles.inputField}
                  onPress={() => {}}
                >
                  <Text style={styles.inputText}>{selectedModel}</Text>
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
                  <Text style={styles.charCountBottom}>{modelDescription.length}/30</Text>
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
                  <Text style={styles.charCountBottom}>{replyStyle.length}/1000</Text>
                </View>
              </View>

              {/* Visibility Section */}
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>* Public</Text>
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
                <TouchableOpacity style={styles.debugButton} onPress={handleDebug}>
                  <Text style={styles.debugButtonText}>👤 Debug</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                  <Text style={styles.createButtonText}>👤 Create</Text>
                </TouchableOpacity>
              </View>

              <View style={{ height: 50 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Instructions Modal */}
      <Modal
        visible={showInstructionsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowInstructionsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.instructionsModalContainer}>
            <View style={styles.instructionsHeader}>
              <Text style={styles.instructionsTitle}>Instructions</Text>
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
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
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
    color: Colors.text,
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
  },
  charCountBottom: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    fontSize: 12,
    color: Colors.textSecondary,
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
  instructionsModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: height * 0.7,
  },
  instructionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
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
    marginVertical: 20,
    alignItems: 'center',
  },
  gotItButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
});

export default CustomizeModelModal;