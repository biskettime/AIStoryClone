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

const CreationSpecScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Creation Specification</Text>
        
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.emoji}>📋</Text>
            <Text style={styles.mainTitle}>How to Get Recommended by Saylo</Text>
            <Text style={styles.emoji}>📋</Text>
          </View>
          
          <Text style={styles.description}>
            Follow these technical specifications and best practices to maximize your content's recommendation potential and reach millions of users.
          </Text>

          {/* Character Creation Specs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Character Creation Specifications</Text>
            
            <View style={styles.specCard}>
              <Text style={styles.specLabel}>Character Name</Text>
              <Text style={styles.specValue}>3-20 characters</Text>
              <Text style={styles.specDescription}>
                Unique, memorable, searchable. Avoid special characters or numbers.
              </Text>
            </View>

            <View style={styles.specCard}>
              <Text style={styles.specLabel}>Character Description</Text>
              <Text style={styles.specValue}>50-500 characters</Text>
              <Text style={styles.specDescription}>
                Clear personality, background, unique traits. First 100 chars shown in preview.
              </Text>
            </View>

            <View style={styles.specCard}>
              <Text style={styles.specLabel}>Profile Image</Text>
              <Text style={styles.specValue}>1:1 ratio, min 512x512px</Text>
              <Text style={styles.specDescription}>
                High quality, clear face/character, appropriate content. JPG/PNG, max 5MB.
              </Text>
            </View>

            <View style={styles.specCard}>
              <Text style={styles.specLabel}>Voice Setting</Text>
              <Text style={styles.specValue}>3-5 example dialogues</Text>
              <Text style={styles.specDescription}>
                Consistent tone, personality-driven, natural conversation flow.
              </Text>
            </View>

            <View style={styles.specCard}>
              <Text style={styles.specLabel}>Tags</Text>
              <Text style={styles.specValue}>3-10 relevant tags</Text>
              <Text style={styles.specDescription}>
                Category tags, personality traits, interests. Use trending tags wisely.
              </Text>
            </View>
          </View>

          {/* Content Quality Standards */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⭐ Quality Standards for Recommendation</Text>
            
            <View style={styles.qualityItem}>
              <View style={styles.qualityIcon}>
                <Text style={styles.qualityEmoji}>🎨</Text>
              </View>
              <View style={styles.qualityContent}>
                <Text style={styles.qualityTitle}>Visual Quality</Text>
                <Text style={styles.qualityText}>
                  • High-resolution images (1024x1024 preferred)
                  {'\n'}• Consistent art style across all images
                  {'\n'}• Professional lighting and composition
                  {'\n'}• No watermarks or low-quality screenshots
                </Text>
              </View>
            </View>

            <View style={styles.qualityItem}>
              <View style={styles.qualityIcon}>
                <Text style={styles.qualityEmoji}>✍️</Text>
              </View>
              <View style={styles.qualityContent}>
                <Text style={styles.qualityTitle}>Writing Quality</Text>
                <Text style={styles.qualityText}>
                  • Rich backstory (500+ words recommended)
                  {'\n'}• Detailed personality traits
                  {'\n'}• Unique speech patterns and quirks
                  {'\n'}• Grammar and spelling checked
                </Text>
              </View>
            </View>

            <View style={styles.qualityItem}>
              <View style={styles.qualityIcon}>
                <Text style={styles.qualityEmoji}>💬</Text>
              </View>
              <View style={styles.qualityContent}>
                <Text style={styles.qualityTitle}>Interaction Design</Text>
                <Text style={styles.qualityText}>
                  • Natural conversation flow
                  {'\n'}• Multiple conversation branches
                  {'\n'}• Contextual responses
                  {'\n'}• Emotional depth and reactions
                </Text>
              </View>
            </View>

            <View style={styles.qualityItem}>
              <View style={styles.qualityIcon}>
                <Text style={styles.qualityEmoji}>🎯</Text>
              </View>
              <View style={styles.qualityContent}>
                <Text style={styles.qualityTitle}>Target Audience</Text>
                <Text style={styles.qualityText}>
                  • Clear demographic focus
                  {'\n'}• Age-appropriate content
                  {'\n'}• Cultural sensitivity
                  {'\n'}• Language localization ready
                </Text>
              </View>
            </View>
          </View>

          {/* Technical Requirements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔧 Technical Requirements</Text>
            
            <View style={styles.techCard}>
              <View style={styles.techHeader}>
                <Ionicons name="image" size={20} color="#42A5F5" />
                <Text style={styles.techTitle}>Image Specifications</Text>
              </View>
              <View style={styles.techGrid}>
                <View style={styles.techItem}>
                  <Text style={styles.techLabel}>Format</Text>
                  <Text style={styles.techValue}>JPG, PNG, WebP</Text>
                </View>
                <View style={styles.techItem}>
                  <Text style={styles.techLabel}>Size</Text>
                  <Text style={styles.techValue}>Max 5MB per image</Text>
                </View>
                <View style={styles.techItem}>
                  <Text style={styles.techLabel}>Resolution</Text>
                  <Text style={styles.techValue}>Min 512px, Max 4096px</Text>
                </View>
                <View style={styles.techItem}>
                  <Text style={styles.techLabel}>Aspect Ratio</Text>
                  <Text style={styles.techValue}>1:1, 3:4, 9:16</Text>
                </View>
              </View>
            </View>

            <View style={styles.techCard}>
              <View style={styles.techHeader}>
                <Ionicons name="videocam" size={20} color="#E91E63" />
                <Text style={styles.techTitle}>Video Specifications</Text>
              </View>
              <View style={styles.techGrid}>
                <View style={styles.techItem}>
                  <Text style={styles.techLabel}>Format</Text>
                  <Text style={styles.techValue}>MP4, MOV</Text>
                </View>
                <View style={styles.techItem}>
                  <Text style={styles.techLabel}>Size</Text>
                  <Text style={styles.techValue}>Max 100MB</Text>
                </View>
                <View style={styles.techItem}>
                  <Text style={styles.techLabel}>Duration</Text>
                  <Text style={styles.techValue}>5-60 seconds</Text>
                </View>
                <View style={styles.techItem}>
                  <Text style={styles.techLabel}>Resolution</Text>
                  <Text style={styles.techValue}>Min 720p</Text>
                </View>
              </View>
            </View>

            <View style={styles.techCard}>
              <View style={styles.techHeader}>
                <Ionicons name="text" size={20} color="#4CAF50" />
                <Text style={styles.techTitle}>Text Content</Text>
              </View>
              <View style={styles.techGrid}>
                <View style={styles.techItem}>
                  <Text style={styles.techLabel}>Title</Text>
                  <Text style={styles.techValue}>3-50 chars</Text>
                </View>
                <View style={styles.techItem}>
                  <Text style={styles.techLabel}>Description</Text>
                  <Text style={styles.techValue}>50-2000 chars</Text>
                </View>
                <View style={styles.techItem}>
                  <Text style={styles.techLabel}>Dialogue</Text>
                  <Text style={styles.techValue}>10-500 chars/msg</Text>
                </View>
                <View style={styles.techItem}>
                  <Text style={styles.techLabel}>Encoding</Text>
                  <Text style={styles.techValue}>UTF-8</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Pro Tips */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>💡 Pro Tips for Getting Featured</Text>
            
            <View style={styles.tipsList}>
              <Text style={styles.tipItem}>• Create during peak hours (7-9 PM weekdays)</Text>
              <Text style={styles.tipItem}>• Use trending tags within 24 hours of trend start</Text>
              <Text style={styles.tipItem}>• Engage with first 10 users within 1 hour</Text>
              <Text style={styles.tipItem}>• Update content weekly to maintain freshness</Text>
              <Text style={styles.tipItem}>• Cross-promote on social media for initial boost</Text>
              <Text style={styles.tipItem}>• Collaborate with other popular creators</Text>
              <Text style={styles.tipItem}>• Participate in official Saylo events and challenges</Text>
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
  specCard: {
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  specLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFB74D',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  specDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  qualityItem: {
    flexDirection: 'row',
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  qualityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1A1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  qualityEmoji: {
    fontSize: 24,
  },
  qualityContent: {
    flex: 1,
  },
  qualityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  qualityText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  techCard: {
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  techHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  techTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  techItem: {
    width: '48%',
    backgroundColor: '#1A1F3A',
    padding: 10,
    borderRadius: 8,
  },
  techLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  techValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
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
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 8,
  },
});

export default CreationSpecScreen;