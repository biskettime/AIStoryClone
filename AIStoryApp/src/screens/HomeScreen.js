import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import CharacterCard from '../components/CharacterCard';
import { Colors } from '../styles/colors';
import { GlobalStyles, SPACING } from '../styles/globalStyles';
import { charactersData } from '../data/charactersData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - (SPACING.md * 3)) / 2; // 2 columns with 16px padding and 16px gap

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('For you');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['For you', 'Male', 'Female', 'Dynamic', 'Anime'];

  const filteredCharacters = charactersData.filter(character => {
    if (selectedCategory === 'For you') return true;
    return character.category === selectedCategory;
  });

  const handleCharacterPress = (character) => {
    navigation.navigate('ChatConversation', { character });
  };

  const renderCharacter = ({ item }) => (
    <CharacterCard
      character={item}
      width={CARD_WIDTH}
      onPress={() => handleCharacterPress(item)}
    />
  );

  return (
    <SafeAreaView style={GlobalStyles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for a Saylor..."
          />
        </View>

        {/* Category Tabs */}
        <View style={styles.categoryContainer}>
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </View>

        {/* Characters Grid */}
        <FlatList
          data={filteredCharacters}
          renderItem={renderCharacter}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    paddingHorizontal: SPACING.md, // 16px
    paddingTop: SPACING.md, // 16px
    paddingBottom: SPACING.sm + SPACING.xs, // 12px
  },
  categoryContainer: {
    paddingBottom: SPACING.md, // 16px
  },
  listContent: {
    paddingHorizontal: SPACING.md, // 16px
    paddingBottom: SPACING.lg + SPACING.xs, // 28px for safe area
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SPACING.md, // 16px consistent with 8px grid
    gap: SPACING.md, // 16px gap between cards
  },
});

export default HomeScreen;