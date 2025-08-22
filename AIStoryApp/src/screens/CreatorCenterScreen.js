import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../styles/colors';

const { width: screenWidth } = Dimensions.get('window');

const CreatorCenterScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Rules');
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  
  // Animation values
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  
  // Creator stats
  const creatorStats = {
    level: 1,
    totalCreations: '1/5',
    creationsMonth: '1/1',
    chattersMonth: '1/100',
    messagesMonth: '86/1,000',
  };
  
  // Data Overview stats
  const dataOverview = {
    creations: 1,
    chatters: 1,
    messages: 86,
    diamonds: 0,
    likes: 0,
    followers: 0,
  };
  
  // Rules items with icons
  const rulesItems = [
    {
      id: 1,
      icon: '🏅',
      title: 'Review & Recommendation Rules',
      subtitle: 'Every step from judgment to exposure',
    },
    {
      id: 2,
      icon: '📖',
      title: 'FAQ on Recommendation & Exposure',
      subtitle: 'crack the exposure code',
    },
    {
      id: 3,
      icon: '📜',
      title: 'Community Guidelines',
      subtitle: 'Follow rules, be friendly',
    },
    {
      id: 4,
      icon: '📋',
      title: 'Creation Specification',
      subtitle: 'How to Get Recommended by Saylo',
    },
  ];
  
  // Initialize animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  const handleRulePress = (rule) => {
    switch(rule.id) {
      case 1:
        navigation.navigate('ReviewRules');
        break;
      case 2:
        navigation.navigate('FAQExposure');
        break;
      case 3:
        navigation.navigate('CommunityGuidelines');
        break;
      case 4:
        navigation.navigate('CreationSpec');
        break;
      default:
        break;
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeInAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={28} color={Colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Creator Center</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CreatorPolicy')}>
              <Ionicons name="bookmark-outline" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          {/* Level Badge and Stats Card */}
          <View style={styles.levelSection}>
            <View style={styles.levelCard}>
              <View style={styles.levelHeader}>
                <View style={styles.avatarSection}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>U</Text>
                  </View>
                  <Text style={styles.username}>User4ffe</Text>
                </View>
                
                <View style={styles.levelBadgeContainer}>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelNumber}>{creatorStats.level}</Text>
                  </View>
                </View>
              </View>
              
              <Text style={styles.upgradeText}>Upgrade by every Monday ⓘ</Text>
              
              {/* Stats Grid */}
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Total Creations</Text>
                  <Text style={styles.statValue}>{creatorStats.totalCreations}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Creations/M</Text>
                  <Text style={styles.statValue}>{creatorStats.creationsMonth}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Chatters/M</Text>
                  <Text style={styles.statValue}>{creatorStats.chattersMonth}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Messages/M</Text>
                  <Text style={styles.statValue}>{creatorStats.messagesMonth}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Data Overview Section */}
          <View style={styles.dataSection}>
            <View style={styles.dataSectionHeader}>
              <Text style={styles.sectionTitle}>Data Overview</Text>
              <TouchableOpacity style={styles.periodSelector}>
                <Text style={styles.periodText}>{selectedPeriod}</Text>
                <Ionicons name="chevron-down" size={16} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.dataGridContainer}>
              <View style={styles.dataGrid}>
                <View style={styles.dataItem}>
                  <Text style={styles.dataValue}>{dataOverview.creations}</Text>
                  <Text style={styles.dataLabel}>Creations</Text>
                </View>
                <View style={styles.dataItem}>
                  <Text style={styles.dataValue}>{dataOverview.chatters}</Text>
                  <Text style={styles.dataLabel}>Chatters</Text>
                </View>
                <View style={styles.dataItem}>
                  <Text style={styles.dataValue}>{dataOverview.messages}</Text>
                  <Text style={styles.dataLabel}>Messages</Text>
                </View>
                <View style={styles.dataItem}>
                  <Text style={styles.dataValue}>{dataOverview.diamonds}</Text>
                  <Text style={styles.dataLabel}>Diamonds</Text>
                </View>
                <View style={styles.dataItem}>
                  <Text style={styles.dataValue}>{dataOverview.likes}</Text>
                  <Text style={styles.dataLabel}>Like</Text>
                </View>
                <View style={styles.dataItem}>
                  <Text style={styles.dataValue}>{dataOverview.followers}</Text>
                  <Text style={styles.dataLabel}>+ Followers</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Activities Section */}
          <View style={styles.activitiesSection}>
            <Text style={styles.sectionTitle}>Activities</Text>
            
            <TouchableOpacity style={styles.activityCard}>
              <View style={styles.activityLeft}>
                <View style={styles.activityIcon}>
                  <Text style={styles.activityEmoji}>🎁</Text>
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>Non-Human Realm</Text>
                  <Text style={styles.activitySubtitle}>
                    【🔥Tales of the Non-Human Realm】Unleash your creativity
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join In</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* Tab Section */}
          <View style={styles.tabSection}>
            <View style={styles.tabs}>
              <TouchableOpacity 
                onPress={() => setSelectedTab('Featured Works')}
                style={[styles.tab, selectedTab === 'Featured Works' && styles.tabActive]}
              >
                <Text style={[styles.tabText, selectedTab === 'Featured Works' && styles.tabTextActive]}>
                  Featured Works
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => setSelectedTab('Creator Academy')}
                style={[styles.tab, selectedTab === 'Creator Academy' && styles.tabActive]}
              >
                <Text style={[styles.tabText, selectedTab === 'Creator Academy' && styles.tabTextActive]}>
                  Creator Academy
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => setSelectedTab('Rules')}
                style={[styles.tab, selectedTab === 'Rules' && styles.tabActive]}
              >
                <Text style={[styles.tabText, selectedTab === 'Rules' && styles.tabTextActive]}>
                  Rules
                </Text>
              </TouchableOpacity>
            </View>

            {/* Tab Content */}
            {selectedTab === 'Rules' && (
              <View style={styles.rulesContent}>
                {rulesItems.map((rule) => (
                  <TouchableOpacity 
                    key={rule.id}
                    style={styles.ruleCard}
                    onPress={() => handleRulePress(rule)}
                  >
                    <View style={styles.ruleIcon}>
                      <Text style={styles.ruleEmoji}>{rule.icon}</Text>
                    </View>
                    <View style={styles.ruleInfo}>
                      <Text style={styles.ruleTitle}>{rule.title}</Text>
                      <Text style={styles.ruleSubtitle}>{rule.subtitle}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedTab === 'Featured Works' && (
              <View style={styles.featuredContent}>
                <View style={styles.featuredGrid}>
                  <TouchableOpacity style={styles.storyCard}>
                    <View style={styles.storyImageContainer}>
                      <View style={styles.storyAvatar}>
                        <Text style={styles.avatarEmoji}>👸</Text>
                      </View>
                    </View>
                    <View style={styles.storyInfo}>
                      <Text style={styles.storyTitle}>Luna the Moon Princess</Text>
                      <View style={styles.storyStats}>
                        <View style={styles.statItem}>
                          <Ionicons name="heart" size={12} color="#FF6B6B" />
                          <Text style={styles.statText}>2.3k</Text>
                        </View>
                        <View style={styles.statItem}>
                          <Ionicons name="chatbubble" size={12} color="#42A5F5" />
                          <Text style={styles.statText}>892</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.storyCard}>
                    <View style={styles.storyImageContainer}>
                      <View style={styles.storyAvatar}>
                        <Text style={styles.avatarEmoji}>🧙‍♂️</Text>
                      </View>
                    </View>
                    <View style={styles.storyInfo}>
                      <Text style={styles.storyTitle}>Wizard Merlin</Text>
                      <View style={styles.storyStats}>
                        <View style={styles.statItem}>
                          <Ionicons name="heart" size={12} color="#FF6B6B" />
                          <Text style={styles.statText}>1.8k</Text>
                        </View>
                        <View style={styles.statItem}>
                          <Ionicons name="chatbubble" size={12} color="#42A5F5" />
                          <Text style={styles.statText}>654</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.storyCard}>
                    <View style={styles.storyImageContainer}>
                      <View style={styles.storyAvatar}>
                        <Text style={styles.avatarEmoji}>🦊</Text>
                      </View>
                    </View>
                    <View style={styles.storyInfo}>
                      <Text style={styles.storyTitle}>Kitsune Spirit</Text>
                      <View style={styles.storyStats}>
                        <View style={styles.statItem}>
                          <Ionicons name="heart" size={12} color="#FF6B6B" />
                          <Text style={styles.statText}>3.1k</Text>
                        </View>
                        <View style={styles.statItem}>
                          <Ionicons name="chatbubble" size={12} color="#42A5F5" />
                          <Text style={styles.statText}>1.2k</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.storyCard}>
                    <View style={styles.storyImageContainer}>
                      <View style={styles.storyAvatar}>
                        <Text style={styles.avatarEmoji}>🤖</Text>
                      </View>
                    </View>
                    <View style={styles.storyInfo}>
                      <Text style={styles.storyTitle}>AI Assistant Alex</Text>
                      <View style={styles.storyStats}>
                        <View style={styles.statItem}>
                          <Ionicons name="heart" size={12} color="#FF6B6B" />
                          <Text style={styles.statText}>945</Text>
                        </View>
                        <View style={styles.statItem}>
                          <Ionicons name="chatbubble" size={12} color="#42A5F5" />
                          <Text style={styles.statText}>423</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.storyCard}>
                    <View style={styles.storyImageContainer}>
                      <View style={styles.storyAvatar}>
                        <Text style={styles.avatarEmoji}>🧚‍♀️</Text>
                      </View>
                    </View>
                    <View style={styles.storyInfo}>
                      <Text style={styles.storyTitle}>Fairy Tinkerbell</Text>
                      <View style={styles.storyStats}>
                        <View style={styles.statItem}>
                          <Ionicons name="heart" size={12} color="#FF6B6B" />
                          <Text style={styles.statText}>1.5k</Text>
                        </View>
                        <View style={styles.statItem}>
                          <Ionicons name="chatbubble" size={12} color="#42A5F5" />
                          <Text style={styles.statText}>789</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.storyCard}>
                    <View style={styles.storyImageContainer}>
                      <View style={styles.storyAvatar}>
                        <Text style={styles.avatarEmoji}>🐉</Text>
                      </View>
                    </View>
                    <View style={styles.storyInfo}>
                      <Text style={styles.storyTitle}>Dragon Lord</Text>
                      <View style={styles.storyStats}>
                        <View style={styles.statItem}>
                          <Ionicons name="heart" size={12} color="#FF6B6B" />
                          <Text style={styles.statText}>4.2k</Text>
                        </View>
                        <View style={styles.statItem}>
                          <Ionicons name="chatbubble" size={12} color="#42A5F5" />
                          <Text style={styles.statText}>2.1k</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Add Character Button */}
                <TouchableOpacity style={styles.addCharacterButton}>
                  <Ionicons name="add-circle" size={24} color="#FFB74D" />
                  <Text style={styles.addCharacterText}>Create New Character</Text>
                </TouchableOpacity>
              </View>
            )}

            {selectedTab === 'Creator Academy' && (
              <View style={styles.academyContent}>
                <TouchableOpacity 
                  style={styles.academyCard}
                  onPress={() => navigation.navigate('PerfectPose')}
                >
                  <View style={styles.academyIcon}>
                    <Text>🎭</Text>
                  </View>
                  <View style={styles.academyInfo}>
                    <Text style={styles.academyTitle}>Get the Perfect Pose! ✨</Text>
                    <Text style={styles.academySubtitle}>
                      Unlock Dynamic Character Poses with AI
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.academyCard}
                  onPress={() => navigation.navigate('ScriptCreation')}
                >
                  <View style={styles.academyIcon}>
                    <Text>✍️</Text>
                  </View>
                  <View style={styles.academyInfo}>
                    <Text style={styles.academyTitle}>Script Creation ✨</Text>
                    <Text style={styles.academySubtitle}>
                      Elements for Quickly Creating a Saylo
                    </Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.academyCard}
                  onPress={() => navigation.navigate('GenerateImages')}
                >
                  <View style={styles.academyIcon}>
                    <Text>🖼️</Text>
                  </View>
                  <View style={styles.academyInfo}>
                    <Text style={styles.academyTitle}>Generate Images ✨</Text>
                    <Text style={styles.academySubtitle}>
                      How to Describe Your Beloved
                    </Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.academyCard}
                  onPress={() => navigation.navigate('CharacterSetting')}
                >
                  <View style={styles.academyIcon}>
                    <Text>⚙️</Text>
                  </View>
                  <View style={styles.academyInfo}>
                    <Text style={styles.academyTitle}>Character Setting ✨</Text>
                    <Text style={styles.academySubtitle}>
                      Tips for Character Design
                    </Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.academyCard}
                  onPress={() => navigation.navigate('AdvancedCharacter')}
                >
                  <View style={styles.academyIcon}>
                    <Text>📝</Text>
                  </View>
                  <View style={styles.academyInfo}>
                    <Text style={styles.academyTitle}>Advance Character Setting ✨</Text>
                    <Text style={styles.academySubtitle}>
                      Tips to Write a Good Character Story
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={{ height: 50 }} />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1F3A',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  levelSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  levelCard: {
    backgroundColor: '#252C4A',
    borderRadius: 16,
    padding: 16,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#42A5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  levelBadgeContainer: {
    alignItems: 'center',
  },
  levelBadge: {
    width: 60,
    height: 60,
    backgroundColor: '#C0C0C0',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
  },
  upgradeText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1F3A',
  },
  dataSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  dataSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252C4A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  periodText: {
    fontSize: 14,
    color: Colors.text,
    marginRight: 4,
  },
  dataGridContainer: {
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  dataGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dataItem: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: '1.5%',
  },
  dataValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  dataLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  activitiesSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#1A1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityEmoji: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  joinButton: {
    backgroundColor: '#FFB74D',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1F3A',
  },
  tabSection: {
    paddingHorizontal: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: Colors.text,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.text,
  },
  rulesContent: {
    gap: 12,
  },
  ruleCard: {
    flexDirection: 'row',
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  ruleIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#1A1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  ruleEmoji: {
    fontSize: 28,
  },
  ruleInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  ruleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  ruleSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  featuredContent: {
    gap: 12,
  },
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  storyCard: {
    width: (screenWidth - 44) / 2,
    backgroundColor: '#252C4A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  storyImageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#1A1F3A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#252C4A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 40,
  },
  storyInfo: {
    padding: 12,
  },
  storyTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  storyStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  addCharacterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    borderWidth: 2,
    borderColor: '#FFB74D',
    borderStyle: 'dashed',
  },
  addCharacterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFB74D',
  },
  featuredCard: {
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  featuredImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  featuredImageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#1A1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featuredImageEmoji: {
    fontSize: 48,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  academyContent: {
    gap: 12,
  },
  academyCard: {
    flexDirection: 'row',
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  academyIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#1A1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  academyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  academyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  academySubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});

export default CreatorCenterScreen;