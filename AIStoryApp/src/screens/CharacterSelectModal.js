import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

const { width, height } = Dimensions.get('window');

const CharacterSelectModal = ({ visible, onClose, onSelectCharacter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('My Characters');

  const tabs = ['My Characters', 'Favorites', 'Recent'];

  const characters = [
    {
      id: '1',
      name: 'Luna',
      subtitle: 'Your magical companion',
      image: 'https://via.placeholder.com/150x200/FF69B4/FFFFFF?text=Luna',
      creator: '@creator1',
    },
    {
      id: '2',
      name: 'Alex',
      subtitle: 'The adventurer',
      image: 'https://via.placeholder.com/150x200/87CEEB/FFFFFF?text=Alex',
      creator: '@creator2',
    },
    {
      id: '3',
      name: 'Maya',
      subtitle: 'Your best friend',
      image: 'https://via.placeholder.com/150x200/DDA0DD/FFFFFF?text=Maya',
      creator: '@creator3',
    },
    {
      id: '4',
      name: 'Nova',
      subtitle: 'The mysterious one',
      image: 'https://via.placeholder.com/150x200/98FB98/FFFFFF?text=Nova',
      creator: '@creator4',
    },
    {
      id: '5',
      name: 'Kai',
      subtitle: 'The protector',
      image: 'https://via.placeholder.com/150x200/F0E68C/FFFFFF?text=Kai',
      creator: '@creator5',
    },
    {
      id: '6',
      name: 'Zara',
      subtitle: 'The wise mentor',
      image: 'https://via.placeholder.com/150x200/FFB6C1/FFFFFF?text=Zara',
      creator: '@creator6',
    },
  ];

  const handleSelectCharacter = (character) => {
    onSelectCharacter(character);
  };

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
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="chevron-back" size={24} color={Colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Character</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color={Colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search characters..."
                placeholderTextColor={Colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tab,
                    selectedTab === tab && styles.tabActive
                  ]}
                  onPress={() => setSelectedTab(tab)}
                >
                  <Text style={[
                    styles.tabText,
                    selectedTab === tab && styles.tabTextActive
                  ]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Character Grid */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.characterGrid}>
              {characters.map((character) => (
                <TouchableOpacity
                  key={character.id}
                  style={styles.characterCard}
                  onPress={() => handleSelectCharacter(character)}
                >
                  <Image 
                    source={{ uri: character.image }}
                    style={styles.characterImage}
                  />
                  <View style={styles.characterInfo}>
                    <Text style={styles.characterName} numberOfLines={1}>
                      {character.name}
                    </Text>
                    <Text style={styles.characterSubtitle} numberOfLines={1}>
                      {character.subtitle}
                    </Text>
                    <Text style={styles.characterCreator}>
                      {character.creator}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Create New Character Button */}
          <TouchableOpacity style={styles.createNewButton}>
            <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
            <Text style={styles.createNewText}>Create New Character</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    paddingTop: 40,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text,
  },
  tabContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: Colors.surface,
  },
  tabActive: {
    backgroundColor: Colors.primary + '30',
  },
  tabText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  characterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  characterCard: {
    width: (width - 48) / 3,
    marginBottom: 20,
  },
  characterImage: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    marginBottom: 8,
  },
  characterInfo: {
    paddingHorizontal: 4,
  },
  characterName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  characterSubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  characterCreator: {
    fontSize: 10,
    color: Colors.textSecondary,
    opacity: 0.7,
  },
  createNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 30,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  createNewText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default CharacterSelectModal;