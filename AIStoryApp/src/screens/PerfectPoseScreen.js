import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

const PerfectPoseScreen = ({ navigation }) => {
  const poseCategories = [
    { id: 1, name: 'Standing', count: 25 },
    { id: 2, name: 'Sitting', count: 18 },
    { id: 3, name: 'Action', count: 32 },
    { id: 4, name: 'Emotional', count: 20 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Get the Perfect Pose! ✨</Text>
        
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.emoji}>🎭</Text>
            <Text style={styles.mainTitle}>Unlock Dynamic Character Poses with AI</Text>
            <Text style={styles.emoji}>🎭</Text>
          </View>
          
          <Text style={styles.description}>
            Master the art of character posing to create visually stunning and emotionally expressive characters that captivate your audience.
          </Text>

          {/* Pose Basics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📐 Pose Fundamentals</Text>
            
            <View style={styles.fundamentalCard}>
              <View style={styles.fundamentalIcon}>
                <Ionicons name="body" size={24} color="#42A5F5" />
              </View>
              <View style={styles.fundamentalContent}>
                <Text style={styles.fundamentalTitle}>Line of Action</Text>
                <Text style={styles.fundamentalText}>
                  Create a strong curved or straight line through the body that defines the overall gesture and energy of the pose.
                </Text>
              </View>
            </View>

            <View style={styles.fundamentalCard}>
              <View style={styles.fundamentalIcon}>
                <Ionicons name="resize" size={24} color="#E91E63" />
              </View>
              <View style={styles.fundamentalContent}>
                <Text style={styles.fundamentalTitle}>Weight Distribution</Text>
                <Text style={styles.fundamentalText}>
                  Balance your character naturally by understanding center of gravity and how weight shifts in different poses.
                </Text>
              </View>
            </View>

            <View style={styles.fundamentalCard}>
              <View style={styles.fundamentalIcon}>
                <Ionicons name="eye" size={24} color="#4CAF50" />
              </View>
              <View style={styles.fundamentalContent}>
                <Text style={styles.fundamentalTitle}>Silhouette</Text>
                <Text style={styles.fundamentalText}>
                  Ensure your pose reads clearly even in silhouette form. Strong poses are recognizable from their outline alone.
                </Text>
              </View>
            </View>

            <View style={styles.fundamentalCard}>
              <View style={styles.fundamentalIcon}>
                <Ionicons name="sparkles" size={24} color="#FFB74D" />
              </View>
              <View style={styles.fundamentalContent}>
                <Text style={styles.fundamentalTitle}>Expression & Emotion</Text>
                <Text style={styles.fundamentalText}>
                  Match body language to facial expression. Every part should work together to convey the intended emotion.
                </Text>
              </View>
            </View>
          </View>

          {/* Pose Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎨 Pose Categories</Text>
            
            <View style={styles.categoriesGrid}>
              {poseCategories.map((category) => (
                <TouchableOpacity key={category.id} style={styles.categoryCard}>
                  <View style={styles.categoryImage}>
                    <Ionicons name="person" size={32} color={Colors.text} />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>{category.count} poses</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* AI Prompting Guide */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🤖 AI Pose Prompting</Text>
            
            <View style={styles.promptCard}>
              <Text style={styles.promptTitle}>Basic Structure</Text>
              <View style={styles.promptExample}>
                <Text style={styles.promptText}>
                  [Character] + [Action] + [Emotion] + [Angle] + [Style]
                </Text>
              </View>
              <Text style={styles.promptDescription}>
                Example: "Young warrior, dynamic fighting stance, determined expression, three-quarter view, anime style"
              </Text>
            </View>

            <View style={styles.promptCard}>
              <Text style={styles.promptTitle}>Advanced Modifiers</Text>
              <View style={styles.modifierList}>
                <Text style={styles.modifierItem}>• Lighting: dramatic, soft, backlit</Text>
                <Text style={styles.modifierItem}>• Camera: low angle, bird's eye, close-up</Text>
                <Text style={styles.modifierItem}>• Movement: flowing, rigid, relaxed</Text>
                <Text style={styles.modifierItem}>• Mood: mysterious, joyful, intense</Text>
              </View>
            </View>

            <View style={styles.promptCard}>
              <Text style={styles.promptTitle}>Common Mistakes to Avoid</Text>
              <View style={styles.mistakeList}>
                <View style={styles.mistakeItem}>
                  <Text style={styles.mistakeIcon}>❌</Text>
                  <Text style={styles.mistakeText}>Overly complex descriptions</Text>
                </View>
                <View style={styles.mistakeItem}>
                  <Text style={styles.mistakeIcon}>❌</Text>
                  <Text style={styles.mistakeText}>Anatomically impossible poses</Text>
                </View>
                <View style={styles.mistakeItem}>
                  <Text style={styles.mistakeIcon}>❌</Text>
                  <Text style={styles.mistakeText}>Conflicting directions</Text>
                </View>
                <View style={styles.mistakeItem}>
                  <Text style={styles.mistakeIcon}>❌</Text>
                  <Text style={styles.mistakeText}>Ignoring character personality</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Quick Tips */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>⚡ Quick Pose Tips</Text>
            
            <View style={styles.tipGrid}>
              <View style={styles.tipCard}>
                <Text style={styles.tipEmoji}>🎯</Text>
                <Text style={styles.tipCardTitle}>Reference</Text>
                <Text style={styles.tipCardText}>Use real photos or 3D models</Text>
              </View>
              
              <View style={styles.tipCard}>
                <Text style={styles.tipEmoji}>🔄</Text>
                <Text style={styles.tipCardTitle}>Iterate</Text>
                <Text style={styles.tipCardText}>Generate multiple variations</Text>
              </View>
              
              <View style={styles.tipCard}>
                <Text style={styles.tipEmoji}>📊</Text>
                <Text style={styles.tipCardTitle}>Test</Text>
                <Text style={styles.tipCardText}>Get feedback from users</Text>
              </View>
              
              <View style={styles.tipCard}>
                <Text style={styles.tipEmoji}>💾</Text>
                <Text style={styles.tipCardTitle}>Save</Text>
                <Text style={styles.tipCardText}>Build your pose library</Text>
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
  fundamentalCard: {
    flexDirection: 'row',
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  fundamentalIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fundamentalContent: {
    flex: 1,
  },
  fundamentalTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
  },
  fundamentalText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1A1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  promptCard: {
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  promptTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
  },
  promptExample: {
    backgroundColor: '#1A1F3A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  promptText: {
    fontSize: 13,
    color: '#FFB74D',
    fontFamily: 'monospace',
  },
  promptDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
    fontStyle: 'italic',
  },
  modifierList: {
    gap: 6,
  },
  modifierItem: {
    fontSize: 13,
    color: Colors.text,
    lineHeight: 20,
  },
  mistakeList: {
    gap: 8,
  },
  mistakeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mistakeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  mistakeText: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
  },
  tipsSection: {
    backgroundColor: '#252C4A',
    borderRadius: 16,
    padding: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  tipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tipCard: {
    width: '48%',
    backgroundColor: '#1A1F3A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tipEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  tipCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  tipCardText: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default PerfectPoseScreen;