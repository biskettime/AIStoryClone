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

const ReviewRulesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Review & Recommendation Rules</Text>
        
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.emoji}>📜</Text>
            <Text style={styles.mainTitle}>Content Review Process</Text>
            <Text style={styles.emoji}>📜</Text>
          </View>
          
          <Text style={styles.description}>
            Every step from judgment to exposure follows a systematic review process to ensure quality content and fair recommendations for all creators.
          </Text>

          {/* Review Steps */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Review & Recommendation Steps</Text>
            
            <View style={styles.stepItem}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepNumber}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Initial Content Review</Text>
                <Text style={styles.stepText}>
                  All newly created content undergoes initial review for community guidelines compliance within 24 hours of submission.
                </Text>
              </View>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepNumber}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Quality Assessment</Text>
                <Text style={styles.stepText}>
                  Content is evaluated based on creativity, originality, and engagement potential using both AI and human reviewers.
                </Text>
              </View>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepNumber}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>User Engagement Metrics</Text>
                <Text style={styles.stepText}>
                  Early user interactions, including likes, messages, and retention rates, are analyzed to determine recommendation potential.
                </Text>
              </View>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepNumber}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Algorithm Placement</Text>
                <Text style={styles.stepText}>
                  Based on review scores and engagement metrics, content is placed in appropriate recommendation tiers for maximum exposure.
                </Text>
              </View>
            </View>
          </View>

          {/* Recommendation Criteria */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommendation Criteria</Text>
            
            <View style={styles.criteriaCard}>
              <Ionicons name="star" size={24} color="#FFB74D" />
              <View style={styles.criteriaContent}>
                <Text style={styles.criteriaTitle}>Quality Score</Text>
                <Text style={styles.criteriaText}>
                  Content must achieve a minimum quality score of 7/10 based on originality, creativity, and technical execution.
                </Text>
              </View>
            </View>

            <View style={styles.criteriaCard}>
              <Ionicons name="people" size={24} color="#42A5F5" />
              <View style={styles.criteriaContent}>
                <Text style={styles.criteriaTitle}>Engagement Rate</Text>
                <Text style={styles.criteriaText}>
                  Minimum 5% engagement rate within first 48 hours, including likes, messages, and profile visits.
                </Text>
              </View>
            </View>

            <View style={styles.criteriaCard}>
              <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
              <View style={styles.criteriaContent}>
                <Text style={styles.criteriaTitle}>Guideline Compliance</Text>
                <Text style={styles.criteriaText}>
                  100% compliance with community guidelines and content policies. No violations or warnings.
                </Text>
              </View>
            </View>

            <View style={styles.criteriaCard}>
              <Ionicons name="trending-up" size={24} color="#E91E63" />
              <View style={styles.criteriaContent}>
                <Text style={styles.criteriaTitle}>Consistency</Text>
                <Text style={styles.criteriaText}>
                  Regular content updates and active creator engagement. Minimum 3 updates per month.
                </Text>
              </View>
            </View>
          </View>

          {/* Exposure Tiers */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Exposure Tiers</Text>
            
            <View style={styles.tierCard}>
              <View style={[styles.tierBadge, { backgroundColor: '#FFD700' }]}>
                <Text style={styles.tierBadgeText}>Gold</Text>
              </View>
              <Text style={styles.tierTitle}>Featured Placement</Text>
              <Text style={styles.tierText}>
                Top 1% of content. Homepage features, push notifications, and premium placement in all discovery sections.
              </Text>
            </View>

            <View style={styles.tierCard}>
              <View style={[styles.tierBadge, { backgroundColor: '#C0C0C0' }]}>
                <Text style={styles.tierBadgeText}>Silver</Text>
              </View>
              <Text style={styles.tierTitle}>Recommended</Text>
              <Text style={styles.tierText}>
                Top 10% of content. Category features, search boost, and regular recommendation rotation.
              </Text>
            </View>

            <View style={styles.tierCard}>
              <View style={[styles.tierBadge, { backgroundColor: '#CD7F32' }]}>
                <Text style={styles.tierBadgeText}>Bronze</Text>
              </View>
              <Text style={styles.tierTitle}>Standard Exposure</Text>
              <Text style={styles.tierText}>
                Top 30% of content. Basic discovery features and organic search results.
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFB74D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F3A',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  criteriaCard: {
    flexDirection: 'row',
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  criteriaContent: {
    flex: 1,
    marginLeft: 12,
  },
  criteriaTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  criteriaText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  tierCard: {
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  tierBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  tierBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1F3A',
  },
  tierTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  tierText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default ReviewRulesScreen;