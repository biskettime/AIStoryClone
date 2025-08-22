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
  PanResponder,
  TouchableWithoutFeedback,
  BackHandler,
  StatusBar,
  Vibration,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../styles/colors';
import FAQItem from './FAQItem';
import FeatureGuide from './FeatureGuide';
import LoadingButton from './LoadingButton';

const { height: screenHeight } = Dimensions.get('window');

const HelpModal = ({ visible, onClose, defaultTab = 'VIP' }) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Animation values
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const blurIntensity = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const tabSlideAnim = useRef(new Animated.Value(0)).current;
  const contentSlideAnim = useRef(new Animated.Value(20)).current;
  
  // FAQ data for VIP
  const vipFAQs = [
    {
      id: 1,
      question: "VIP 구독하면 어떤 혜택이 있나요?",
      answer: "VIP 회원은 다음과 같은 혜택을 받습니다:\n\n• 매일 40개의 다이아몬드 지급\n• 다이아몬드 충전 시 10% 추가 보너스\n• 무제한 그룹 채팅\n• 고급 AI 모델 무제한 사용\n• 캐릭터당 메모리 슬롯 5개\n• 주간 새 캐릭터 생성 30개\n• 일일 이미지 생성 400개\n• 캐릭터 편집 횟수 6회\n• 새로운 기능 우선 체험"
    },
    {
      id: 2,
      question: "VIP 구독은 언제든지 취소할 수 있나요?",
      answer: "네, VIP 구독은 언제든지 취소 가능합니다.\n\n• 앱스토어/구글플레이 계정 설정에서 구독 관리\n• 취소 후에도 구독 기간 만료까지 혜택 유지\n• 자동 갱신 중단 가능\n• 환불 정책은 각 스토어 정책에 따름"
    },
    {
      id: 3,
      question: "다이아몬드는 어떻게 사용되나요?",
      answer: "다이아몬드는 앱의 핵심 화폐입니다:\n\n• AI 채팅 대화마다 소모\n• 이미지 생성 시 사용\n• 프리미엄 AI 모델 사용 시 필요\n• 특별한 기능 해제\n• VIP 회원은 매일 40개 무료 지급"
    },
    {
      id: 4,
      question: "메모리 슬롯이란 무엇인가요?",
      answer: "메모리 슬롯은 AI가 대화를 기억하는 기능입니다:\n\n• 일반 회원: 캐릭터당 1개 슬롯\n• VIP 회원: 캐릭터당 5개 슬롯\n• 더 길고 일관된 대화 가능\n• 캐릭터 성격과 이전 대화 기억\n• 더욱 몰입감 있는 채팅 경험"
    },
    {
      id: 5,
      question: "고급 AI 모델의 차이점은?",
      answer: "고급 AI 모델은 더 나은 채팅 경험을 제공합니다:\n\n• 더 자연스럽고 인간적인 대화\n• 복잡한 상황 이해 능력\n• 더 창의적이고 다양한 응답\n• 감정 표현이 풍부\n• VIP 회원만 무제한 사용 가능"
    }
  ];

  // FAQ data for Ads-free
  const adsFreeFAQs = [
    {
      id: 1,
      question: "광고 제거하면 어떤 변화가 있나요?",
      answer: "광고 제거 후 다음과 같은 경험을 하실 수 있습니다:\n\n• 모든 배너 및 전면 광고 제거\n• 채팅 중 광고 방해 없음\n• 더 빠른 앱 로딩 속도\n• 깔끔하고 집중된 인터페이스\n• 데이터 사용량 절약\n• 배터리 수명 연장"
    },
    {
      id: 2,
      question: "광고 제거는 영구적인가요?",
      answer: "광고 제거는 구독 기간 동안 유효합니다:\n\n• 월간 구독: 30일간 광고 없음\n• 연간 구독: 365일간 광고 없음\n• 구독 갱신 시 혜택 연장\n• 구독 취소 시 광고 복원\n• 언제든 재구독 가능"
    },
    {
      id: 3,
      question: "다른 기기에서도 광고가 제거되나요?",
      answer: "네, 같은 계정으로 로그인한 모든 기기에서 적용됩니다:\n\n• 스마트폰, 태블릿 동시 적용\n• 계정 연동 필요\n• 최대 5대 기기까지 지원\n• 기기 변경 시에도 혜택 유지\n• 계정 복원으로 쉬운 이전"
    },
    {
      id: 4,
      question: "VIP와 광고 제거의 차이점은?",
      answer: "두 구독의 주요 차이점:\n\n【광고 제거】\n• 광고만 제거\n• 더 저렴한 가격\n• 기본 기능 그대로\n\n【VIP】\n• 광고 제거 포함\n• 다이아몬드 지급\n• 프리미엄 기능 모두 제공\n• 더 풍부한 경험"
    },
    {
      id: 5,
      question: "광고 제거 후 환불 가능한가요?",
      answer: "환불 정책은 각 앱스토어 정책을 따릅니다:\n\n• 구글플레이: 구매 후 2시간 이내\n• 앱스토어: 구매 후 90일 이내 요청 가능\n• 서비스 이용 여부에 따라 환불 결정\n• 고객센터를 통한 문의 가능\n• 정당한 사유 시 환불 검토"
    }
  ];

  // Get current FAQ data based on selected tab
  const currentFAQs = selectedTab === 'VIP' ? vipFAQs : adsFreeFAQs;

  // Feature guides data
  const vipFeatureGuides = [
    {
      icon: '🧠',
      title: 'AI 메모리 슬롯 확장',
      description: 'VIP 회원님은 캐릭터당 최대 5개의 메모리 슬롯을 이용하실 수 있습니다',
      gradient: [Colors.vipGold, Colors.vipBronze],
      steps: [
        '캐릭터 설정 메뉴로 이동',
        '메모리 관리 탭 선택',
        '새로운 메모리 슬롯 추가',
        'AI가 대화 내용을 더 오래 기억합니다'
      ],
      isNew: true,
      action: {
        label: '사용법 안내 보기',
        onPress: () => console.log('Memory guide pressed')
      }
    },
    {
      icon: '💎',
      title: '매일 다이아몬드 지급',
      description: '매일 자동으로 40개의 다이아몬드를 지급드리며, 충전 시 10% 보너스를 드립니다',
      gradient: [Colors.primary, Colors.primaryDark],
      steps: [
        '매일 오전 9시에 자동 지급',
        '다이아몬드 충전 시 추가 10% 지급',
        '모든 프리미엄 기능 무제한 이용',
        '고급 AI 모델 무료 이용 가능'
      ]
    }
  ];

  const adsFreeFeaturesGuides = [
    {
      icon: '⚡',
      title: '빠른 앱 실행 속도',
      description: '광고 제거로 앱 로딩 속도가 최대 3배 빨라집니다',
      gradient: [Colors.primary, Colors.secondary],
      steps: [
        '광고 로딩 대기시간 완전 제거',
        '앱 메모리 사용량 현저히 감소',
        '배터리 수명 최대 30% 연장',
        '모바일 데이터 사용량 절약'
      ]
    },
    {
      icon: '✨',
      title: '순수한 채팅 경험',
      description: '어떠한 광고도 없는 깔끔하고 몰입감 있는 채팅 인터페이스',
      gradient: [Colors.vipGold, Colors.vipLightGold],
      steps: [
        '모든 배너 및 팝업 광고 완전 제거',
        '대화 중 갑작스러운 광고 차단 없음',
        '채팅 흐름이 끊어지지 않는 몰입감',
        '집중력과 사용자 만족도 현저히 향상'
      ]
    }
  ];

  const currentFeatureGuides = selectedTab === 'VIP' ? vipFeatureGuides : adsFreeFeaturesGuides;

  // Filter FAQs based on search query
  const filteredFAQs = currentFAQs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Enhanced pan responder for sophisticated swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && gestureState.dy > 0;
      },
      onPanResponderGrant: () => {
        // Light haptic feedback on gesture start
        Vibration.vibrate(10);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          // Apply resistance curve for smoother feel
          const resistance = 1 - Math.min(gestureState.dy / screenHeight, 0.8);
          const resistedDy = gestureState.dy * resistance;
          
          slideAnim.setValue(resistedDy);
          
          // Progressive opacity fade
          const opacityValue = 1 - (gestureState.dy / (screenHeight * 0.5));
          contentOpacity.setValue(Math.max(opacityValue, 0.3));
          
          // Progressive blur reduction
          const blurValue = 10 - (gestureState.dy / screenHeight) * 10;
          blurIntensity.setValue(Math.max(blurValue, 0));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const velocity = gestureState.vy;
        const distance = gestureState.dy;
        const threshold = screenHeight * 0.25; // 25% of screen height
        const velocityThreshold = 1200; // px/s
        
        if (distance > threshold || velocity > velocityThreshold) {
          // Complete the dismiss gesture
          Vibration.vibrate([30, 50]);
          handleClose();
        } else {
          // Snap back with elastic animation
          Vibration.vibrate(20);
          Animated.parallel([
            Animated.spring(slideAnim, {
              toValue: 0,
              useNativeDriver: true,
              tension: 100,
              friction: 8,
            }),
            Animated.spring(contentOpacity, {
              toValue: 1,
              useNativeDriver: true,
              tension: 100,
              friction: 8,
            }),
            Animated.timing(blurIntensity, {
              toValue: 10,
              duration: 200,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    })
  ).current;

  // Handle modal open/close animations
  useEffect(() => {
    if (visible) {
      // Reset animation values
      slideAnim.setValue(screenHeight);
      backdropOpacity.setValue(0);
      contentOpacity.setValue(0);
      blurIntensity.setValue(0);
      scaleAnim.setValue(0.95);
      tabSlideAnim.setValue(-50);
      contentSlideAnim.setValue(20);
      
      // Sophisticated entrance animation sequence
      Animated.sequence([
        // Phase 1: Backdrop and blur
        Animated.parallel([
          Animated.timing(backdropOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(blurIntensity, {
            toValue: 10,
            duration: 400,
            useNativeDriver: false,
          }),
        ]),
        // Phase 2: Modal slide in with spring
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        // Phase 3: Scale and content animations
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 120,
            friction: 8,
          }),
          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.spring(tabSlideAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.spring(contentSlideAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
        ]),
      ]).start();
    }
  }, [visible]);

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        handleClose();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [visible]);

  const handleClose = () => {
    // Haptic feedback
    Vibration.vibrate(50);
    
    // Enhanced exit animation with proper timing
    Animated.sequence([
      // Phase 1: Content fade out
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      // Phase 2: Modal slide out and blur fade
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: screenHeight,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(blurIntensity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      onClose();
      setExpandedFAQ(null);
      setSearchQuery('');
      setContactLoading(false);
      setContactSuccess(false);
    });
  };

  const toggleFAQ = (faqId) => {
    // Haptic feedback for interaction
    Vibration.vibrate(30);
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleTabSwitch = (tab) => {
    if (tab !== selectedTab) {
      Vibration.vibrate(30);
      
      // Smooth tab transition animation
      Animated.parallel([
        // Fade out current content
        Animated.timing(contentOpacity, {
          toValue: 0.3,
          duration: 150,
          useNativeDriver: true,
        }),
        // Slide content out
        Animated.timing(contentSlideAnim, {
          toValue: 30,
          duration: 150,
          useNativeDriver: true,
        }),
        // Tab indicator slide
        Animated.spring(tabSlideAnim, {
          toValue: tab === 'VIP' ? 0 : 100,
          useNativeDriver: true,
          tension: 150,
          friction: 8,
        }),
      ]).start(() => {
        setSelectedTab(tab);
        setExpandedFAQ(null);
        setSearchQuery('');
        
        // Fade in new content
        Animated.parallel([
          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(contentSlideAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
        ]).start();
      });
    }
  };

  const handleContactPress = async () => {
    Vibration.vibrate(50);
    setContactLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setContactLoading(false);
      setContactSuccess(true);
      
      // Reset success state after showing feedback
      setTimeout(() => {
        setContactSuccess(false);
      }, 2000);
      
      console.log('Contact support pressed');
    } catch (error) {
      setContactLoading(false);
      console.error('Contact failed:', error);
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* Enhanced Backdrop with Blur */}
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity,
            },
          ]}
        >
          <Animated.View 
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                opacity: blurIntensity.interpolate({
                  inputRange: [0, 10],
                  outputRange: [0, 1],
                }),
              }
            ]}
          />
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.backdropTouchable} />
          </TouchableWithoutFeedback>
        </Animated.View>

        {/* Modal Content */}
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
              opacity: contentOpacity,
            },
          ]}
          {...panResponder.panHandlers}
        >
          {/* Handle bar */}
          <View style={styles.handleBar} />
          
          {/* Header */}
          <LinearGradient
            colors={[Colors.vipDarkBrown, Colors.vipBrown, Colors.vipGold]}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>도움말</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>

            {/* Animated Tab switcher */}
            <Animated.View 
              style={[
                styles.tabs,
                {
                  transform: [{ translateX: tabSlideAnim }],
                  opacity: contentOpacity,
                }
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === 'VIP' && styles.tabActive
                ]}
                onPress={() => handleTabSwitch('VIP')}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="VIP 도움말"
                accessibilityState={{ selected: selectedTab === 'VIP' }}
              >
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
                <Text style={[
                  styles.tabText,
                  selectedTab === 'VIP' && styles.tabTextActive
                ]}>
                  VIP
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === 'Ads-free' && styles.tabActive
                ]}
                onPress={() => handleTabSwitch('Ads-free')}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="광고 제거 도움말"
                accessibilityState={{ selected: selectedTab === 'Ads-free' }}
              >
                <Animated.Text 
                  style={[
                    styles.adsIcon,
                    {
                      transform: [{
                        scale: selectedTab === 'Ads-free' ? 1.2 : 1,
                      }]
                    }
                  ]}
                >
                  🚫
                </Animated.Text>
                <Text style={[
                  styles.tabText,
                  selectedTab === 'Ads-free' && styles.tabTextActive
                ]}>
                  광고 제거
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>

          {/* Animated Content */}
          <Animated.View
            style={[
              styles.content,
              {
                opacity: contentOpacity,
                transform: [{ translateY: contentSlideAnim }],
              }
            ]}
          >
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={true}
          >
            {/* Introduction */}
            <View style={styles.introduction}>
              <Text style={styles.introTitle}>
                {selectedTab === 'VIP' ? 'VIP 회원 전용 혜택' : '순수한 채팅 경험'}
              </Text>
              <Text style={styles.introText}>
                {selectedTab === 'VIP' 
                  ? '프리미엄 기능과 VIP 전용 특별 혜택을 모두 마음껏 이용하세요. VIP 회원님만을 위한 차별화된 서비스를 경험하실 수 있습니다.'
                  : '어떠한 광고도 없는 진정한 채팅 경험을 마음껏 즐기세요. 깔끔하고 몰입감 있는 인터페이스로 온전히 집중하실 수 있습니다.'
                }
              </Text>
            </View>

            {/* Benefits preview */}
            <View style={styles.benefitsSection}>
              <Text style={styles.sectionTitle}>
                {selectedTab === 'VIP' ? '주요 혜택' : '개선 사항'}
              </Text>
              
              {selectedTab === 'VIP' ? (
                <View style={styles.benefitsList}>
                  <View style={styles.benefitItem}>
                    <Text style={styles.benefitIcon}>💎</Text>
                    <Text style={styles.benefitText}>매일 40개 다이아몬드 자동 지급</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <Text style={styles.benefitIcon}>🚀</Text>
                    <Text style={styles.benefitText}>모든 프리미엄 기능 무제한 이용</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <Text style={styles.benefitIcon}>🧠</Text>
                    <Text style={styles.benefitText}>AI 메모리 슬롯 최대 5개까지</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <Text style={styles.benefitIcon}>🎨</Text>
                    <Text style={styles.benefitText}>창작 한계 대폭 확대</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.benefitsList}>
                  <View style={styles.benefitItem}>
                    <Text style={styles.benefitIcon}>⚡</Text>
                    <Text style={styles.benefitText}>앱 실행 속도 최대 3배 빨라짐</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <Text style={styles.benefitIcon}>✨</Text>
                    <Text style={styles.benefitText}>광고 없는 깔끔한 인터페이스</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <Text style={styles.benefitIcon}>📱</Text>
                    <Text style={styles.benefitText}>모바일 데이터 사용량 절약</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <Text style={styles.benefitIcon}>🔋</Text>
                    <Text style={styles.benefitText}>배터리 수명 최대 30% 연장</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Feature Guides Section */}
            <View style={styles.guidesSection}>
              <Text style={styles.sectionTitle}>
                {selectedTab === 'VIP' ? 'VIP 전용 기능 안내' : '광고 제거 효과 안내'}
              </Text>
              <Text style={styles.guidesSubtitle}>
                {selectedTab === 'VIP' 
                  ? 'VIP 회원님만의 특별한 기능들을 효과적으로 활용하는 방법을 알아보세요'
                  : '광고 제거로 인해 달라지는 놀라운 변화들을 직접 확인해보세요'
                }
              </Text>
              
              {currentFeatureGuides.map((guide, index) => (
                <FeatureGuide
                  key={index}
                  feature={guide}
                  isVisible={true}
                />
              ))}
            </View>

            {/* FAQ Section */}
            <View style={styles.faqSection}>
              <Text style={styles.sectionTitle}>자주 묻는 질문 (FAQ)</Text>
              <Text style={styles.faqSubtitle}>
                궁금하신 내용을 클릭하시면 상세한 답변을 확인하실 수 있습니다
              </Text>
              
              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <Ionicons 
                    name="search" 
                    size={18} 
                    color={Colors.textSecondary} 
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="궁금한 내용을 검색해보세요..."
                    placeholderTextColor={Colors.textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    returnKeyType="search"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity
                      onPress={() => setSearchQuery('')}
                      style={styles.clearButton}
                      accessibilityRole="button"
                      accessibilityLabel="검색어 지우기"
                    >
                      <Ionicons 
                        name="close-circle" 
                        size={18} 
                        color={Colors.textSecondary} 
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    index={index}
                    isExpanded={expandedFAQ === faq.id}
                    onToggle={toggleFAQ}
                  />
                ))
              ) : searchQuery.length > 0 ? (
                <View style={styles.noResultsContainer}>
                  <Ionicons name="search" size={48} color={Colors.textSecondary} />
                  <Text style={styles.noResultsTitle}>검색 결과를 찾을 수 없습니다</Text>
                  <Text style={styles.noResultsText}>
                    다른 키워드로 다시 검색해보시거나, 아래 고객센터로 문의해주시기 바랍니다
                  </Text>
                </View>
              ) : null}
            </View>

            {/* Contact info */}
            <View style={styles.contactSection}>
              <Text style={styles.sectionTitle}>추가적인 도움이 필요하신가요?</Text>
              <Text style={styles.contactText}>
                더 궁금하신 내용이 있으시거나 문의사항이 있으시면 언제든지 마음편히 연락주시기 바랍니다.
              </Text>
              
              <LoadingButton
                title="고객지원팀에 문의하기"
                onPress={handleContactPress}
                loading={contactLoading}
                success={contactSuccess}
                gradientColors={[Colors.primary, Colors.primaryDark]}
                icon="mail"
                style={styles.contactButton}
              />
            </View>

            {/* Bottom padding */}
            <View style={styles.bottomPadding} />
          </ScrollView>
          </Animated.View>
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
  backdropTouchable: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: screenHeight * 0.85,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: Colors.vipGold,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 20,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: Colors.textSecondary,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    gap: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    gap: 6,
  },
  tabActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderWidth: 1,
    borderColor: Colors.vipGold,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.text,
  },
  crownIcon: {
    fontSize: 16,
  },
  adsIcon: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  introduction: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  introText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  benefitsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.vipGold,
    marginBottom: 16,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitIcon: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  benefitText: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  guidesSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
  },
  guidesSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
  faqSection: {
    padding: 20,
  },
  faqSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    padding: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  contactSection: {
    padding: 20,
    alignItems: 'center',
  },
  contactText: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  contactButton: {
    alignSelf: 'stretch',
    marginTop: 8,
  },
  bottomPadding: {
    height: 40,
  },
});

export default HelpModal;