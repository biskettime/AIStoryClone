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

const GenerateImagesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Generate Images ✨</Text>
        
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.emoji}>🖼️</Text>
            <Text style={styles.mainTitle}>How to Describe Your Beloved</Text>
            <Text style={styles.emoji}>🖼️</Text>
          </View>
          
          <Text style={styles.description}>
            Learn the art of crafting perfect image prompts to bring your characters to life with stunning AI-generated visuals.
          </Text>

          {/* Prompt Structure */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎨 Prompt Structure Formula</Text>
            
            <View style={styles.formulaCard}>
              <Text style={styles.formulaTitle}>The Perfect Prompt Formula</Text>
              <View style={styles.formulaBox}>
                <Text style={styles.formulaText}>
                  [Subject] + [Style] + [Details] + [Environment] + [Lighting] + [Quality]
                </Text>
              </View>
              <Text style={styles.formulaExample}>
                Example: "Beautiful anime girl, long silver hair, blue eyes, wearing elegant dress, cherry blossom garden, soft sunset lighting, highly detailed, 4K quality"
              </Text>
            </View>
          </View>

          {/* Key Elements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔑 Key Description Elements</Text>
            
            <View style={styles.elementCard}>
              <View style={styles.elementHeader}>
                <Text style={styles.elementIcon}>👤</Text>
                <Text style={styles.elementTitle}>Character Features</Text>
              </View>
              <View style={styles.elementTags}>
                <Text style={styles.tag}>Age & Gender</Text>
                <Text style={styles.tag}>Hair color & style</Text>
                <Text style={styles.tag}>Eye color & shape</Text>
                <Text style={styles.tag}>Face shape</Text>
                <Text style={styles.tag}>Body type</Text>
                <Text style={styles.tag}>Skin tone</Text>
              </View>
            </View>

            <View style={styles.elementCard}>
              <View style={styles.elementHeader}>
                <Text style={styles.elementIcon}>👗</Text>
                <Text style={styles.elementTitle}>Clothing & Accessories</Text>
              </View>
              <View style={styles.elementTags}>
                <Text style={styles.tag}>Outfit style</Text>
                <Text style={styles.tag}>Colors & patterns</Text>
                <Text style={styles.tag}>Jewelry</Text>
                <Text style={styles.tag}>Props</Text>
                <Text style={styles.tag}>Fashion era</Text>
                <Text style={styles.tag}>Cultural dress</Text>
              </View>
            </View>

            <View style={styles.elementCard}>
              <View style={styles.elementHeader}>
                <Text style={styles.elementIcon}>🎭</Text>
                <Text style={styles.elementTitle}>Expression & Pose</Text>
              </View>
              <View style={styles.elementTags}>
                <Text style={styles.tag}>Facial expression</Text>
                <Text style={styles.tag}>Body language</Text>
                <Text style={styles.tag}>Action pose</Text>
                <Text style={styles.tag}>Hand gestures</Text>
                <Text style={styles.tag}>Eye direction</Text>
                <Text style={styles.tag}>Mood</Text>
              </View>
            </View>

            <View style={styles.elementCard}>
              <View style={styles.elementHeader}>
                <Text style={styles.elementIcon}>🌍</Text>
                <Text style={styles.elementTitle}>Background & Setting</Text>
              </View>
              <View style={styles.elementTags}>
                <Text style={styles.tag}>Location</Text>
                <Text style={styles.tag}>Time period</Text>
                <Text style={styles.tag}>Weather</Text>
                <Text style={styles.tag}>Indoor/Outdoor</Text>
                <Text style={styles.tag}>Fantasy elements</Text>
                <Text style={styles.tag}>Props & objects</Text>
              </View>
            </View>
          </View>

          {/* Style Guide */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎨 Popular Art Styles</Text>
            
            <View style={styles.styleGrid}>
              <TouchableOpacity style={styles.styleCard}>
                <Text style={styles.styleEmoji}>🌸</Text>
                <Text style={styles.styleName}>Anime</Text>
                <Text style={styles.styleDesc}>Japanese animation style</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.styleCard}>
                <Text style={styles.styleEmoji}>🎭</Text>
                <Text style={styles.styleName}>Realistic</Text>
                <Text style={styles.styleDesc}>Photorealistic renders</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.styleCard}>
                <Text style={styles.styleEmoji}>🎨</Text>
                <Text style={styles.styleName}>Digital Art</Text>
                <Text style={styles.styleDesc}>Modern illustration</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.styleCard}>
                <Text style={styles.styleEmoji}>✏️</Text>
                <Text style={styles.styleName}>Sketch</Text>
                <Text style={styles.styleDesc}>Pencil & line art</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.styleCard}>
                <Text style={styles.styleEmoji}>🖌️</Text>
                <Text style={styles.styleName}>Watercolor</Text>
                <Text style={styles.styleDesc}>Soft painted style</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.styleCard}>
                <Text style={styles.styleEmoji}>🎮</Text>
                <Text style={styles.styleName}>3D Render</Text>
                <Text style={styles.styleDesc}>CGI & game style</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Advanced Tips */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>💡 Pro Generation Tips</Text>
            
            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>1</Text>
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Use Weighted Terms</Text>
                <Text style={styles.tipText}>
                  Add emphasis with (parentheses) or ((double parentheses)) for important features
                </Text>
              </View>
            </View>

            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>2</Text>
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Negative Prompts</Text>
                <Text style={styles.tipText}>
                  Specify what to avoid: "no blur, no distortion, no extra fingers"
                </Text>
              </View>
            </View>

            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>3</Text>
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Quality Boosters</Text>
                <Text style={styles.tipText}>
                  Add: "masterpiece, best quality, highly detailed, sharp focus, 8K"
                </Text>
              </View>
            </View>

            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>4</Text>
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Artist References</Text>
                <Text style={styles.tipText}>
                  Mention art styles: "in the style of Studio Ghibli" or "Pixar style"
                </Text>
              </View>
            </View>

            <View style={styles.tipItem}>
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>5</Text>
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Aspect Ratios</Text>
                <Text style={styles.tipText}>
                  Specify dimensions: "portrait 3:4" or "landscape 16:9" or "square 1:1"
                </Text>
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
  formulaCard: {
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
  },
  formulaTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  formulaBox: {
    backgroundColor: '#1A1F3A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  formulaText: {
    fontSize: 13,
    color: '#FFB74D',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  formulaExample: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
    fontStyle: 'italic',
  },
  elementCard: {
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  elementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  elementIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  elementTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  elementTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#1A1F3A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    fontSize: 12,
    color: Colors.text,
  },
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  styleCard: {
    width: '31%',
    backgroundColor: '#252C4A',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  styleEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  styleName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  styleDesc: {
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
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
  tipItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tipNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFB74D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1F3A',
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});

export default GenerateImagesScreen;