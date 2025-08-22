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

const CommunityGuidelinesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Community Guidelines</Text>
        
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
            <Text style={styles.mainTitle}>Follow Rules, Be Friendly</Text>
            <Text style={styles.emoji}>🎯</Text>
          </View>
          
          <Text style={styles.description}>
            Our community thrives on creativity, respect, and positive interactions. These guidelines help maintain a safe and enjoyable environment for all users.
          </Text>

          {/* Core Values */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Community Values</Text>
            
            <View style={styles.valueCard}>
              <View style={styles.valueIcon}>
                <Ionicons name="heart" size={24} color="#E91E63" />
              </View>
              <View style={styles.valueContent}>
                <Text style={styles.valueTitle}>Respect & Kindness</Text>
                <Text style={styles.valueText}>
                  Treat every member with respect. No harassment, hate speech, discrimination, or bullying. Celebrate diversity and different perspectives.
                </Text>
              </View>
            </View>

            <View style={styles.valueCard}>
              <View style={styles.valueIcon}>
                <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
              </View>
              <View style={styles.valueContent}>
                <Text style={styles.valueTitle}>Safety First</Text>
                <Text style={styles.valueText}>
                  Protect personal information. Never share private details, addresses, or financial information. Report suspicious behavior immediately.
                </Text>
              </View>
            </View>

            <View style={styles.valueCard}>
              <View style={styles.valueIcon}>
                <Ionicons name="sparkles" size={24} color="#FFB74D" />
              </View>
              <View style={styles.valueContent}>
                <Text style={styles.valueTitle}>Creativity & Originality</Text>
                <Text style={styles.valueText}>
                  Create original content. Respect intellectual property. Give credit where due. Don't copy or plagiarize others' work.
                </Text>
              </View>
            </View>

            <View style={styles.valueCard}>
              <View style={styles.valueIcon}>
                <Ionicons name="people" size={24} color="#42A5F5" />
              </View>
              <View style={styles.valueContent}>
                <Text style={styles.valueTitle}>Positive Community</Text>
                <Text style={styles.valueText}>
                  Support fellow creators. Share constructive feedback. Celebrate successes. Help newcomers feel welcome.
                </Text>
              </View>
            </View>
          </View>

          {/* Prohibited Content */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⛔ Prohibited Content</Text>
            
            <View style={styles.prohibitedItem}>
              <Text style={styles.prohibitedIcon}>🚫</Text>
              <View style={styles.prohibitedContent}>
                <Text style={styles.prohibitedTitle}>Violence & Harm</Text>
                <Text style={styles.prohibitedText}>
                  No content promoting violence, self-harm, dangerous activities, or threats
                </Text>
              </View>
            </View>

            <View style={styles.prohibitedItem}>
              <Text style={styles.prohibitedIcon}>🚫</Text>
              <View style={styles.prohibitedContent}>
                <Text style={styles.prohibitedTitle}>Adult Content</Text>
                <Text style={styles.prohibitedText}>
                  No explicit sexual content, nudity, or suggestive material involving minors
                </Text>
              </View>
            </View>

            <View style={styles.prohibitedItem}>
              <Text style={styles.prohibitedIcon}>🚫</Text>
              <View style={styles.prohibitedContent}>
                <Text style={styles.prohibitedTitle}>Illegal Activities</Text>
                <Text style={styles.prohibitedText}>
                  No content promoting illegal activities, drugs, weapons, or criminal behavior
                </Text>
              </View>
            </View>

            <View style={styles.prohibitedItem}>
              <Text style={styles.prohibitedIcon}>🚫</Text>
              <View style={styles.prohibitedContent}>
                <Text style={styles.prohibitedTitle}>Spam & Scams</Text>
                <Text style={styles.prohibitedText}>
                  No spam, misleading content, phishing attempts, or financial scams
                </Text>
              </View>
            </View>

            <View style={styles.prohibitedItem}>
              <Text style={styles.prohibitedIcon}>🚫</Text>
              <View style={styles.prohibitedContent}>
                <Text style={styles.prohibitedTitle}>Impersonation</Text>
                <Text style={styles.prohibitedText}>
                  No impersonating others, fake accounts, or identity theft
                </Text>
              </View>
            </View>
          </View>

          {/* Enforcement */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Enforcement & Consequences</Text>
            
            <View style={styles.enforcementCard}>
              <View style={styles.enforcementLevel}>
                <Text style={styles.levelBadge}>1st</Text>
                <Text style={styles.levelTitle}>Warning</Text>
              </View>
              <Text style={styles.enforcementText}>
                Educational notification about guideline violation with content removal
              </Text>
            </View>

            <View style={styles.enforcementCard}>
              <View style={styles.enforcementLevel}>
                <Text style={styles.levelBadge}>2nd</Text>
                <Text style={styles.levelTitle}>Temporary Restriction</Text>
              </View>
              <Text style={styles.enforcementText}>
                7-day limitation on posting and reduced exposure
              </Text>
            </View>

            <View style={styles.enforcementCard}>
              <View style={styles.enforcementLevel}>
                <Text style={styles.levelBadge}>3rd</Text>
                <Text style={styles.levelTitle}>Account Suspension</Text>
              </View>
              <Text style={styles.enforcementText}>
                30-day account suspension with appeal option
              </Text>
            </View>

            <View style={styles.enforcementCard}>
              <View style={styles.enforcementLevel}>
                <Text style={styles.levelBadge}>4th</Text>
                <Text style={styles.levelTitle}>Permanent Ban</Text>
              </View>
              <Text style={styles.enforcementText}>
                Account termination for severe or repeated violations
              </Text>
            </View>
          </View>

          {/* Reporting */}
          <View style={styles.reportSection}>
            <Ionicons name="flag" size={32} color="#FFB74D" />
            <Text style={styles.reportTitle}>Report Violations</Text>
            <Text style={styles.reportText}>
              Help keep our community safe. Report content or users that violate guidelines.
              All reports are reviewed within 24 hours.
            </Text>
            <TouchableOpacity style={styles.reportButton}>
              <Text style={styles.reportButtonText}>Learn How to Report</Text>
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
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
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
  valueCard: {
    flexDirection: 'row',
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  valueIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1F3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  valueContent: {
    flex: 1,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  valueText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  prohibitedItem: {
    flexDirection: 'row',
    backgroundColor: '#2A1F1F',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B6B',
  },
  prohibitedIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  prohibitedContent: {
    flex: 1,
  },
  prohibitedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 4,
  },
  prohibitedText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  enforcementCard: {
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  enforcementLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelBadge: {
    backgroundColor: '#FFB74D',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1F3A',
    marginRight: 8,
  },
  levelTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  enforcementText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  reportSection: {
    backgroundColor: '#252C4A',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  reportText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  reportButton: {
    backgroundColor: '#FFB74D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  reportButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1F3A',
  },
});

export default CommunityGuidelinesScreen;