import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

const CharacterSettingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Character Setting ✨</Text>
        
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.emoji}>⚙️</Text>
            <Text style={styles.mainTitle}>Tips for Character Design</Text>
            <Text style={styles.emoji}>⚙️</Text>
          </View>
          
          <Text style={styles.description}>
            Create compelling characters with depth, personality, and unique traits that resonate with your audience.
          </Text>

          {/* Character Building Blocks */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏗️ Character Building Blocks</Text>
            
            <View style={styles.buildingBlock}>
              <View style={styles.blockHeader}>
                <View style={styles.blockIcon}>
                  <Text style={styles.blockEmoji}>🎭</Text>
                </View>
                <Text style={styles.blockTitle}>Core Personality</Text>
              </View>
              <Text style={styles.blockDescription}>
                Define 3-5 core traits that drive all character decisions
              </Text>
              <View style={styles.traitsList}>
                <Text style={styles.traitItem}>• Brave but reckless</Text>
                <Text style={styles.traitItem}>• Intelligent yet socially awkward</Text>
                <Text style={styles.traitItem}>• Kind-hearted with hidden strength</Text>
                <Text style={styles.traitItem}>• Mysterious with playful moments</Text>
              </View>
            </View>

            <View style={styles.buildingBlock}>
              <View style={styles.blockHeader}>
                <View style={styles.blockIcon}>
                  <Text style={styles.blockEmoji}>📚</Text>
                </View>
                <Text style={styles.blockTitle}>Backstory Elements</Text>
              </View>
              <Text style={styles.blockDescription}>
                Create a rich history that explains current behavior
              </Text>
              <View style={styles.traitsList}>
                <Text style={styles.traitItem}>• Origin and birthplace</Text>
                <Text style={styles.traitItem}>• Defining life events</Text>
                <Text style={styles.traitItem}>• Important relationships</Text>
                <Text style={styles.traitItem}>• Dreams and fears</Text>
              </View>
            </View>

            <View style={styles.buildingBlock}>
              <View style={styles.blockHeader}>
                <View style={styles.blockIcon}>
                  <Text style={styles.blockEmoji}>💬</Text>
                </View>
                <Text style={styles.blockTitle}>Voice & Speech</Text>
              </View>
              <Text style={styles.blockDescription}>
                Develop unique speaking patterns and vocabulary
              </Text>
              <View style={styles.traitsList}>
                <Text style={styles.traitItem}>• Formal vs casual tone</Text>
                <Text style={styles.traitItem}>• Unique catchphrases</Text>
                <Text style={styles.traitItem}>• Cultural expressions</Text>
                <Text style={styles.traitItem}>• Emotional speech patterns</Text>
              </View>
            </View>

            <View style={styles.buildingBlock}>
              <View style={styles.blockHeader}>
                <View style={styles.blockIcon}>
                  <Text style={styles.blockEmoji}>🎯</Text>
                </View>
                <Text style={styles.blockTitle}>Goals & Motivations</Text>
              </View>
              <Text style={styles.blockDescription}>
                What drives your character forward in their story
              </Text>
              <View style={styles.traitsList}>
                <Text style={styles.traitItem}>• Short-term objectives</Text>
                <Text style={styles.traitItem}>• Long-term dreams</Text>
                <Text style={styles.traitItem}>• Internal conflicts</Text>
                <Text style={styles.traitItem}>• External challenges</Text>
              </View>
            </View>
          </View>

          {/* Character Types */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🌟 Popular Character Archetypes</Text>
            
            <View style={styles.archetypeGrid}>
              <TouchableOpacity style={styles.archetypeCard}>
                <Text style={styles.archetypeEmoji}>🦸</Text>
                <Text style={styles.archetypeName}>Hero</Text>
                <Text style={styles.archetypeDesc}>Brave protector</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.archetypeCard}>
                <Text style={styles.archetypeEmoji}>🧙</Text>
                <Text style={styles.archetypeName}>Mentor</Text>
                <Text style={styles.archetypeDesc}>Wise guide</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.archetypeCard}>
                <Text style={styles.archetypeEmoji}>😈</Text>
                <Text style={styles.archetypeName}>Trickster</Text>
                <Text style={styles.archetypeDesc}>Playful chaos</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.archetypeCard}>
                <Text style={styles.archetypeEmoji}>💝</Text>
                <Text style={styles.archetypeName}>Lover</Text>
                <Text style={styles.archetypeDesc}>Romantic soul</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.archetypeCard}>
                <Text style={styles.archetypeEmoji}>🗡️</Text>
                <Text style={styles.archetypeName}>Warrior</Text>
                <Text style={styles.archetypeDesc}>Fighter spirit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.archetypeCard}>
                <Text style={styles.archetypeEmoji}>👑</Text>
                <Text style={styles.archetypeName}>Ruler</Text>
                <Text style={styles.archetypeDesc}>Natural leader</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Design Checklist */}
          <View style={styles.checklistSection}>
            <Text style={styles.checklistTitle}>✅ Character Design Checklist</Text>
            
            <View style={styles.checklistCategory}>
              <Text style={styles.categoryTitle}>Basic Information</Text>
              <View style={styles.checkItem}>
                <Ionicons name="checkbox" size={20} color="#4CAF50" />
                <Text style={styles.checkText}>Name with meaning</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkbox" size={20} color="#4CAF50" />
                <Text style={styles.checkText}>Age and birthday</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkbox" size={20} color="#4CAF50" />
                <Text style={styles.checkText}>Physical appearance</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkbox" size={20} color="#4CAF50" />
                <Text style={styles.checkText}>Occupation/role</Text>
              </View>
            </View>

            <View style={styles.checklistCategory}>
              <Text style={styles.categoryTitle}>Personality Depth</Text>
              <View style={styles.checkItem}>
                <Ionicons name="checkbox" size={20} color="#4CAF50" />
                <Text style={styles.checkText}>Strengths and talents</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkbox" size={20} color="#4CAF50" />
                <Text style={styles.checkText}>Flaws and weaknesses</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkbox" size={20} color="#4CAF50" />
                <Text style={styles.checkText}>Likes and dislikes</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkbox" size={20} color="#4CAF50" />
                <Text style={styles.checkText}>Hobbies and interests</Text>
              </View>
            </View>

            <View style={styles.checklistCategory}>
              <Text style={styles.categoryTitle}>Relationships</Text>
              <View style={styles.checkItem}>
                <Ionicons name="checkbox" size={20} color="#4CAF50" />
                <Text style={styles.checkText}>Family connections</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkbox" size={20} color="#4CAF50" />
                <Text style={styles.checkText}>Friend dynamics</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkbox" size={20} color="#4CAF50" />
                <Text style={styles.checkText}>Romantic interests</Text>
              </View>
              <View style={styles.checkItem}>
                <Ionicons name="checkbox" size={20} color="#4CAF50" />
                <Text style={styles.checkText}>Rivals or enemies</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 50 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1F3A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A3654',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  buildingBlock: {
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  blockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  blockIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1A1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  blockEmoji: {
    fontSize: 20,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  blockDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 10,
    lineHeight: 18,
  },
  traitsList: {
    gap: 6,
  },
  traitItem: {
    fontSize: 13,
    color: Colors.text,
    lineHeight: 18,
  },
  archetypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  archetypeCard: {
    width: '31%',
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  archetypeEmoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  archetypeName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  archetypeDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  checklistSection: {
    backgroundColor: '#252C4A',
    borderRadius: 16,
    padding: 20,
  },
  checklistTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 20,
  },
  checklistCategory: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFB74D',
    marginBottom: 10,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkText: {
    fontSize: 13,
    color: Colors.text,
    marginLeft: 8,
  },
});

export default CharacterSettingScreen;