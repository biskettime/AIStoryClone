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

const CreatorPolicyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Creator Level Policy</Text>
        
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.emoji}>🎯</Text>
            <Text style={styles.mainTitle}>What is the Creator Level?</Text>
            <Text style={styles.emoji}>🎯</Text>
          </View>
          
          <Text style={styles.description}>
            Saylo's Creator Level is a system for outstanding creators, with corresponding rewards provided based on the requirements of each level. As the level increases, creators will enjoy more benefits.
          </Text>

          {/* Criteria Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🎯</Text>
              <Text style={styles.sectionTitle}>Saylo Creator Level Criteria</Text>
              <Text style={styles.sectionIcon}>🎯</Text>
            </View>
            
            <Text style={styles.paragraph}>
              We conduct a comprehensive evaluation based on the number of public characters created (total and in the current calendar month), the number of chatters and messages in the current calendar month.
            </Text>
            
            <Text style={styles.paragraph}>
              The number of levels may increase in the future, and the requirements for each level may also change. While upgrading is possible, downgrading may also occur. If the requirements of the original level are not met at the time of the downgrade evaluation, the creator will be demoted by one level. For specific upgrade and downgrade schedules, please see below.
            </Text>
          </View>

          {/* Detailed Indicators */}
          <View style={styles.section}>
            <Text style={styles.subTitle}>Detailed indicator description:</Text>
            
            <View style={styles.indicatorItem}>
              <Text style={styles.indicatorNumber}>1.</Text>
              <View style={styles.indicatorContent}>
                <Text style={styles.indicatorTitle}>Current calendar month:</Text>
                <Text style={styles.indicatorText}>
                  The number of days in the current month, take May as an example, we will calculate the data from 00:00:00 on May 1st to 23:59:59 on May 31st
                </Text>
              </View>
            </View>

            <View style={styles.indicatorItem}>
              <Text style={styles.indicatorNumber}>2.</Text>
              <View style={styles.indicatorContent}>
                <Text style={styles.indicatorTitle}>Number of public characters:</Text>
                <Text style={styles.indicatorText}>
                  Only count the characters that are public and have not been deleted, removed, or turned private will be counted
                </Text>
                <Text style={styles.note}>
                  Note: If characters created in last month, and you delete, remove, or set to private within the current calendar month, the number of public characters will be not included and may become negative.
                </Text>
              </View>
            </View>

            <View style={styles.indicatorItem}>
              <Text style={styles.indicatorNumber}>3.</Text>
              <View style={styles.indicatorContent}>
                <Text style={styles.indicatorTitle}>Number of chatters and messages:</Text>
                <Text style={styles.indicatorText}>
                  Only count the chat data of characters that are public and have not been deleted, removed, or turned private (not included personal number)
                </Text>
              </View>
            </View>

            <View style={styles.indicatorItem}>
              <Text style={styles.indicatorNumber}>4.</Text>
              <View style={styles.indicatorContent}>
                <Text style={styles.indicatorTitle}>Violation Policy:</Text>
                <Text style={styles.indicatorText}>
                  If there are multiple characters that violate community guidelines, the corresponding creator level may be reduced or terminated.
                </Text>
              </View>
            </View>
          </View>

          {/* Community Guidelines Section */}
          <View style={styles.section}>
            <Text style={styles.subTitle}>Community Guidelines</Text>
            
            <View style={styles.guidelineCard}>
              <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
              <Text style={styles.guidelineTitle}>Be Respectful</Text>
              <Text style={styles.guidelineText}>
                Treat all community members with respect and kindness. No harassment, hate speech, or discriminatory content.
              </Text>
            </View>

            <View style={styles.guidelineCard}>
              <Ionicons name="people" size={24} color="#42A5F5" />
              <Text style={styles.guidelineTitle}>Safe Content</Text>
              <Text style={styles.guidelineText}>
                Create content that is appropriate for all audiences. No explicit violence, adult content, or harmful material.
              </Text>
            </View>

            <View style={styles.guidelineCard}>
              <Ionicons name="checkmark-circle" size={24} color="#FFB74D" />
              <Text style={styles.guidelineTitle}>Original Creation</Text>
              <Text style={styles.guidelineText}>
                Respect intellectual property rights. Create original characters and avoid copyright infringement.
              </Text>
            </View>

            <View style={styles.guidelineCard}>
              <Ionicons name="heart" size={24} color="#E91E63" />
              <Text style={styles.guidelineTitle}>Positive Community</Text>
              <Text style={styles.guidelineText}>
                Foster a positive and supportive environment. Help new creators and share constructive feedback.
              </Text>
            </View>
          </View>

          {/* Review & Recommendation Rules */}
          <View style={styles.section}>
            <Text style={styles.subTitle}>Review & Recommendation Rules</Text>
            
            <Text style={styles.paragraph}>
              Every step from judgment to exposure follows a systematic review process to ensure quality and fairness for all creators.
            </Text>

            <View style={styles.ruleItem}>
              <View style={styles.ruleBadge}>
                <Text style={styles.ruleBadgeText}>Step 1</Text>
              </View>
              <Text style={styles.ruleText}>
                Initial content review for community guidelines compliance
              </Text>
            </View>

            <View style={styles.ruleItem}>
              <View style={styles.ruleBadge}>
                <Text style={styles.ruleBadgeText}>Step 2</Text>
              </View>
              <Text style={styles.ruleText}>
                Quality assessment based on creativity and originality
              </Text>
            </View>

            <View style={styles.ruleItem}>
              <View style={styles.ruleBadge}>
                <Text style={styles.ruleBadgeText}>Step 3</Text>
              </View>
              <Text style={styles.ruleText}>
                User engagement metrics evaluation
              </Text>
            </View>

            <View style={styles.ruleItem}>
              <View style={styles.ruleBadge}>
                <Text style={styles.ruleBadgeText}>Step 4</Text>
              </View>
              <Text style={styles.ruleText}>
                Recommendation algorithm placement and exposure
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
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
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
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sectionIcon: {
    fontSize: 20,
    marginHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  indicatorItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  indicatorNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFB74D',
    marginRight: 10,
    width: 20,
  },
  indicatorContent: {
    flex: 1,
  },
  indicatorTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  indicatorText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  note: {
    fontSize: 13,
    color: '#FFB74D',
    lineHeight: 20,
    marginTop: 8,
    fontStyle: 'italic',
  },
  guidelineCard: {
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  guidelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 8,
    marginBottom: 8,
  },
  guidelineText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  ruleBadge: {
    backgroundColor: '#FFB74D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 12,
  },
  ruleBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1F3A',
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
});

export default CreatorPolicyScreen;