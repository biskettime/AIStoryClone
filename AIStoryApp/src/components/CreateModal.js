import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { GlobalStyles, SPACING, TYPOGRAPHY } from '../styles/globalStyles';
import CharacterSelectModal from '../screens/CharacterSelectModal';
import CreateVideoModal from '../screens/CreateVideoModal';
import CustomizeModelModal from '../screens/CustomizeModelModal';

const CreateModal = ({ visible, onClose, navigation }) => {
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const options = [
    {
      id: 'create-saylor',
      icon: '✨',
      title: 'Create a Saylor',
      description: 'Create your own AI Character',
      onPress: () => {
        onClose();
        navigation.navigate('CreateSaylor');
      },
    },
    {
      id: 'create-video',
      icon: '🎬',
      title: 'Create video',
      description: 'Create a wonderful video for your Saylor',
      onPress: () => {
        setShowCharacterSelect(true);
      },
    },
    {
      id: 'customize-model',
      icon: '📦',
      title: '👑 Customize model',
      description: 'Customize the reply style of the basic model',
      onPress: () => {
        setShowCustomizeModal(true);
      },
    },
  ];

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1}
          onPress={onClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Create a Saylor</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>

            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.option}
                onPress={option.onPress}
              >
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>{option.icon}</Text>
                </View>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
            ))}

            <Text style={styles.moreComingSoon}>More modes are coming soon</Text>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Character Select Modal */}
      <CharacterSelectModal 
        visible={showCharacterSelect}
        onClose={() => {
          setShowCharacterSelect(false);
        }}
        onSelectCharacter={(character) => {
          setSelectedCharacter(character);
          setShowCharacterSelect(false);
          setShowVideoModal(true);
        }}
      />

      {/* Create Video Modal */}
      <CreateVideoModal 
        visible={showVideoModal}
        character={selectedCharacter}
        onClose={() => {
          setShowVideoModal(false);
          setSelectedCharacter(null);
          onClose();
        }}
      />

      {/* Customize Model Modal */}
      <CustomizeModelModal 
        visible={showCustomizeModal}
        onClose={() => {
          setShowCustomizeModal(false);
          onClose();
        }}
        navigation={navigation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Light dark overlay to show background
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: SPACING.lg, // 24px
    borderTopRightRadius: SPACING.lg,
    paddingBottom: SPACING.xl, // 32px
    paddingTop: SPACING.lg, // 24px
    ...GlobalStyles.shadowLarge,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg, // 24px
    marginBottom: SPACING.lg, // 24px
    paddingBottom: SPACING.sm, // 8px
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  title: {
    ...TYPOGRAPHY.h4, // 18px with proper line height
    color: Colors.text,
    fontFamily: 'System',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg, // 24px
    paddingVertical: SPACING.md, // 16px
    marginHorizontal: SPACING.md, // 16px
    marginVertical: SPACING.xs, // 4px
    borderRadius: SPACING.md, // 16px
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconContainer: {
    width: 56, // Larger for better visual balance
    height: 56,
    borderRadius: SPACING.md, // 16px instead of circle
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md, // 16px
    ...GlobalStyles.shadowSmall,
  },
  icon: {
    fontSize: 28, // Larger icons for premium feel
  },
  optionContent: {
    flex: 1,
    gap: SPACING.xs, // 4px between title and description
  },
  optionTitle: {
    ...TYPOGRAPHY.h5, // 16px with proper typography
    color: Colors.text,
    fontFamily: 'System',
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  optionDescription: {
    ...TYPOGRAPHY.body, // 14px with proper line height
    color: Colors.textSecondary,
    fontFamily: 'System',
    opacity: 0.8,
  },
  moreComingSoon: {
    ...TYPOGRAPHY.caption, // 11px with proper typography
    color: Colors.textTertiary,
    fontFamily: 'System',
    textAlign: 'center',
    marginTop: SPACING.lg, // 24px
    marginBottom: SPACING.sm, // 8px
    opacity: 0.6,
  },
});

export default CreateModal;