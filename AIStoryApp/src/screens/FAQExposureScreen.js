import React, { useState } from 'react';
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

const FAQExposureScreen = ({ navigation }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqItems = [
    {
      id: 1,
      question: "How does the exposure algorithm work?",
      answer: "Our exposure algorithm uses a combination of content quality scores, user engagement metrics, and creator consistency to determine recommendation placement. The algorithm updates every 6 hours to ensure fresh content discovery."
    },
    {
      id: 2,
      question: "Why isn't my content getting recommended?",
      answer: "Content may not be recommended due to: Low quality scores (below 7/10), insufficient engagement (less than 5% in 48 hours), guideline violations, or inconsistent posting. Check your Creator Center analytics for specific improvement areas."
    },
    {
      id: 3,
      question: "How can I improve my exposure rate?",
      answer: "To improve exposure: Post consistently (3+ times per month), engage with your audience regularly, create original and creative content, use trending tags appropriately, and maintain high quality standards. The algorithm favors active, engaged creators."
    },
    {
      id: 4,
      question: "What are peak exposure times?",
      answer: "Peak exposure times are: Weekdays 7-9 PM (highest engagement), Weekends 2-5 PM (family time), Late night 10 PM-12 AM (young adults). Post during these times for maximum initial exposure."
    },
    {
      id: 5,
      question: "How do featured placements work?",
      answer: "Featured placements are reserved for top 1% content. Selection criteria: Quality score 9+/10, engagement rate 15%+, zero guideline violations, consistent high performance. Featured content receives 10x normal exposure."
    },
    {
      id: 6,
      question: "Can I boost my content manually?",
      answer: "Manual boosting options: Diamond promotion (100 diamonds/day), VIP member benefits (+50% exposure), Activity participation (event bonuses), Cross-promotion through social sharing. Organic growth always performs better long-term."
    },
    {
      id: 7,
      question: "How long does review take?",
      answer: "Review timelines: Initial review: 1-24 hours, Quality assessment: 24-48 hours, Recommendation decision: 48-72 hours, Appeal process: 3-5 business days. VIP members receive priority review (50% faster)."
    },
    {
      id: 8,
      question: "What causes shadow banning?",
      answer: "Shadow banning triggers: Multiple guideline violations, spam behavior, fake engagement, copyright infringement, user reports. Recovery: 30-day clean record required. Appeal available after 14 days."
    }
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
        
        <Text style={styles.headerTitle}>FAQ on Recommendation & Exposure</Text>
        
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.emoji}>📖</Text>
            <Text style={styles.mainTitle}>Crack the Exposure Code</Text>
            <Text style={styles.emoji}>📖</Text>
          </View>
          
          <Text style={styles.description}>
            Everything you need to know about getting your content discovered and recommended to millions of users.
          </Text>

          {/* Quick Tips */}
          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>🎯 Quick Tips for Success</Text>
            <View style={styles.tipsGrid}>
              <View style={styles.tipCard}>
                <Text style={styles.tipEmoji}>⏰</Text>
                <Text style={styles.tipText}>Post at peak times</Text>
              </View>
              <View style={styles.tipCard}>
                <Text style={styles.tipEmoji}>🎨</Text>
                <Text style={styles.tipText}>Original content</Text>
              </View>
              <View style={styles.tipCard}>
                <Text style={styles.tipEmoji}>💬</Text>
                <Text style={styles.tipText}>Engage quickly</Text>
              </View>
              <View style={styles.tipCard}>
                <Text style={styles.tipEmoji}>📈</Text>
                <Text style={styles.tipText}>Stay consistent</Text>
              </View>
            </View>
          </View>

          {/* FAQ Items */}
          <View style={styles.faqSection}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            
            {faqItems.map((item) => (
              <TouchableOpacity 
                key={item.id}
                style={styles.faqItem}
                onPress={() => toggleExpand(item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.questionRow}>
                  <Text style={styles.questionNumber}>Q{item.id}</Text>
                  <Text style={styles.question}>{item.question}</Text>
                  <Ionicons 
                    name={expandedItems[item.id] ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color={Colors.textSecondary} 
                  />
                </View>
                {expandedItems[item.id] && (
                  <View style={styles.answerContainer}>
                    <Text style={styles.answer}>{item.answer}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Contact Support */}
          <View style={styles.supportSection}>
            <Text style={styles.supportTitle}>Still have questions?</Text>
            <Text style={styles.supportText}>
              Contact our Creator Support team for personalized assistance
            </Text>
            <TouchableOpacity style={styles.supportButton}>
              <Text style={styles.supportButtonText}>Contact Support</Text>
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
    marginBottom: 24,
    textAlign: 'center',
  },
  tipsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  tipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tipCard: {
    width: '48%',
    backgroundColor: '#252C4A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  tipEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
  },
  faqSection: {
    marginBottom: 30,
  },
  faqItem: {
    backgroundColor: '#252C4A',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFB74D',
    marginRight: 12,
    width: 30,
  },
  question: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 8,
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 0,
  },
  answer: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    paddingLeft: 42,
  },
  supportSection: {
    backgroundColor: '#252C4A',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  supportButton: {
    backgroundColor: '#FFB74D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  supportButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1F3A',
  },
});

export default FAQExposureScreen;