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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import HelpModalFullScreen from '../components/HelpModalFullScreen';
// Removed Korean localization - using English only
import { animationTelemetry } from '../utils/animationTelemetry';
import { errorMonitoring, logVIPError, logPurchaseError, logAnimationError } from '../utils/errorMonitoring';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const VIPScreen = ({ navigation }) => {
  // User data (would come from auth/context in real app)
  const userData = {
    username: 'User4ffe',
    isVIPActive: false,
    avatar: null,
  };
  const [selectedTab, setSelectedTab] = useState('VIP');
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null);
  const [networkError, setNetworkError] = useState(false);

  // Animation values
  const slideInAnim = useRef(new Animated.Value(screenHeight)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const tabIndicatorAnim = useRef(new Animated.Value(selectedTab === 'VIP' ? 1 : 0)).current;
  const planCardsAnim = useRef(new Animated.Value(0)).current;
  const buttonPulseAnim = useRef(new Animated.Value(1)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  // Individual plan card animations
  const planAnimations = useRef(
    ['weekly', 'monthly', 'yearly'].map(() => new Animated.Value(0))
  ).current;

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

  // VIP benefits - different tiers
  const vipPerks = [
    { title: 'Get 40 diamonds / day', value: '40', checked: true },
    { title: '+10% diamonds recharge', value: '+10%', checked: true },
  ];

  const vipPrivileges = [
    { title: 'Unlimited group chat', value: '✓', checked: true },
    { title: 'Unlimited advanced models', value: '✓', checked: true },
    { title: 'Memory slots per role 1→5', value: '5', checked: true },
    { title: 'Limitless inspiration', value: '✓', checked: true },
    { title: 'New role creates 10→30 / week', value: '30', checked: true },
    { title: 'Image gens 200→400 / day', value: '400', checked: true },
    { title: 'Role edit times 3→6', value: '6', checked: true },
    { title: 'Early access to new features', value: '✓', checked: true },
  ];

  // Pricing plans
  const vipPrice = '₩4,400/month';
  const adsFreePrice = '₩4,400/month';

  // Initialize entrance animations
  useEffect(() => {
    // Start telemetry tracking for screen entrance
    animationTelemetry.trackVIPScreenEntrance();
    
    // Screen entrance animation sequence
    Animated.sequence([
      // Initial slide in
      Animated.spring(slideInAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      // Fade in content
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // Scale up effect
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 120,
        friction: 8,
      }),
    ]).start(() => {
      // End telemetry tracking when entrance animation completes
      animationTelemetry.trackVIPScreenExit();
    });

    // Staggered plan card animations
    const staggerDelay = 100;
    planAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: 500 + (index * staggerDelay),
        useNativeDriver: true,
      }).start();
    });

    // Continuous button pulse
    const pulseAnimation = () => {
      Animated.sequence([
        Animated.timing(buttonPulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(buttonPulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(pulseAnimation, 2000);
      });
    };
    
    const pulseTimeout = setTimeout(pulseAnimation, 1500);
    return () => {
      clearTimeout(pulseTimeout);
      // Flush any remaining telemetry data on unmount
      animationTelemetry.flush();
    };
  }, []);

  // Tab switching animation
  const handleTabSwitch = (newTab) => {
    try {
      if (newTab === selectedTab) return;
      
      // Track tab switch animation
      animationTelemetry.trackTabSwitch(selectedTab, newTab);
      
      Vibration.vibrate(30);
    
    // Animate tab indicator
    Animated.spring(tabIndicatorAnim, {
      toValue: newTab === 'VIP' ? 1 : 0,
      useNativeDriver: false,
      tension: 100,
      friction: 7,
    }).start();

    // Fade out content
    Animated.timing(planCardsAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setSelectedTab(newTab);
      // Fade in new content
      Animated.timing(planCardsAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
    } catch (error) {
      logVIPError(error, 'tab_switch', { 
        from_tab: selectedTab, 
        to_tab: newTab 
      });
    }
  };

  // Plan selection with animation
  const handlePlanSelection = (planId) => {
    try {
      if (planId === selectedPlan) return;
      
      // Track plan selection animation
      animationTelemetry.trackPlanSelection(planId);
      
      Vibration.vibrate([30, 50]);
      setSelectedPlan(planId);
    
    // Scale animation for selected plan
    const planIndex = (selectedTab === 'VIP' ? vipPlans : adsFreePlans)
      .findIndex(plan => plan.id === planId);
    
    if (planIndex !== -1 && planAnimations[planIndex]) {
      Animated.sequence([
        Animated.timing(planAnimations[planIndex], {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(planAnimations[planIndex], {
          toValue: 1.05,
          useNativeDriver: true,
          tension: 300,
          friction: 4,
        }),
        Animated.spring(planAnimations[planIndex], {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
      ]).start();
    }
    } catch (error) {
      logVIPError(error, 'plan_selection', { 
        plan_id: planId,
        current_tab: selectedTab 
      });
    }
  };

  // Purchase button with loading and success animations
  const handlePurchase = async () => {
    // Track purchase button animation
    animationTelemetry.trackPurchaseButton();
    
    Vibration.vibrate([50, 100]);
    setPurchaseLoading(true);
    setPurchaseError(null);
    setNetworkError(false);
    
    // Animate button during loading
    const loadingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulseAnim, {
          toValue: 0.98,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(buttonPulseAnim, {
          toValue: 1.02,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loadingAnimation.start();

    try {
      // Simulate purchase process with network check
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate occasional network or payment errors
          const random = Math.random();
          if (random < 0.1) {
            reject(new Error('network_error'));
          } else if (random < 0.2) {
            reject(new Error('payment_failed'));
          } else {
            resolve();
          }
        }, 2000);
      });
      
      loadingAnimation.stop();
      setPurchaseLoading(false);
      setPurchaseSuccess(true);
      
      // Success animation with particles effect
      Animated.sequence([
        Animated.spring(successAnim, {
          toValue: 1.2,
          useNativeDriver: true,
          tension: 200,
          friction: 3,
        }),
        Animated.spring(successAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
      ]).start();

      // Celebration vibration pattern
      Vibration.vibrate([100, 50, 100, 50, 200]);
      
      // Reset success state
      setTimeout(() => {
        setPurchaseSuccess(false);
        Animated.timing(successAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 3000);
      
    } catch (error) {
      loadingAnimation.stop();
      setPurchaseLoading(false);
      
      // Log purchase error with detailed context
      const currentPlan = (selectedTab === 'VIP' ? vipPlans : adsFreePlans)
        .find(p => p.id === selectedPlan);
      
      logPurchaseError(error, 'purchase_processing', selectedTab, selectedPlan, {
        plan_details: currentPlan,
        error_type: error.message,
        user_action: 'purchase_attempt',
      });
      
      // Set appropriate error message based on error type
      if (error.message === 'network_error') {
        setNetworkError(true);
        setPurchaseError(KoreanStrings.messages.error.networkError);
      } else if (error.message === 'payment_failed') {
        setPurchaseError(KoreanStrings.messages.error.paymentFailed);
      } else {
        setPurchaseError(KoreanStrings.messages.error.subscriptionFailed);
      }
      
      // Error vibration pattern
      Vibration.vibrate([200, 100, 200, 100, 200]);
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setPurchaseError(null);
        setNetworkError(false);
      }, 5000);
    }
  };

  // Enhanced micro-interaction for touchable elements with haptic feedback
  const createPressAnimation = (scale = 0.95, hapticType = 'light') => ({
    onPressIn: () => {
      // Enhanced haptic feedback based on interaction type
      if (hapticType === 'heavy') {
        Vibration.vibrate([50, 30]); // For critical actions like purchase
      } else if (hapticType === 'medium') {
        Vibration.vibrate(40); // For tab switching
      } else {
        Vibration.vibrate(25); // Light feedback for plan selection
      }
      
      Animated.spring(scaleAnim, {
        toValue: scale,
        useNativeDriver: true,
        tension: 400, // Increased responsiveness
        friction: 3,  // Snappier animation
      }).start();
    },
    onPressOut: () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 400, // Increased responsiveness
        friction: 6,  // Smooth return
      }).start();
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [
              { translateY: slideInAnim },
              { scale: scaleAnim }
            ],
            opacity: fadeInAnim,
          },
        ]}
      >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={true}
      >
        {/* Header */}
        <LinearGradient
          colors={[Colors.vipDarkBrown, Colors.vipBrown, Colors.vipGold]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
        <View style={styles.headerTop}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          
          <View style={styles.tabs}>
            <TouchableOpacity
              onPress={() => handleTabSwitch('Ads-free')}
              {...createPressAnimation(0.98, 'medium')}
              activeOpacity={0.8}
              accessibilityLabel="Ads-free tab"
              accessibilityRole="tab"
              accessibilityState={{ selected: selectedTab === 'Ads-free' }}
            >
              <Text style={[styles.tabText, selectedTab !== 'Ads-free' && styles.tabInactive]}>
                Ads-free
              </Text>
              <Animated.View 
                style={[
                  styles.tabIndicator, 
                  {
                    opacity: tabIndicatorAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0],
                    }),
                    transform: [{
                      translateX: tabIndicatorAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 80],
                      })
                    }]
                  }
                ]} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => handleTabSwitch('VIP')}
              {...createPressAnimation(0.98, 'medium')}
              activeOpacity={0.8}
              accessibilityLabel="VIP tab"
              accessibilityRole="tab"
              accessibilityState={{ selected: selectedTab === 'VIP' }}
            >
              <View style={styles.vipTabContainer}>
                <Animated.Text 
                  style={[
                    styles.crownIcon,
                    {
                      transform: [{
                        scale: selectedTab === 'VIP' ? 1.2 : 1,
                      }]
                    }
                  ]}
                >
                  👑
                </Animated.Text>
                <Text style={[styles.tabText, selectedTab !== 'VIP' && styles.tabInactive]}>
                  VIP
                </Text>
              </View>
              <Animated.View 
                style={[
                  styles.tabIndicator,
                  {
                    opacity: tabIndicatorAnim,
                    transform: [{
                      translateX: tabIndicatorAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-80, 0],
                      })
                    }]
                  }
                ]} 
              />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            onPress={() => setHelpModalVisible(true)}
            style={styles.helpButton}
            activeOpacity={0.7}
            accessibilityLabel="Help"
            accessibilityRole="button"
          >
            <Ionicons name="help-circle-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: planCardsAnim,
            transform: [{ translateY: planCardsAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            })}]
          }
        ]}
      >
        {selectedTab === 'VIP' ? (
          <>
            {/* VIP Pricing Plans */}
            <View style={styles.plansContainer}>
              {vipPlans.map((plan, index) => (
                <Animated.View
                  key={plan.id}
                  style={{
                    flex: 1,
                    opacity: planAnimations[index],
                    transform: [{
                      translateY: planAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      })
                    }, {
                      scale: planAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      })
                    }]
                  }}
                >
                <TouchableOpacity
                  style={[
                    styles.planCard,
                    selectedPlan === plan.id && styles.planCardActive
                  ]}
                  onPress={() => handlePlanSelection(plan.id)}
                  {...createPressAnimation(0.97)}
                  activeOpacity={0.8}
                  accessibilityLabel={`Select ${plan.label} plan - ${plan.price} ${plan.duration}${plan.discount ? ` ${plan.discount}` : ''}`}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: selectedPlan === plan.id }}
                >
                  {plan.discount && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{plan.discount}</Text>
                    </View>
                  )}
                  <Text style={styles.planLabel}>{plan.label}</Text>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planDuration}>{plan.duration}</Text>
                </TouchableOpacity>
                </Animated.View>
              ))}
            </View>

            {/* VIP Perks Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.crownContainer}>
                  <Text style={styles.sectionCrown}>👑</Text>
                  <LinearGradient
                    colors={[Colors.vipGold, Colors.vipLightGold]}
                    style={styles.crownGlow}
                  />
                </View>
                <Text style={styles.sectionTitle}>VIP Benefits</Text>
              </View>
              
              {vipPerks.map((perk, index) => (
                <View key={index} style={styles.item}>
                  <Text style={styles.itemText}>{perk.title}</Text>
                  <View style={styles.itemRight}>
                    <Text style={styles.itemValue}>{perk.value}</Text>
                    {perk.checked && (
                      <View style={styles.checkIcon}>
                        <Ionicons name="checkmark-circle" size={20} color={Colors.vipGold} />
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>

            {/* VIP Privileges Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.crownContainer}>
                  <Text style={styles.sectionCrown}>💎</Text>
                  <LinearGradient
                    colors={[Colors.vipGold, Colors.vipLightGold]}
                    style={styles.crownGlow}
                  />
                </View>
                <Text style={styles.sectionTitle}>VIP Privileges</Text>
              </View>
              
              {vipPrivileges.map((privilege, index) => (
                <View key={index} style={styles.item}>
                  <Text style={styles.itemText}>{privilege.title}</Text>
                  <View style={styles.itemRight}>
                    <Text style={styles.itemValue}>{privilege.value}</Text>
                    {privilege.checked && (
                      <View style={styles.checkIcon}>
                        <Ionicons name="checkmark-circle" size={20} color={Colors.vipGold} />
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* Ads-free Pricing Plans */}
            <View style={styles.plansContainer}>
              {adsFreePlans.map((plan, index) => (
                <Animated.View
                  key={plan.id}
                  style={{
                    flex: 1,
                    opacity: planAnimations[index],
                    transform: [{
                      translateY: planAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      })
                    }, {
                      scale: planAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      })
                    }]
                  }}
                >
                <TouchableOpacity
                  style={[
                    styles.planCard,
                    selectedPlan === plan.id && styles.planCardActive
                  ]}
                  onPress={() => handlePlanSelection(plan.id)}
                  {...createPressAnimation(0.97)}
                  activeOpacity={0.8}
                  accessibilityLabel={`Select ${plan.label} plan - ${plan.price} ${plan.duration}${plan.discount ? ` ${plan.discount}` : ''}`}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: selectedPlan === plan.id }}
                >
                  {plan.discount && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{plan.discount}</Text>
                    </View>
                  )}
                  <Text style={styles.planLabel}>{plan.label}</Text>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planDuration}>{plan.duration}</Text>
                </TouchableOpacity>
                </Animated.View>
              ))}
            </View>

            {/* Ads-free Benefits Section */}
            <View style={styles.adsFreeSection}>
              <Text style={styles.adsFreeTitle}>광고 없는 경험을 즐기세요</Text>
              <Text style={styles.adsFreeSubtitle}>방해 없이, 순수한 채팅만</Text>
              
              <View style={styles.adsFreePerksContainer}>
                {adsFreePerks.map((perk, index) => (
                  <View key={index} style={styles.adsFreePerkItem}>
                    <View style={styles.adsFreePerkIcon}>
                      <Text style={styles.adsFreePerkEmoji}>{perk.icon}</Text>
                    </View>
                    <Text style={styles.adsFreePerkText}>{perk.title}</Text>
                    <Ionicons name="checkmark" size={16} color="#4CAF50" />
                  </View>
                ))}
              </View>
              
              <View style={styles.adsFreeNote}>
                <Text style={styles.adsFreeNoteText}>
                  • 구매 후 즉시 활성화
                </Text>
                <Text style={styles.adsFreeNoteText}>
                  • 언제든지 취소 가능
                </Text>
                <Text style={styles.adsFreeNoteText}>
                  • 모든 기기에서 작동
                </Text>
              </View>
            </View>
          </>
        )}

        {/* Activate Button */}
        <Animated.View
          style={[
            styles.activateButton,
            {
              transform: [
                { scale: buttonPulseAnim },
                { scale: successAnim.interpolate({
                  inputRange: [0, 1, 1.2],
                  outputRange: [1, 1, 1.1],
                  extrapolate: 'clamp',
                })}
              ],
            },
          ]}
        >
          <TouchableOpacity
            onPress={handlePurchase}
            disabled={purchaseLoading}
            {...createPressAnimation(0.96, 'heavy')}
            activeOpacity={0.8}
            style={{ flex: 1 }}
            accessibilityLabel={selectedTab === 'VIP' ? 'Subscribe to VIP' : 'Subscribe to Ads-free'}
            accessibilityRole="button"
            accessibilityState={{ disabled: purchaseLoading }}
          >
            <LinearGradient
              colors={purchaseSuccess 
                ? ['#4CAF50', '#45A049', '#388E3C']
                : selectedTab === 'VIP' 
                  ? ['#FFB74D', '#FF9800', '#F57C00'] // Softer gold gradient
                  : ['#42A5F5', '#2196F3', '#1E88E5'] // Blue gradient for Ads-free
              }
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {purchaseLoading && (
                <Animated.View
                  style={[
                    styles.loadingSpinner,
                    {
                      transform: [{
                        rotate: buttonPulseAnim.interpolate({
                          inputRange: [0.98, 1.02],
                          outputRange: ['0deg', '360deg'],
                        })
                      }]
                    }
                  ]}
                >
                  <Ionicons name="refresh" size={20} color="#FFF" />
                </Animated.View>
              )}
              
              {purchaseSuccess && (
                <Animated.View
                  style={[
                    styles.successIcon,
                    {
                      opacity: successAnim,
                      transform: [{ scale: successAnim }]
                    }
                  ]}
                >
                  <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                </Animated.View>
              )}

              {selectedTab === 'VIP' && !purchaseLoading && !purchaseSuccess && (
                <Animated.View 
                  style={[
                    styles.buttonCrownContainer,
                    {
                      transform: [{
                        scale: buttonPulseAnim.interpolate({
                          inputRange: [1, 1.05],
                          outputRange: [1, 1.1],
                        })
                      }]
                    }
                  ]}
                >
                  <Text style={styles.buttonCrown}>👑</Text>
                </Animated.View>
              )}
              
              <Text style={[
                styles.activateButtonText,
                purchaseLoading && styles.loadingText,
                purchaseSuccess && styles.successText,
                purchaseError && styles.errorText,
              ]}>
                {purchaseLoading 
                  ? 'Processing...'
                  : purchaseError
                    ? purchaseError
                    : purchaseSuccess
                      ? 'Subscription Activated!'
                      : selectedTab === 'VIP' 
                        ? `Subscribe to VIP ${vipPlans.find(p => p.id === selectedPlan)?.label || 'Monthly'} - ${vipPlans.find(p => p.id === selectedPlan)?.price || '$14.99'}`
                        : `Subscribe to Ads-free ${adsFreePlans.find(p => p.id === selectedPlan)?.label || 'Monthly'} - ${adsFreePlans.find(p => p.id === selectedPlan)?.price || '$2.99'}`
                }
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Error Message Display */}
        {purchaseError && (
          <Animated.View style={styles.errorContainer}>
            <View style={styles.errorMessage}>
              <Ionicons name="warning" size={16} color="#FF4444" />
              <Text style={styles.errorMessageText}>{purchaseError}</Text>
            </View>
            {networkError && (
              <Text style={styles.retryText}>Tap to retry</Text>
            )}
          </Animated.View>
        )}

        {/* Footer Links */}
        <View style={styles.footer}>
          <TouchableOpacity
            accessibilityLabel="Terms of Service"
            accessibilityRole="link"
          >
            <Text style={styles.footerLink}>Terms of Service</Text>
          </TouchableOpacity>
          <Text style={styles.footerSeparator}>|</Text>
          <TouchableOpacity
            accessibilityLabel="Privacy Policy"
            accessibilityRole="link"
          >
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        {/* Restore Button */}
        <TouchableOpacity 
          style={styles.restoreButton}
          {...createPressAnimation(0.97)}
          activeOpacity={0.7}
          accessibilityLabel="Restore purchases"
          accessibilityRole="button"
        >
          <Text style={styles.restoreText}>Restore Purchases</Text>
        </TouchableOpacity>
      </Animated.View>
      </ScrollView>
      </Animated.View>

      {/* Full-Screen Help Modal */}
      <HelpModalFullScreen
        visible={helpModalVisible}
        onClose={() => setHelpModalVisible(false)}
        defaultTab={selectedTab}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  animatedContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: Colors.vipGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  tabs: {
    flexDirection: 'row',
    gap: 30,
  },
  vipTabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  crownIcon: {
    fontSize: 18,
    textShadowColor: Colors.vipGold,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tabInactive: {
    color: Colors.textSecondary,
    fontWeight: '400',
  },
  tabActive: {
    color: Colors.vipGold,
  },
  tabIndicator: {
    height: 3,
    backgroundColor: Colors.vipGold,
    marginTop: 8,
    borderRadius: 2,
    shadowColor: Colors.vipGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  helpButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.vipGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 30,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.vipGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.vipGold + '20',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  crownContainer: {
    position: 'relative',
    marginRight: 12,
  },
  sectionCrown: {
    fontSize: 24,
    textShadowColor: Colors.vipGold,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    zIndex: 2,
  },
  crownGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 20,
    opacity: 0.3,
    zIndex: 1,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.vipGold,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.surfaceLight,
  },
  itemText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  itemValue: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  checkIcon: {
    marginLeft: 8,
  },
  activateButton: {
    marginVertical: 30,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: Colors.vipGold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  buttonCrownContainer: {
    marginRight: 8,
  },
  buttonCrown: {
    fontSize: 20,
    textShadowColor: Colors.vipDarkBrown,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  activateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textShadowColor: 'rgba(255,255,255,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  plansContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  planCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.vipBrown + '40',
    position: 'relative',
    shadowColor: Colors.vipGold,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  planCardActive: {
    borderColor: Colors.vipGold,
    backgroundColor: Colors.vipGold + '15',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    transform: [{ scale: 1.02 }],
  },
  discountBadge: {
    position: 'absolute',
    top: -10,
    right: -5,
    backgroundColor: Colors.vipBronze,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.vipGold,
    shadowColor: Colors.vipGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  discountText: {
    color: Colors.text,
    fontSize: 10,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  planLabel: {
    fontSize: 15,
    color: Colors.vipGold,
    marginBottom: 10,
    fontWeight: '600',
  },
  planPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  planDuration: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  adsFreeSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    margin: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  adsFreeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  adsFreeSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
  },
  adsFreePerksContainer: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adsFreePerkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 4,
  },
  adsFreePerkIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary + '25',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  adsFreePerkEmoji: {
    fontSize: 18,
  },
  adsFreePerkText: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    fontWeight: '600',
  },
  adsFreeNote: {
    backgroundColor: Colors.primary + '10',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  adsFreeNoteText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  footerLink: {
    fontSize: 13,
    color: Colors.primary,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  footerSeparator: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginHorizontal: 12,
    fontWeight: '300',
  },
  restoreButton: {
    alignItems: 'center',
    marginBottom: 40,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: Colors.surface + '80',
  },
  restoreText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  loadingSpinner: {
    marginRight: 8,
  },
  successIcon: {
    marginRight: 8,
  },
  loadingText: {
    opacity: 0.8,
  },
  successText: {
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  errorText: {
    color: '#FF4444',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  errorContainer: {
    marginTop: 16,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  errorMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 68, 0.3)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  errorMessageText: {
    color: '#FF4444',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  },
  retryText: {
    color: Colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default VIPScreen;