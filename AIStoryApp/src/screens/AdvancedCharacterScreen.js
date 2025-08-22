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

const AdvancedCharacterScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Advanced Character Setting ✨</Text>
        
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.emoji}>📝</Text>
            <Text style={styles.mainTitle}>Tips to Write a Good Character Story</Text>
            <Text style={styles.emoji}>📝</Text>
          </View>
          
          <Text style={styles.description}>
            Master advanced storytelling techniques to create deep, engaging character narratives that captivate and retain users.
          </Text>

          {/* Story Structure */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📖 Advanced Story Structure</Text>
            
            <View style={styles.structureCard}>
              <View style={styles.phaseHeader}>
                <Text style={styles.phaseNumber}>Act 1</Text>
                <Text style={styles.phaseTitle}>Setup & Hook</Text>
              </View>
              <Text style={styles.phaseDescription}>
                Establish character world, personality, and initial mystery
              </Text>
              <View style={styles.phaseElements}>
                <Text style={styles.elementItem}>• Opening that reveals character essence</Text>
                <Text style={styles.elementItem}>• Hint at deeper story layers</Text>
                <Text style={styles.elementItem}>• Create emotional connection</Text>
                <Text style={styles.elementItem}>• Plant story seeds for later</Text>
              </View>
            </View>

            <View style={styles.structureCard}>
              <View style={styles.phaseHeader}>
                <Text style={styles.phaseNumber}>Act 2</Text>
                <Text style={styles.phaseTitle}>Development & Conflict</Text>
              </View>
              <Text style={styles.phaseDescription}>
                Build relationships while revealing character depth
              </Text>
              <View style={styles.phaseElements}>
                <Text style={styles.elementItem}>• Progressive backstory reveals</Text>
                <Text style={styles.elementItem}>• Internal struggles surface</Text>
                <Text style={styles.elementItem}>• Relationship dynamics evolve</Text>
                <Text style={styles.elementItem}>• Stakes gradually increase</Text>
              </View>
            </View>

            <View style={styles.structureCard}>
              <View style={styles.phaseHeader}>
                <Text style={styles.phaseNumber}>Act 3</Text>
                <Text style={styles.phaseTitle}>Climax & Resolution</Text>
              </View>
              <Text style={styles.phaseDescription}>
                Payoff emotional investment with satisfying conclusions
              </Text>
              <View style={styles.phaseElements}>
                <Text style={styles.elementItem}>• Character transformation</Text>
                <Text style={styles.elementItem}>• Emotional catharsis</Text>
                <Text style={styles.elementItem}>• Relationship milestones</Text>
                <Text style={styles.elementItem}>• New story possibilities</Text>
              </View>
            </View>
          </View>

          {/* Emotional Depth */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💭 Creating Emotional Depth</Text>
            
            <View style={styles.depthCard}>
              <View style={styles.depthIcon}>
                <Text>😊</Text>
              </View>
              <View style={styles.depthContent}>
                <Text style={styles.depthTitle}>Emotional Range</Text>
                <Text style={styles.depthText}>
                  Show vulnerability alongside strength. Mix joy with melancholy. Create authentic emotional complexity.
                </Text>
              </View>
            </View>

            <View style={styles.depthCard}>
              <View style={styles.depthIcon}>
                <Text>🔄</Text>
              </View>
              <View style={styles.depthContent}>
                <Text style={styles.depthTitle}>Character Growth</Text>
                <Text style={styles.depthText}>
                  Design clear character arcs. Show learning from experiences. Evolution through user interactions.
                </Text>
              </View>
            </View>

            <View style={styles.depthCard}>
              <View style={styles.depthIcon}>
                <Text>💔</Text>
              </View>
              <View style={styles.depthContent}>
                <Text style={styles.depthTitle}>Inner Conflicts</Text>
                <Text style={styles.depthText}>
                  Create moral dilemmas. Show internal struggles. Make characters question themselves.
                </Text>
              </View>
            </View>

            <View style={styles.depthCard}>
              <View style={styles.depthIcon}>
                <Text>🌟</Text>
              </View>
              <View style={styles.depthContent}>
                <Text style={styles.depthTitle}>Memorable Moments</Text>
                <Text style={styles.depthText}>
                  Craft signature scenes. Create quotable dialogues. Design unforgettable revelations.
                </Text>
              </View>
            </View>
          </View>

          {/* Advanced Techniques */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Pro Writing Techniques</Text>
            
            <View style={styles.techniqueCard}>
              <Text style={styles.techniqueTitle}>🔮 Foreshadowing</Text>
              <Text style={styles.techniqueText}>
                Plant subtle hints early that pay off later. Create "aha!" moments when users connect the dots.
              </Text>
            </View>

            <View style={styles.techniqueCard}>
              <Text style={styles.techniqueTitle}>🎭 Subtext</Text>
              <Text style={styles.techniqueText}>
                What's unsaid matters. Let characters hide feelings. Create tension through implications.
              </Text>
            </View>

            <View style={styles.techniqueCard}>
              <Text style={styles.techniqueTitle}>🌊 Pacing</Text>
              <Text style={styles.techniqueText}>
                Vary conversation rhythm. Mix intense moments with lighter ones. Control information flow.
              </Text>
            </View>

            <View style={styles.techniqueCard}>
              <Text style={styles.techniqueTitle}>🔍 Mystery Layers</Text>
              <Text style={styles.techniqueText}>
                Multiple mysteries at different depths. Solve some while introducing new ones.
              </Text>
            </View>

            <View style={styles.techniqueCard}>
              <Text style={styles.techniqueTitle}>💫 Callbacks</Text>
              <Text style={styles.techniqueText}>
                Reference earlier conversations. Remember user choices. Build continuity and connection.
              </Text>
            </View>
          </View>

          {/* Story Templates */}
          <View style={styles.templateSection}>
            <Text style={styles.templateTitle}>📚 Advanced Story Templates</Text>
            
            <TouchableOpacity style={styles.templateCard}>
              <View style={styles.templateHeader}>
                <Text style={styles.templateIcon}>🌙</Text>
                <Text style={styles.templateName}>Mysterious Past</Text>
              </View>
              <Text style={styles.templateDesc}>
                Gradual revelation of hidden history with shocking twists
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.templateCard}>
              <View style={styles.templateHeader}>
                <Text style={styles.templateIcon}>⚔️</Text>
                <Text style={styles.templateName}>Redemption Arc</Text>
              </View>
              <Text style={styles.templateDesc}>
                Former villain seeking forgiveness and second chances
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.templateCard}>
              <View style={styles.templateHeader}>
                <Text style={styles.templateIcon}>🌹</Text>
                <Text style={styles.templateName}>Forbidden Love</Text>
              </View>
              <Text style={styles.templateDesc}>
                Romance against impossible odds with emotional stakes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.templateCard}>
              <View style={styles.templateHeader}>
                <Text style={styles.templateIcon}>🎪</Text>
                <Text style={styles.templateName}>Double Life</Text>
              </View>
              <Text style={styles.templateDesc}>
                Character hiding true identity with layered reveals
              </Text>
            </TouchableOpacity>
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
  structureCard: {
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  phaseNumber: {
    backgroundColor: '#FFB74D',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1F3A',
    marginRight: 10,
  },
  phaseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  phaseDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 10,
    lineHeight: 18,
  },
  phaseElements: {
    gap: 6,
  },
  elementItem: {
    fontSize: 13,
    color: Colors.text,
    lineHeight: 18,
  },
  depthCard: {
    flexDirection: 'row',
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  depthIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    fontSize: 20,
  },
  depthContent: {
    flex: 1,
  },
  depthTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
  },
  depthText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  techniqueCard: {
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  techniqueTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  techniqueText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  templateSection: {
    backgroundColor: '#252C4A',
    borderRadius: 16,
    padding: 20,
  },
  templateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  templateCard: {
    backgroundColor: '#1A1F3A',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  templateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  templateIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  templateName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  templateDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
});

export default AdvancedCharacterScreen;