import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  Text,
  Dimensions,
} from 'react-native';

import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import CharacterCard from '../components/CharacterCard';
import { Colors } from '../styles/colors';
import { GlobalStyles } from '../styles/globalStyles';
import { charactersData } from '../data/charactersData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('For you');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['For you', 'Male', 'Female', 'Dynamic', 'Anime'];

  const filteredCharacters = charactersData.filter(character => {
    if (selectedCategory === 'For you') return true;
    return character.category === selectedCategory;
  });

  const renderCharacter = ({ item }) => (
    <CharacterCard
      character={item}
      width={CARD_WIDTH}
      onPress={() => console.log('Character pressed:', item.title)}
    />
  );

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for a Saylor"
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  categoryContainer: {
    paddingBottom: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default HomeScreen;