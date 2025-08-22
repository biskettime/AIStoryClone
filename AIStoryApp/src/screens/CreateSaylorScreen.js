import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { GlobalStyles } from '../styles/globalStyles';

const { width } = Dimensions.get('window');

const CreateSaylorScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [name, setName] = useState('Yoko');
  const [customTitle, setCustomTitle] = useState('The New Transfer Student');
  const [selectedGender, setSelectedGender] = useState('Female');
  const [imageDescription, setImageDescription] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [prologue, setPrologue] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('Anime');
  
  const characterImages = [
    'https://via.placeholder.com/300x400/4A5568/FFFFFF?text=Character1',
    'https://via.placeholder.com/300x400/5A6578/FFFFFF?text=Character2',
    'https://via.placeholder.com/300x400/6A7588/FFFFFF?text=Character3',
  ];

  const imageStyles = ['Anime', '2.5D', 'Illustration', 'Aesthetic'];
  const genders = ['Male', 'Female', 'Other'];

  return (
    <SafeAreaView style={GlobalStyles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Saylor</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Edit Appearance Section */}
      <TouchableOpacity style={styles.editAppearanceRow}>
        <Text style={styles.editAppearanceText}>*Edit Appearance</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
      </TouchableOpacity>

      {/* Image Carousel */}
      <ScrollView 
        horizontal 
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageCarousel}
      >
        {characterImages.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.characterImage} />
            {index === 0 && (
              <TouchableOpacity style={styles.changeButton}>
                <Text style={styles.changeButtonText}>Change</Text>
                <Text style={styles.freeText}>(Free 49/50)</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Image Style Selector */}
      <View style={styles.styleSelector}>
        {imageStyles.map((style) => (
          <TouchableOpacity
            key={style}
            style={[
              styles.styleButton,
              selectedStyle === style && styles.styleButtonActive
            ]}
            onPress={() => setSelectedStyle(style)}
          >
            <Text style={[
              styles.styleButtonText,
              selectedStyle === style && styles.styleButtonTextActive
            ]}>
              {style}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Name Input */}
      <View style={styles.inputSection}>
        <View style={styles.inputHeader}>
          <Text style={styles.inputLabel}>* Name</Text>
          <Text style={styles.aiWriter}>✨ AI Writer</Text>
        </View>
        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter character name"
            placeholderTextColor={Colors.textSecondary}
            maxLength={30}
          />
          <Text style={styles.charCount}>4/30</Text>
        </View>
      </View>

      {/* Custom Title Input */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>* Custom Title</Text>
        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            value={customTitle}
            onChangeText={setCustomTitle}
            placeholder="Enter custom title"
            placeholderTextColor={Colors.textSecondary}
            maxLength={30}
          />
          <Text style={styles.charCount}>24/30</Text>
        </View>
      </View>

      {/* Gender Selection */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>* Gender</Text>
        <View style={styles.genderSelector}>
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

      {/* Image Description */}
      <View style={styles.inputSection}>
        <View style={styles.inputHeader}>
          <Text style={styles.inputLabel}>Image description</Text>
          <Text style={styles.aiWriter}>✨ AI Writer</Text>
        </View>
        <View style={[styles.inputField, styles.textAreaField]}>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={imageDescription}
            onChangeText={setImageDescription}
            placeholder="Yoko stands confidently in a modern, minimalistic setting..."
            placeholderTextColor={Colors.textSecondary}
            multiline
            maxLength={1000}
          />
          <Text style={styles.charCountBottom}>631/1000</Text>
        </View>
      </View>

      {/* Reference Image */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Reference Image</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Ionicons name="image-outline" size={40} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Generate Button */}
      <TouchableOpacity style={styles.generateButton}>
        <Text style={styles.generateButtonText}>Generate (Free 50/50)</Text>
      </TouchableOpacity>

      {/* Introduction Section */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>* Introduction</Text>
        <View style={[styles.inputField, styles.textAreaField]}>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={introduction}
            onChangeText={setIntroduction}
            placeholder="An interesting introduction can make chatting more engaging."
            placeholderTextColor={Colors.textSecondary}
            multiline
            maxLength={2000}
          />
          <Text style={styles.charCountBottom}>0/2000</Text>
        </View>
      </View>

      {/* Prologue Section */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>* Prologue</Text>
        <View style={[styles.inputField, styles.textAreaField]}>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={prologue}
            onChangeText={setPrologue}
            placeholder="Please enter your character's prologue"
            placeholderTextColor={Colors.textSecondary}
            multiline
            maxLength={600}
          />
          <Text style={styles.charCountBottom}>0/600</Text>
        </View>
      </View>

      {/* Tag Section */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Tag</Text>
        <TouchableOpacity style={styles.tagButton}>
          <Text style={styles.tagButtonText}>Edit Tag</Text>
        </TouchableOpacity>
      </View>

      {/* Public Toggle */}
      <View style={styles.publicSection}>
        <Text style={styles.publicText}>Public</Text>
        <TouchableOpacity 
          style={[styles.toggleSwitch, isPublic && styles.toggleSwitchActive]}
          onPress={() => setIsPublic(!isPublic)}
        >
          <View style={[styles.toggleThumb, isPublic && styles.toggleThumbActive]} />
        </TouchableOpacity>
      </View>

      {/* Advanced Settings */}
      <TouchableOpacity 
        style={styles.advancedSection}
        onPress={() => setShowAdvanced(!showAdvanced)}
      >
        <Text style={styles.advancedText}>Advanced Settings</Text>
        <Ionicons 
          name={showAdvanced ? "chevron-up" : "chevron-down"} 
          size={20} 
          color={Colors.textSecondary} 
        />
      </TouchableOpacity>
      
      {/* Advanced Settings Content */}
      {showAdvanced && (
        <View style={styles.advancedContent}>
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Voice Speed</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderValue}>Normal</Text>
            </View>
          </View>
          
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Response Length</Text>
            <View style={styles.genderSelector}>
              <TouchableOpacity style={styles.genderButton}>
                <Text style={styles.genderButtonText}>Short</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.genderButton, styles.genderButtonActive]}>
                <Text style={[styles.genderButtonText, styles.genderButtonTextActive]}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.genderButton}>
                <Text style={styles.genderButtonText}>Long</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Memory Mode</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Enable advanced memory</Text>
              <TouchableOpacity style={styles.toggleSwitch}>
                <View style={styles.toggleThumb} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  editAppearanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
  },
  editAppearanceText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  imageCarousel: {
    height: 240,
    marginVertical: 20,
  },
  imageContainer: {
    width: width - 80,
    marginHorizontal: 40,
    alignItems: 'center',
  },
  characterImage: {
    width: width - 120,
    height: 200,
    borderRadius: 12,
    backgroundColor: Colors.surface,
  },
  changeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  changeButtonText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
  },
  freeText: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  styleSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 10,
  },
  styleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: Colors.surface,
  },
  styleButtonActive: {
    backgroundColor: Colors.primary,
  },
  styleButtonText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  styleButtonTextActive: {
    color: Colors.text,
  },
  inputSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  aiWriter: {
    fontSize: 12,
    color: '#FFB74D',
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
    height: 100,
    alignItems: 'flex-start',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  textArea: {
    height: 70,
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
  genderSelector: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: '#FFB74D',
  },
  genderButtonText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  genderButtonTextActive: {
    color: '#000',
    fontWeight: '500',
  },
  uploadButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateButton: {
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: '#FFB74D',
    alignItems: 'center',
    marginBottom: 30,
  },
  generateButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  tagButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
  },
  tagButtonText: {
    fontSize: 13,
    color: Colors.text,
  },
  publicSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  publicText: {
    fontSize: 16,
    color: Colors.text,
  },
  toggleSwitch: {
    width: 50,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.surface,
    padding: 2,
  },
  toggleSwitchActive: {
    backgroundColor: '#FFB74D',
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.textSecondary,
  },
  toggleThumbActive: {
    backgroundColor: '#FFF',
    transform: [{ translateX: 24 }],
  },
  advancedSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  advancedText: {
    fontSize: 14,
    color: Colors.text,
  },
  confirmButton: {
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: '#FFB74D',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  advancedContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sliderContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 14,
  },
  sliderValue: {
    fontSize: 14,
    color: Colors.text,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 14,
  },
  toggleLabel: {
    fontSize: 14,
    color: Colors.text,
  },
});

export default CreateSaylorScreen;