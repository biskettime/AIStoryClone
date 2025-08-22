import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const DiamondRankingScreen = ({ navigation }) => {
  const [selectedMainTab, setSelectedMainTab] = useState('Saylor');
  const [selectedPeriod, setSelectedPeriod] = useState('Weekly');

  const mainTabs = ['Saylor', 'Creator', 'Diamond'];
  const periods = ['Weekly', 'Monthly', 'Newly'];
  
  // Top 3 characters
  const topCharacters = [
    {
      id: '1',
      rank: 2,
      title: 'It is all your fault',
      author: '@MARA',
      hearts: 3825,
      image: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=1',
    },
    {
      id: '2', 
      rank: 1,
      title: 'Can I sleep in your bed?',
      author: '@Safe-Joker',
      hearts: 4247,
      image: 'https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=2',
    },
    {
      id: '3',
      rank: 3,
      title: 'Married daughter',
      author: '@MoonKnight',
      hearts: 3393,
      image: 'https://via.placeholder.com/300x400/95A5A6/FFFFFF?text=3',
    },
  ];

  // Ranking list 4-7
  const rankingList = [
    {
      id: '4',
      rank: 4,
      title: '10 years without your cousin',
      author: '@Jose',
      hearts: 2983,
      image: 'https://via.placeholder.com/60x60/E91E63/FFFFFF?text=4',
    },
    {
      id: '5',
      rank: 5,
      title: 'When My Daddy Is Drunk',
      author: '@Chiichan--',
      hearts: 2744,
      image: 'https://via.placeholder.com/60x60/9C27B0/FFFFFF?text=5',
    },
    {
      id: '6',
      rank: 6,
      title: 'From best friend to girlfriend',
      author: '@MARA',
      hearts: 2548,
      image: 'https://via.placeholder.com/60x60/FF9800/FFFFFF?text=6',
    },
    {
      id: '7',
      rank: 7,
      title: 'The nerd in your locker',
      author: '@Peachy',
      hearts: 2394,
      image: 'https://via.placeholder.com/60x60/3F51B5/FFFFFF?text=7',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.mainTabs}>
            {mainTabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedMainTab(tab)}
              >
                <Text style={[
                  styles.mainTabText,
                  selectedMainTab === tab && styles.mainTabActive
                ]}>
                  {tab}
                </Text>
                {selectedMainTab === tab && <View style={styles.mainTabIndicator} />}
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={22} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Period Selector */}
        <View style={styles.periodContainer}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period && styles.periodTextActive
              ]}>
                {period}
              </Text>
              <Ionicons name="chevron-down" size={14} color={Colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* End Date */}
        <Text style={styles.endDate}>The list ends on 8/24</Text>

        {/* Top 3 Cards */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.topCardsContainer}
          contentContainerStyle={styles.topCardsContent}
        >
          {topCharacters.map((character) => (
            <TouchableOpacity 
              key={character.id} 
              style={styles.topCard}
              onPress={() => navigation.navigate('ChatConversation', { character })}
            >
              <Image source={{ uri: character.image }} style={styles.topCardImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.topCardGradient}
              >
                <View style={styles.rankBadge}>
                  <Text style={styles.rankNumber}>{character.rank}</Text>
                </View>
                <View style={styles.topCardContent}>
                  <Text style={styles.topCardTitle} numberOfLines={2}>
                    {character.title}
                  </Text>
                  <Text style={styles.topCardAuthor}>{character.author}</Text>
                  <View style={styles.heartsContainer}>
                    <Text style={styles.heartIcon}>❤️</Text>
                    <Text style={styles.heartsCount}>{character.hearts.toLocaleString()}</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Ranking List 4-7 */}
        <View style={styles.rankingListContainer}>
          {rankingList.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.rankingItem}
              onPress={() => navigation.navigate('ChatConversation', { character: item })}
            >
              <View style={styles.rankingLeft}>
                <View style={styles.rankingNumberContainer}>
                  <Text style={styles.rankingIcon}>✨</Text>
                  <Text style={styles.rankingNumber}>{item.rank}</Text>
                </View>
                <Image source={{ uri: item.image }} style={styles.rankingImage} />
                <View style={styles.rankingInfo}>
                  <Text style={styles.rankingTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.rankingAuthor}>{item.author}</Text>
                </View>
              </View>
              <View style={styles.rankingHearts}>
                <Text style={styles.heartIcon}>❤️</Text>
                <Text style={styles.rankingHeartsCount}>{item.hearts.toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  mainTabs: {
    flexDirection: 'row',
    gap: 30,
  },
  mainTabText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  mainTabActive: {
    color: Colors.text,
  },
  mainTabIndicator: {
    height: 2,
    backgroundColor: Colors.text,
    marginTop: 8,
  },
  periodContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 12,
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 4,
  },
  periodButtonActive: {
    backgroundColor: '#3A3A4A',
  },
  periodText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  periodTextActive: {
    color: Colors.text,
  },
  endDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  topCardsContainer: {
    marginBottom: 20,
  },
  topCardsContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  topCard: {
    width: width * 0.32,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  topCardImage: {
    width: '100%',
    height: '100%',
  },
  topCardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    justifyContent: 'flex-end',
    padding: 8,
  },
  rankBadge: {
    position: 'absolute',
    top: -120,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  rankNumber: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  topCardContent: {
    marginTop: 'auto',
  },
  topCardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  topCardAuthor: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  heartsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  heartIcon: {
    fontSize: 10,
  },
  heartsCount: {
    fontSize: 11,
    color: Colors.text,
    fontWeight: '500',
  },
  rankingListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.surfaceLight,
  },
  rankingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankingNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    minWidth: 30,
  },
  rankingIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  rankingNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  rankingImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  rankingInfo: {
    flex: 1,
  },
  rankingTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 2,
  },
  rankingAuthor: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  rankingHearts: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rankingHeartsCount: {
    fontSize: 13,
    color: '#FF4458',
    fontWeight: '500',
  },
});

export default DiamondRankingScreen;