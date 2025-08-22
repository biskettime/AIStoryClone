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
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HuntScreen = ({ navigation }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  // Character data for Trending Dynamic Saylor Series
  const trendingCharacters = [
    {
      id: '1',
      name: 'My Bestfriend',
      subtitle: 'Your best friend',
      image: 'https://via.placeholder.com/150x200/FF9F40/FFFFFF?text=Friend',
    },
    {
      id: '2',
      name: 'Stepmother',
      subtitle: 'Your stepmother',
      image: 'https://via.placeholder.com/150x200/FF6B9D/FFFFFF?text=Step',
    },
    {
      id: '3',
      name: 'Domineering',
      subtitle: 'Isaac, the imposing',
      image: 'https://via.placeholder.com/150x200/4A5568/FFFFFF?text=Dom',
    },
    {
      id: '4',
      name: 'Yande',
      subtitle: 'Daniel',
      image: 'https://via.placeholder.com/150x200/C44569/FFFFFF?text=Yande',
    },
  ];

  // Character data for Non-Human Realm
  const nonHumanCharacters = [
    {
      id: '5',
      name: 'Forgotten',
      image: 'https://via.placeholder.com/150x200/8B5CF6/FFFFFF?text=Forgotten',
    },
    {
      id: '6',
      name: 'Isekai story',
      image: 'https://via.placeholder.com/150x200/EC4899/FFFFFF?text=Isekai',
    },
    {
      id: '7',
      name: 'The Sentien',
      image: 'https://via.placeholder.com/150x200/F59E0B/FFFFFF?text=Sentien',
    },
    {
      id: '8',
      name: 'Maid cafe',
      image: 'https://via.placeholder.com/150x200/10B981/FFFFFF?text=Maid',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a Saylor"
              placeholderTextColor={Colors.textSecondary}
            />
          </View>
        </View>

        {/* Discord Banner */}
        <TouchableOpacity style={styles.discordBanner}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/400x120/5865F2/FFFFFF?text=Discord+Banner' }}
            style={styles.discordBannerImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(88, 101, 242, 0.8)']}
            style={styles.discordGradient}
          >
            <Text style={styles.discordText}>Join our Discord</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Diamond Banner */}
        <View style={styles.diamondSection}>
          <TouchableOpacity 
            style={styles.diamondBanner}
            onPress={() => navigation.navigate('DiamondRanking')}
          >
            <LinearGradient
              colors={['#8B6635', '#D4A574']}
              style={styles.diamondGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.diamondTitle}>Diamond</Text>
              <View style={styles.diamondIconContainer}>
                <Text style={styles.diamondIcon}>💎</Text>
                <Text style={styles.diamondIcon}>💎</Text>
                <Text style={styles.diamondIcon}>💎</Text>
                <Text style={styles.diamondIcon}>💎</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          {/* Carousel Navigation */}
          <View style={styles.carouselNav}>
            <TouchableOpacity>
              <Ionicons name="chevron-back-circle" size={24} color="rgba(255,255,255,0.5)" />
            </TouchableOpacity>
            <View style={styles.carouselDots}>
              {[0, 1, 2, 3].map((index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentBanner === index && styles.activeDot,
                  ]}
                />
              ))}
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Trending Rank Label */}
        <Text style={styles.trendingLabel}>Trending Rank</Text>

        {/* Trending Dynamic Saylor Series */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionIcon}>🎁</Text>
              <Text style={styles.sectionTitle}>Trending Dynamic Saylor Series</Text>
              <Text style={styles.chattersCount}>6K Chatters</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.characterList}
          >
            {trendingCharacters.map((character) => (
              <TouchableOpacity 
                key={character.id}
                style={styles.characterCard}
                onPress={() => navigation.navigate('ChatConversation', { character })}
              >
                <Image 
                  source={{ uri: character.image }} 
                  style={styles.characterImage} 
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.characterGradient}
                >
                  <Text style={styles.characterName} numberOfLines={1}>
                    {character.name}
                  </Text>
                  {character.subtitle && (
                    <Text style={styles.characterSubtitle} numberOfLines={1}>
                      {character.subtitle}
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Non-Human Realm */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionIcon}>🎁</Text>
              <Text style={styles.sectionTitle}>Non-Human Realm</Text>
              <Text style={styles.chattersCount}>25K Chatters</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.characterList}
          >
            {nonHumanCharacters.map((character) => (
              <TouchableOpacity 
                key={character.id}
                style={styles.characterCard}
                onPress={() => navigation.navigate('ChatConversation', { character })}
              >
                <Image 
                  source={{ uri: character.image }} 
                  style={styles.characterImage} 
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.characterGradient}
                >
                  <Text style={styles.characterName} numberOfLines={1}>
                    {character.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Fantasy Adventure */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionIcon}>⚔️</Text>
              <Text style={styles.sectionTitle}>Fantasy Adventure</Text>
              <Text style={styles.chattersCount}>18K Chatters</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.characterList}
          >
            {trendingCharacters.map((character) => (
              <TouchableOpacity 
                key={`fantasy-${character.id}`}
                style={styles.characterCard}
                onPress={() => navigation.navigate('ChatConversation', { character })}
              >
                <Image 
                  source={{ uri: character.image }} 
                  style={styles.characterImage} 
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.characterGradient}
                >
                  <Text style={styles.characterName} numberOfLines={1}>
                    {character.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Romantic Stories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionIcon}>💕</Text>
              <Text style={styles.sectionTitle}>Romantic Stories</Text>
              <Text style={styles.chattersCount}>32K Chatters</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.characterList}
          >
            {nonHumanCharacters.map((character) => (
              <TouchableOpacity 
                key={`romance-${character.id}`}
                style={styles.characterCard}
                onPress={() => navigation.navigate('ChatConversation', { character })}
              >
                <Image 
                  source={{ uri: character.image }} 
                  style={styles.characterImage} 
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.characterGradient}
                >
                  <Text style={styles.characterName} numberOfLines={1}>
                    {character.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Mystery & Horror */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionIcon}>👻</Text>
              <Text style={styles.sectionTitle}>Mystery & Horror</Text>
              <Text style={styles.chattersCount}>15K Chatters</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.characterList}
          >
            {trendingCharacters.map((character) => (
              <TouchableOpacity 
                key={`mystery-${character.id}`}
                style={styles.characterCard}
                onPress={() => navigation.navigate('ChatConversation', { character })}
              >
                <Image 
                  source={{ uri: character.image }} 
                  style={styles.characterImage} 
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.characterGradient}
                >
                  <Text style={styles.characterName} numberOfLines={1}>
                    {character.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
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
    paddingTop: 10,
    paddingBottom: 16,
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
  discordBanner: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    height: 100,
  },
  discordBannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  discordGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discordText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    fontStyle: 'italic',
  },
  diamondSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  diamondBanner: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 80,
    marginBottom: 8,
  },
  diamondGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  diamondTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  diamondIconContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  diamondIcon: {
    fontSize: 16,
  },
  carouselNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  carouselDots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.surfaceLight,
  },
  activeDot: {
    backgroundColor: '#D4A574',
    width: 20,
  },
  trendingLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 16,
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  chattersCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  characterList: {
    paddingLeft: 16,
  },
  characterCard: {
    width: 100,
    height: 140,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  characterImage: {
    width: '100%',
    height: '100%',
  },
  characterGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 6,
    paddingVertical: 8,
    minHeight: 45,
    justifyContent: 'flex-end',
  },
  characterName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  characterSubtitle: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 1,
  },
});

export default HuntScreen;