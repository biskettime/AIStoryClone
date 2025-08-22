import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { GlobalStyles } from '../styles/globalStyles';

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('Saylor');

  const saylorResults = [
    {
      rank: 1,
      title: "Can I sleep in your arms tonight? Space",
      author: "@SpaceJoker",
      likes: "4,237",
      image: 'https://via.placeholder.com/60x60/4A5568/FFFFFF?text=1',
      isHot: true,
    },
    {
      rank: 2,
      title: "It is all your fault",
      author: "@MARA",
      likes: "3,816",
      image: 'https://via.placeholder.com/60x60/5A6578/FFFFFF?text=2',
      isHot: true,
    },
    {
      rank: 3,
      title: "Married daughter",
      author: "@MoonKnight",
      likes: "3,390",
      image: 'https://via.placeholder.com/60x60/6A7588/FFFFFF?text=3',
      isHot: true,
    },
    {
      rank: 4,
      title: "10 years without your cousin",
      author: "",
      likes: "",
      image: 'https://via.placeholder.com/60x60/7A8598/FFFFFF?text=4',
    },
    {
      rank: 5,
      title: "When My Daddy is Drunk",
      author: "",
      likes: "",
      image: 'https://via.placeholder.com/60x60/8A95A8/FFFFFF?text=5',
    },
    {
      rank: 6,
      title: "From best friend to girlfriend",
      author: "",
      likes: "",
      image: 'https://via.placeholder.com/60x60/9AA5B8/FFFFFF?text=6',
    },
  ];

  const creatorResults = [
    { rank: 1, image: 'https://via.placeholder.com/60x60/4A5568/FFFFFF?text=C1' },
    { rank: 2, image: 'https://via.placeholder.com/60x60/5A6578/FFFFFF?text=C2' },
    { rank: 3, image: 'https://via.placeholder.com/60x60/6A7588/FFFFFF?text=C3' },
    { rank: 4, image: 'https://via.placeholder.com/60x60/7A8598/FFFFFF?text=C4' },
    { rank: 5, image: 'https://via.placeholder.com/60x60/8A95A8/FFFFFF?text=C5' },
    { rank: 6, image: 'https://via.placeholder.com/60x60/9AA5B8/FFFFFF?text=C6' },
  ];

  return (
    <SafeAreaView style={GlobalStyles.container} edges={['top']}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a Saylor"
            placeholderTextColor={Colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Saylor' && styles.tabActive]}
            onPress={() => setSelectedTab('Saylor')}
          >
            <Text style={[styles.tabText, selectedTab === 'Saylor' && styles.tabTextActive]}>
              Saylor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Creator' && styles.tabActive]}
            onPress={() => setSelectedTab('Creator')}
          >
            <Text style={[styles.tabText, selectedTab === 'Creator' && styles.tabTextActive]}>
              Creator
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View all</Text>
          <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Results */}
      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        {selectedTab === 'Saylor' ? (
          <View style={styles.saylorGrid}>
            {saylorResults.map((item) => (
              <TouchableOpacity key={item.rank} style={styles.saylorItem}>
                <View style={styles.rankContainer}>
                  <Text style={[
                    styles.rankNumber,
                    item.rank <= 3 && styles.topRank
                  ]}>
                    {item.rank}
                  </Text>
                  {item.isHot && (
                    <Text style={styles.hotBadge}>🔥</Text>
                  )}
                </View>
                <Image source={{ uri: item.image }} style={styles.saylorImage} />
                <View style={styles.saylorInfo}>
                  <Text style={styles.saylorTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  {item.author && (
                    <Text style={styles.saylorAuthor}>{item.author}</Text>
                  )}
                  {item.likes && (
                    <View style={styles.likesContainer}>
                      <Text style={styles.likesIcon}>🔥</Text>
                      <Text style={styles.likesCount}>{item.likes}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.creatorGrid}>
            {creatorResults.map((item) => (
              <TouchableOpacity key={item.rank} style={styles.creatorItem}>
                <View style={styles.creatorRankContainer}>
                  <Text style={[
                    styles.rankNumber,
                    item.rank <= 3 && styles.topRank
                  ]}>
                    {item.rank}
                  </Text>
                </View>
                <Image source={{ uri: item.image }} style={styles.creatorImage} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  cancelText: {
    fontSize: 14,
    color: Colors.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
  },
  tabs: {
    flexDirection: 'row',
    gap: 24,
  },
  tab: {
    paddingVertical: 8,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.text,
    fontWeight: '500',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  resultsContainer: {
    flex: 1,
  },
  saylorGrid: {
    paddingVertical: 16,
  },
  saylorItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 12,
  },
  rankContainer: {
    width: 30,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  topRank: {
    color: '#FFB74D',
  },
  hotBadge: {
    fontSize: 12,
    position: 'absolute',
    top: -8,
    right: -8,
  },
  saylorImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.surface,
  },
  saylorInfo: {
    flex: 1,
  },
  saylorTitle: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  saylorAuthor: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likesIcon: {
    fontSize: 12,
  },
  likesCount: {
    fontSize: 12,
    color: '#FF6B6B',
  },
  creatorGrid: {
    paddingVertical: 16,
  },
  creatorItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 12,
  },
  creatorRankContainer: {
    width: 30,
    alignItems: 'center',
  },
  creatorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.surface,
  },
});

export default SearchScreen;