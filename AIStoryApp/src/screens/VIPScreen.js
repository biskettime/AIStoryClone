import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Vibration,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import VIPProfileModal from './VIPProfileModal';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const VIPScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Ads-free');
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  
  // User data (would come from auth/context in real app)
  const userData = {
    username: 'User4ffe',
    isVIPActive: false,
    avatar: null,
  };
  
  // Animation values
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const tabSlideAnim = useRef(new Animated.Value(0)).current;
  
  // VIP pricing plans
  const vipPlans = [
    { id: 'weekly', label: 'Weekly', price: '₩1,500', duration: '7 days', popular: false },
    { id: 'monthly', label: 'Monthly', price: '₩4,400', duration: '30 days', popular: true, save: '15%' },
    { id: 'yearly', label: 'Yearly', price: '₩26,400', duration: '365 days', popular: false, save: '50%' },
  ];

  // Ads-free pricing plans
  const adsFreePlans = [
    { id: 'monthly', label: 'Monthly', price: '₩2,900', duration: '30 days', popular: true },
    { id: 'yearly', label: 'Yearly', price: '₩19,900', duration: '365 days', popular: false, save: '43%' },
  ];

  // Benefit comparison data
  const benefitComparison = [
    { 
      category: 'Ads-free',
      icon: '💬',
      items: [
        { title: 'Saylor always online', adsFree: true, vip: true },
        { title: 'Remove ads', adsFree: true, vip: true },
      ]
    },
    {
      category: 'Perks',
      icon: '💎',
      items: [
        { title: 'Get 40 diamonds / day', adsFree: false, vip: true },
        { title: '+10% diamonds recharge', adsFree: false, vip: true },
      ]
    },
    {
      category: 'Privileges',
      icon: '⚜️',
      items: [
        { title: 'Unlimited group chat', adsFree: false, vip: true },
        { title: 'Unlimited advanced models', adsFree: false, vip: true },
        { title: 'Memory slots per role 1→5', adsFree: false, vip: true },
        { title: 'Limitless inspiration', adsFree: false, vip: true },
        { title: 'New role creates 10→30 / week', adsFree: false, vip: true },
        { title: 'Image gens 200→400 / day', adsFree: false, vip: true },
        { title: 'Role edit times 3→6', adsFree: false, vip: true },
        { title: 'Early access to new features', adsFree: false, vip: true },
      ]
    }
  ];

  // Initialize animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleTabSwitch = (tab) => {
    if (tab === selectedTab) return;
    
    Vibration.vibrate(10);
    setSelectedTab(tab);
    
    Animated.spring(tabSlideAnim, {
      toValue: tab === 'VIP' ? 1 : 0,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleActivate = () => {
    Vibration.vibrate(20);
    // Handle subscription activation
    console.log(`Activating ${selectedTab} subscription`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.innerContainer,
          {
            opacity: fadeInAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          
          <View style={styles.tabs}>
            <TouchableOpacity
              onPress={() => handleTabSwitch('Ads-free')}
              style={styles.tab}
            >
              <Text style={[
                styles.tabText,
                selectedTab === 'Ads-free' && styles.tabTextActive
              ]}>
                Ads-free
              </Text>
              {selectedTab === 'Ads-free' && (
                <View style={styles.tabIndicator} />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => handleTabSwitch('VIP')}
              style={styles.tab}
            >
              <Text style={[
                styles.tabText,
                selectedTab === 'VIP' && styles.tabTextActive
              ]}>
                VIP
              </Text>
              {selectedTab === 'VIP' && (
                <View style={styles.tabIndicator} />
              )}
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            onPress={() => {
              console.log('Profile button pressed');
              setProfileModalVisible(true);
            }}
            style={styles.helpButton}
          >
            <Ionicons name="person-circle-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* User Profile Section */}
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                {userData.avatar ? (
                  <Image source={{ uri: userData.avatar }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Ionicons name="star-outline" size={24} color="#8B92A9" />
                    <Ionicons name="star-outline" size={24} color="#8B92A9" />
                  </View>
                )}
              </View>
              <View style={styles.userTextContainer}>
                <Text style={styles.username}>{userData.username}</Text>
                <Text style={styles.userStatus}>Not activated</Text>
              </View>
            </View>
            
            {/* Crown Icon */}
            <LinearGradient
              colors={selectedTab === 'VIP' 
                ? ['#FFB74D', '#FF9800'] 
                : ['#42A5F5', '#2196F3']
              }
              style={styles.crownContainer}
            >
              <Text style={styles.crownIcon}>👑</Text>
            </LinearGradient>
          </View>

          {/* Pricing Options - Show only for VIP tab */}
          {selectedTab === 'VIP' && (
            <View style={styles.pricingSection}>
              <Text style={styles.pricingTitle}>Choose your plan</Text>
              <View style={styles.pricingCards}>
                {vipPlans.map((plan) => (
                  <TouchableOpacity
                    key={plan.id}
                    style={[
                      styles.pricingCard,
                      selectedPlan === plan.id && styles.pricingCardActive,
                      plan.popular && styles.pricingCardPopular,
                    ]}
                    onPress={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>MOST POPULAR</Text>
                      </View>
                    )}
                    {plan.save && (
                      <View style={styles.saveBadge}>
                        <Text style={styles.saveText}>Save {plan.save}</Text>
                      </View>
                    )}
                    <Text style={styles.planLabel}>{plan.label}</Text>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                    <Text style={styles.planDuration}>{plan.duration}</Text>
                    <View style={[
                      styles.radioButton,
                      selectedPlan === plan.id && styles.radioButtonActive
                    ]}>
                      {selectedPlan === plan.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Pricing Options - Show only for Ads-free tab */}
          {selectedTab === 'Ads-free' && (
            <View style={styles.pricingSection}>
              <Text style={styles.pricingTitle}>Choose your plan</Text>
              <View style={styles.pricingCards}>
                {adsFreePlans.map((plan) => (
                  <TouchableOpacity
                    key={plan.id}
                    style={[
                      styles.pricingCard,
                      selectedPlan === plan.id && styles.pricingCardActive,
                      plan.popular && styles.pricingCardPopular,
                    ]}
                    onPress={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>RECOMMENDED</Text>
                      </View>
                    )}
                    {plan.save && (
                      <View style={styles.saveBadge}>
                        <Text style={styles.saveText}>Save {plan.save}</Text>
                      </View>
                    )}
                    <Text style={styles.planLabel}>{plan.label}</Text>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                    <Text style={styles.planDuration}>{plan.duration}</Text>
                    <View style={[
                      styles.radioButton,
                      selectedPlan === plan.id && styles.radioButtonActive
                    ]}>
                      {selectedPlan === plan.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Benefit Comparison Table */}
          <View style={styles.benefitTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Benefit details</Text>
              <Text style={styles.tableHeaderColumn}>Ads-free</Text>
              <Text style={styles.tableHeaderColumn}>VIP</Text>
            </View>
            
            {benefitComparison.map((section, sectionIndex) => (
              <View key={sectionIndex}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionIcon}>{section.icon}</Text>
                  <Text style={styles.sectionTitle}>{section.category}</Text>
                </View>
                
                {section.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.benefitRow}>
                    <Text style={styles.benefitText}>{item.title}</Text>
                    <View style={styles.benefitCheck}>
                      {item.adsFree ? (
                        <Ionicons name="checkmark-circle" size={20} color="#42A5F5" />
                      ) : (
                        <Text style={styles.dashText}>-</Text>
                      )}
                    </View>
                    <View style={styles.benefitCheck}>
                      {item.vip ? (
                        <Ionicons name="checkmark-circle" size={20} color="#FFB74D" />
                      ) : (
                        <Text style={styles.dashText}>-</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Activate Button */}
        <View style={styles.bottomSection}>
          <TouchableOpacity 
            onPress={handleActivate}
            activeOpacity={0.8}
            style={styles.activateButton}
          >
            <LinearGradient
              colors={selectedTab === 'VIP' 
                ? ['#FFB74D', '#FF9800'] 
                : ['#6B8FFF', '#4A6FE8']
              }
              style={styles.activateGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.activateText}>
                {selectedTab === 'VIP' 
                  ? `Activate ${vipPlans.find(p => p.id === selectedPlan)?.price || '₩4,400'}/month`
                  : `Activate ${adsFreePlans.find(p => p.id === selectedPlan)?.price || '₩2,900'}/month`
                }
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          
          {/* Footer Links */}
          <View style={styles.footer}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Terms of Service</Text>
            </TouchableOpacity>
            <Text style={styles.footerSeparator}> | </Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Privacy policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.restoreButton}>
              <Text style={styles.restoreText}>Restore</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      {/* VIP Profile Modal */}
      <VIPProfileModal
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
        userData={userData}
        selectedTab={selectedTab}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1F3A',
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    gap: 40,
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B92A9',
  },
  tabTextActive: {
    color: Colors.text,
  },
  tabIndicator: {
    height: 3,
    width: '100%',
    backgroundColor: Colors.text,
    borderRadius: 2,
    marginTop: 8,
  },
  helpButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2A3654',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarPlaceholder: {
    flexDirection: 'row',
    gap: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userTextContainer: {
    justifyContent: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 14,
    color: '#8B92A9',
  },
  crownContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  crownIcon: {
    fontSize: 40,
  },
  benefitTable: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2A3654',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  tableHeaderColumn: {
    width: 80,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1F2847',
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#252C4A',
    borderBottomWidth: 1,
    borderBottomColor: '#1F2847',
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  benefitCheck: {
    width: 80,
    alignItems: 'center',
  },
  dashText: {
    fontSize: 20,
    color: '#4A5468',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1A1F3A',
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 20,
  },
  activateButton: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 20,
  },
  activateGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  activateText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLink: {
    fontSize: 14,
    color: Colors.text,
    textDecorationLine: 'underline',
  },
  footerSeparator: {
    fontSize: 14,
    color: Colors.text,
    marginHorizontal: 8,
  },
  restoreButton: {
    position: 'absolute',
    right: 0,
  },
  restoreText: {
    fontSize: 14,
    color: '#8B92A9',
  },
  pricingSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  pricingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  pricingCards: {
    flexDirection: 'row',
    gap: 12,
  },
  pricingCard: {
    flex: 1,
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  pricingCardActive: {
    borderColor: '#42A5F5',
    backgroundColor: '#2A3654',
  },
  pricingCardPopular: {
    borderColor: '#FFB74D',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#FFB74D',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
  },
  saveBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  saveText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
  planLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 20,
  },
  planPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 8,
  },
  planDuration: {
    fontSize: 12,
    color: '#8B92A9',
    marginTop: 4,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8B92A9',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonActive: {
    borderColor: '#42A5F5',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#42A5F5',
  },
});

export default VIPScreen;