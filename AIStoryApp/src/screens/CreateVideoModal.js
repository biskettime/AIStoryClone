import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const CreateVideoModal = ({ visible, onClose, character }) => {
  const [selectedStyle, setSelectedStyle] = useState('Hot');
  const [selectedVideo, setSelectedVideo] = useState('Kiss');
  const [diamonds, setDiamonds] = useState(100);

  const styles_options = ['Hot', 'Intimate', 'Styling', 'Atmosphere', 'Mood'];
  
  // Video options for each tab based on original app
  const videoOptionsByStyle = {
    'Hot': [
      // Show most popular options for Hot tab
      {
        id: 'popular1',
        name: 'Trending #1',
        preview: character?.image || 'https://via.placeholder.com/120x180/FFB6C1/FFFFFF?text=Trending1',
      },
      {
        id: 'popular2',
        name: 'Trending #2',
        preview: character?.image || 'https://via.placeholder.com/120x180/FF9FA1/FFFFFF?text=Trending2',
      },
      {
        id: 'popular3',
        name: 'Trending #3',
        preview: character?.image || 'https://via.placeholder.com/120x180/DDA0DD/FFFFFF?text=Trending3',
      },
    ],
    'Intimate': [
      {
        id: 'kiss',
        name: 'Kiss',
        preview: character?.image || 'https://via.placeholder.com/120x180/FFB6C1/FFFFFF?text=Kiss',
      },
      {
        id: 'pinch-cheek',
        name: 'Pinch cheek',
        preview: character?.image || 'https://via.placeholder.com/120x180/FFCDD2/FFFFFF?text=Pinch',
      },
      {
        id: 'sleep',
        name: 'Sleep',
        preview: character?.image || 'https://via.placeholder.com/120x180/F8BBD0/FFFFFF?text=Sleep',
      },
    ],
    'Styling': [
      {
        id: 'dress-up',
        name: 'Dress up',
        preview: character?.image || 'https://via.placeholder.com/120x180/E1BEE7/FFFFFF?text=Dress',
      },
      {
        id: 'bikini',
        name: 'Bikini',
        preview: character?.image || 'https://via.placeholder.com/120x180/CE93D8/FFFFFF?text=Bikini',
      },
      {
        id: 'hair-color',
        name: 'Hair color',
        preview: character?.image || 'https://via.placeholder.com/120x180/BA68C8/FFFFFF?text=Hair',
      },
      {
        id: 'maid-outfit',
        name: 'Maid outfit',
        preview: character?.image || 'https://via.placeholder.com/120x180/AB47BC/FFFFFF?text=Maid',
      },
      {
        id: 'ice-cream',
        name: 'Ice cream',
        preview: character?.image || 'https://via.placeholder.com/120x180/9C27B0/FFFFFF?text=Ice',
      },
    ],
    'Atmosphere': [
      {
        id: 'love-heart',
        name: 'Love heart',
        preview: character?.image || 'https://via.placeholder.com/120x180/FF5252/FFFFFF?text=Love',
      },
      {
        id: 'snow',
        name: 'Snow',
        preview: character?.image || 'https://via.placeholder.com/120x180/90CAF9/FFFFFF?text=Snow',
      },
      {
        id: 'petal',
        name: 'Petal',
        preview: character?.image || 'https://via.placeholder.com/120x180/FFB6C1/FFFFFF?text=Petal',
      },
      {
        id: 'cake',
        name: 'Cake',
        preview: character?.image || 'https://via.placeholder.com/120x180/FFC107/FFFFFF?text=Cake',
      },
    ],
    'Mood': [
      {
        id: 'joy',
        name: 'Joy',
        preview: character?.image || 'https://via.placeholder.com/120x180/FFF59D/FFFFFF?text=Joy',
      },
      {
        id: 'sadness',
        name: 'Sadness',
        preview: character?.image || 'https://via.placeholder.com/120x180/81D4FA/FFFFFF?text=Sadness',
      },
      {
        id: 'anger',
        name: 'Anger',
        preview: character?.image || 'https://via.placeholder.com/120x180/EF9A9A/FFFFFF?text=Anger',
      },
      {
        id: 'surprise',
        name: 'Surprise',
        preview: character?.image || 'https://via.placeholder.com/120x180/FFAB91/FFFFFF?text=Surprise',
      },
      {
        id: 'puzzled',
        name: 'Puzzled',
        preview: character?.image || 'https://via.placeholder.com/120x180/B39DDB/FFFFFF?text=Puzzled',
      },
    ],
  };

  const currentVideoOptions = videoOptionsByStyle[selectedStyle] || [];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.diamondCounter}>
              <Text style={styles.diamondIcon}>💎</Text>
              <Text style={styles.diamondCount}>{diamonds}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add-circle" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="camera-outline" size={24} color={Colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Preview */}
          <View style={styles.previewContainer}>
            <Image 
              source={{ uri: character?.image || 'https://via.placeholder.com/350x450/FFB6C1/FFFFFF?text=Character' }}
              style={styles.mainPreview}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)']}
              style={styles.previewGradient}
            />
          </View>

          <View style={styles.bottomSection}>
            {/* Style Tabs */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.styleTabsContainer}
              contentContainerStyle={styles.styleTabsContent}
            >
            {styles_options.map((style) => (
              <TouchableOpacity
                key={style}
                style={styles.styleTab}
                onPress={() => {
                  setSelectedStyle(style);
                  setSelectedVideo(''); // Reset selection when changing tabs
                }}
              >
                <Text style={[
                  styles.styleTabText,
                  selectedStyle === style && styles.styleTabTextActive
                ]}>
                  {style}
                </Text>
                {selectedStyle === style && (
                  <View style={styles.tabIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Video Options */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.videoOptionsContainer}
          >
            {currentVideoOptions.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={[
                  styles.videoOption,
                  selectedVideo === video.name && styles.videoOptionActive
                ]}
                onPress={() => setSelectedVideo(video.name)}
              >
                <Image 
                  source={{ uri: video.preview }}
                  style={styles.videoPreview}
                />
                <View style={styles.videoPlayButton}>
                  <Ionicons name="play" size={14} color={Colors.text} />
                </View>
                <Text style={styles.videoName}>{video.name}</Text>
              </TouchableOpacity>
            ))}
            
            {/* Add more video slots if needed */}
            <TouchableOpacity style={styles.videoOption}>
              <View style={styles.moreVideoContainer}>
                <Ionicons name="add" size={30} color={Colors.textSecondary} />
              </View>
              <Text style={styles.videoName}>More</Text>
            </TouchableOpacity>
          </ScrollView>
          </View>

          {/* Generate Button */}
          <TouchableOpacity style={styles.generateButton}>
            <Text style={styles.generateButtonText}>Generate (100 diamonds)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.background,
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
    paddingTop: 40,
    paddingBottom: 16,
  },
  diamondCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  diamondIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  diamondCount: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 8,
  },
  addButton: {
    marginLeft: 4,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 4,
  },
  closeButton: {
    padding: 4,
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
  mainPreview: {
    width: width * 0.9,
    height: height * 0.45,
    borderRadius: 12,
  },
  previewGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    borderRadius: 12,
  },
  styleTabsContainer: {
    marginBottom: 8,
  },
  styleTabsContent: {
    paddingHorizontal: 16,
    gap: 20,
  },
  styleTab: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginRight: 24,
  },
  styleTabText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  styleTabTextActive: {
    color: Colors.text,
    fontWeight: '500',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.text,
  },
  videoOptionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  videoOption: {
    marginRight: 12,
    alignItems: 'center',
  },
  videoOptionActive: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 2,
  },
  videoPreview: {
    width: 100,
    height: 140,
    borderRadius: 8,
    backgroundColor: Colors.surface,
  },
  videoPlayButton: {
    position: 'absolute',
    top: 55,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoName: {
    fontSize: 12,
    color: Colors.text,
    marginTop: 8,
  },
  customVideoContainer: {
    width: 100,
    height: 140,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  moreVideoContainer: {
    width: 100,
    height: 140,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateButton: {
    marginHorizontal: 20,
    marginBottom: 40,
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default CreateVideoModal;