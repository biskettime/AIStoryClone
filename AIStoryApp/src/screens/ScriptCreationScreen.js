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

const ScriptCreationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Script Creation ✨</Text>
        
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.emoji}>✍️</Text>
            <Text style={styles.mainTitle}>Elements for Quickly Creating a Saylo</Text>
            <Text style={styles.emoji}>✍️</Text>
          </View>
          
          <Text style={styles.description}>
            Master the art of script creation to bring your characters to life with engaging dialogues and compelling storylines.
          </Text>

          {/* Core Elements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎭 Core Script Elements</Text>
            
            <View style={styles.elementCard}>
              <View style={styles.elementNumber}>
                <Text style={styles.numberText}>1</Text>
              </View>
              <View style={styles.elementContent}>
                <Text style={styles.elementTitle}>Opening Hook</Text>
                <Text style={styles.elementText}>
                  Start with an intriguing greeting or question that immediately establishes your character's personality and draws users in.
                </Text>
                <View style={styles.exampleBox}>
                  <Text style={styles.exampleLabel}>Example:</Text>
                  <Text style={styles.exampleText}>
                    "Oh! A new face! I've been waiting centuries for someone interesting to talk to. Tell me, do you believe in magic?"
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.elementCard}>
              <View style={styles.elementNumber}>
                <Text style={styles.numberText}>2</Text>
              </View>
              <View style={styles.elementContent}>
                <Text style={styles.elementTitle}>Character Voice</Text>
                <Text style={styles.elementText}>
                  Develop a unique speaking style with consistent vocabulary, speech patterns, and emotional expressions.
                </Text>
                <View style={styles.exampleBox}>
                  <Text style={styles.exampleLabel}>Tips:</Text>
                  <Text style={styles.exampleText}>
                    • Use specific catchphrases{'\n'}
                    • Add verbal tics or habits{'\n'}
                    • Maintain consistent tone{'\n'}
                    • Include emotional reactions
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.elementCard}>
              <View style={styles.elementNumber}>
                <Text style={styles.numberText}>3</Text>
              </View>
              <View style={styles.elementContent}>
                <Text style={styles.elementTitle}>Story Arc</Text>
                <Text style={styles.elementText}>
                  Create a narrative progression that evolves through conversation, revealing backstory and building relationships.
                </Text>
                <View style={styles.exampleBox}>
                  <Text style={styles.exampleLabel}>Structure:</Text>
                  <Text style={styles.exampleText}>
                    Beginning → Introduction & Mystery{'\n'}
                    Middle → Revelation & Bonding{'\n'}
                    Climax → Conflict or Choice{'\n'}
                    Resolution → New Understanding
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.elementCard}>
              <View style={styles.elementNumber}>
                <Text style={styles.numberText}>4</Text>
              </View>
              <View style={styles.elementContent}>
                <Text style={styles.elementTitle}>Interactive Responses</Text>
                <Text style={styles.elementText}>
                  Design multiple response branches that adapt to user choices, creating personalized experiences.
                </Text>
                <View style={styles.exampleBox}>
                  <Text style={styles.exampleLabel}>Response Types:</Text>
                  <Text style={styles.exampleText}>
                    • Emotional reactions{'\n'}
                    • Follow-up questions{'\n'}
                    • Story revelations{'\n'}
                    • Playful interactions
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Quick Templates */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Quick Script Templates</Text>
            
            <TouchableOpacity style={styles.templateCard}>
              <View style={styles.templateHeader}>
                <Text style={styles.templateIcon}>🦸</Text>
                <Text style={styles.templateTitle}>Hero's Journey</Text>
              </View>
              <Text style={styles.templateText}>
                Classic adventure template with call to action, challenges, and triumph
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.templateCard}>
              <View style={styles.templateHeader}>
                <Text style={styles.templateIcon}>💕</Text>
                <Text style={styles.templateTitle}>Romance Story</Text>
              </View>
              <Text style={styles.templateText}>
                Emotional connection building with flirtation, tension, and resolution
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.templateCard}>
              <View style={styles.templateHeader}>
                <Text style={styles.templateIcon}>🔍</Text>
                <Text style={styles.templateTitle}>Mystery Solver</Text>
              </View>
              <Text style={styles.templateText}>
                Investigation narrative with clues, deduction, and surprising reveals
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.templateCard}>
              <View style={styles.templateHeader}>
                <Text style={styles.templateIcon}>😂</Text>
                <Text style={styles.templateTitle}>Comedy Relief</Text>
              </View>
              <Text style={styles.templateText}>
                Humor-focused script with jokes, witty banter, and funny situations
              </Text>
            </TouchableOpacity>
          </View>

          {/* Writing Tips */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>💡 Pro Writing Tips</Text>
            
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>
                Keep initial messages under 100 words for better engagement
              </Text>
            </View>

            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>
                Use emojis sparingly to enhance emotion without overwhelming
              </Text>
            </View>

            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>
                Create 5-10 conversation branches for varied experiences
              </Text>
            </View>

            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>
                Test your script with beta users before publishing
              </Text>
            </View>

            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>
                Update scripts based on user interaction patterns
              </Text>
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
  elementCard: {
    flexDirection: 'row',
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  elementNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFB74D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  numberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F3A',
  },
  elementContent: {
    flex: 1,
  },
  elementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  elementText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  exampleBox: {
    backgroundColor: '#1A1F3A',
    padding: 12,
    borderRadius: 8,
  },
  exampleLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFB74D',
    marginBottom: 6,
  },
  exampleText: {
    fontSize: 13,
    color: Colors.text,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  templateCard: {
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  templateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  templateIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  templateText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginLeft: 10,
    flex: 1,
  },
});

export default ScriptCreationScreen;