import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
  StatusBar,
  Vibration,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../styles/colors';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const HelpModalFullScreen = ({ visible, onClose, defaultTab = 'VIP' }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Animation values for full-screen modal
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;

  // FAQ data for VIP
  const vipFAQs = [
    {
      id: 1,
      question: "What benefits do I get with VIP subscription?",
      answer: "VIP members receive the following benefits:\n\n• 40 diamonds daily\n• 10% bonus on diamond recharge\n• Unlimited group chat\n• Unlimited advanced AI models\n• 5 memory slots per character\n• 30 new character creations per week\n• 400 image generations daily\n• 6 character edit times\n• Early access to new features"
    },
    {
      id: 2,
      question: "Can I cancel VIP subscription anytime?",
      answer: "Yes, VIP subscription can be cancelled anytime.\n\n• Manage subscription in App Store/Google Play account settings\n• Benefits continue until subscription period ends\n• Auto-renewal can be stopped\n• Refund policy follows each store's policy"
    },
    {
      id: 3,
      question: "How are diamonds used?",
      answer: "Diamonds are the app's core currency:\n\n• Consumed per AI chat conversation\n• Used for image generation\n• Required for premium AI models\n• Unlock special features\n• VIP members get 40 free daily"
    },
    {
      id: 4,
      question: "What are memory slots?",
      answer: "Memory slots enable AI to remember conversations:\n\n• Regular members: 1 slot per character\n• VIP members: 5 slots per character\n• Enables longer, coherent conversations\n• Remembers character personality and previous chats\n• More immersive chat experience"
    },
    {
      id: 5,
      question: "What's the difference with advanced AI models?",
      answer: "Advanced AI models provide better chat experience:\n\n• More natural and human-like conversations\n• Better understanding of complex situations\n• More creative and diverse responses\n• Richer emotional expressions\n• VIP members get unlimited access"
    }
  ];

  // FAQ data for Ads-free
  const adsFreeFAQs = [
    {
      id: 1,
      question: "What changes after removing ads?",
      answer: "After removing ads, you'll experience:\n\n• All banner and interstitial ads removed\n• No ad interruptions during chats\n• Faster app loading speed\n• Clean and focused interface\n• Reduced data usage\n• Extended battery life"
    },
    {
      id: 2,
      question: "Is ad removal permanent?",
      answer: "Ad removal is valid during subscription period:\n\n• Monthly subscription: 30 days ad-free\n• Yearly subscription: 365 days ad-free\n• Benefits extend upon renewal\n• Ads return after cancellation\n• Can resubscribe anytime"
    },
    {
      id: 3,
      question: "Does ad removal work on other devices?",
      answer: "Yes, works on all devices with same account:\n\n• Applies to smartphones and tablets\n• Account sync required\n• Supports up to 5 devices\n• Benefits persist when changing devices\n• Easy transfer with account restore"
    },
    {
      id: 4,
      question: "What's the difference between VIP and Ads-free?",
      answer: "Main differences between subscriptions:\n\n【Ads-free】\n• Only removes ads\n• More affordable price\n• Basic features remain\n\n【VIP】\n• Includes ad removal\n• Diamond benefits\n• All premium features\n• Richer experience"
    },
    {
      id: 5,
      question: "Can I get a refund after removing ads?",
      answer: "Refund policy follows app store policies:\n\n• Google Play: Within 2 hours of purchase\n• App Store: Can request within 90 days\n• Refund depends on service usage\n• Contact support for assistance\n• Valid reasons considered for refund"
    }
  ];

  // Handle modal open animation
  useEffect(() => {
    console.log('HelpModalFullScreen visible:', visible);
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: screenWidth,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleTabSwitch = (tab) => {
    if (tab !== selectedTab) {
      Vibration.vibrate(10);
      setSelectedTab(tab);
      setExpandedFAQ(null);
    }
  };

  const toggleFAQ = (id) => {
    Vibration.vibrate(10);
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const currentFAQs = selectedTab === 'VIP' ? vipFAQs : adsFreeFAQs;
  const filteredFAQs = searchQuery 
    ? currentFAQs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentFAQs;

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <Animated.View 
          style={[
            styles.backdrop,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <TouchableOpacity 
            style={StyleSheet.absoluteFillObject}
            onPress={onClose}
            activeOpacity={1}
          />
        </Animated.View>

        <Animated.View 
          style={[
            styles.content,
            {
              transform: [{ translateX: slideAnim }],
            }
          ]}
        >
          <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <LinearGradient
              colors={selectedTab === 'VIP' 
                ? ['#2A1F3D', '#3D2F5B'] 
                : ['#1A237E', '#283593']
              }
              style={styles.header}
            >
              <View style={styles.headerContent}>
                <TouchableOpacity 
                  onPress={onClose}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={28} color={Colors.text} />
                </TouchableOpacity>
                
                <Text style={styles.title}>Help & Support</Text>
                
                <View style={styles.placeholder} />
              </View>

              {/* Tab Switcher */}
              <View style={styles.tabs}>
                <TouchableOpacity
                  onPress={() => handleTabSwitch('VIP')}
                  style={[
                    styles.tab,
                    selectedTab === 'VIP' && styles.tabActive
                  ]}
                >
                  <Text style={[
                    styles.tabText,
                    selectedTab === 'VIP' && styles.tabTextActive
                  ]}>
                    VIP
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => handleTabSwitch('Ads-free')}
                  style={[
                    styles.tab,
                    selectedTab === 'Ads-free' && styles.tabActive
                  ]}
                >
                  <Text style={[
                    styles.tabText,
                    selectedTab === 'Ads-free' && styles.tabTextActive
                  ]}>
                    Ads-free
                  </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={Colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search FAQ..."
                placeholderTextColor={Colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color={Colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>

            {/* FAQ List */}
            <ScrollView 
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
              
              {filteredFAQs.map((faq) => (
                <TouchableOpacity
                  key={faq.id}
                  onPress={() => toggleFAQ(faq.id)}
                  style={styles.faqItem}
                  activeOpacity={0.7}
                >
                  <View style={styles.faqHeader}>
                    <Text style={styles.faqQuestion}>{faq.question}</Text>
                    <Ionicons 
                      name={expandedFAQ === faq.id ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color={Colors.textSecondary}
                    />
                  </View>
                  
                  {expandedFAQ === faq.id && (
                    <Animated.View style={styles.faqAnswer}>
                      <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                    </Animated.View>
                  )}
                </TouchableOpacity>
              ))}

              {/* Contact Support */}
              <View style={styles.contactSection}>
                <Text style={styles.sectionTitle}>Still Need Help?</Text>
                <Text style={styles.contactText}>
                  Our support team is here to help you 24/7
                </Text>
                <TouchableOpacity style={styles.contactButton}>
                  <LinearGradient
                    colors={['#42A5F5', '#2196F3']}
                    style={styles.contactButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Ionicons name="mail" size={20} color="#FFF" />
                    <Text style={styles.contactButtonText}>Contact Support</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <View style={{ height: 50 }} />
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  placeholder: {
    width: 40,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
    marginTop: 8,
  },
  faqItem: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceLight,
  },
  faqAnswerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: 12,
  },
  contactSection: {
    marginTop: 32,
    alignItems: 'center',
    paddingBottom: 20,
  },
  contactText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  contactButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  contactButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 8,
  },
});

export default HelpModalFullScreen;