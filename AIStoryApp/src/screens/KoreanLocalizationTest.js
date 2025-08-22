/**
 * Korean Localization Test Screen
 * Demonstrates complete Korean localization implementation
 * - Proper Korean typography
 * - Cultural adaptations
 * - Error handling in Korean
 * - Pricing formats
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { GlobalStyles, KOREAN_TYPOGRAPHY } from '../styles/globalStyles';
import { KoreanStrings, KoreanUtils } from '../localization/korean';

const KoreanLocalizationTest = ({ navigation }) => {
  const [testState, setTestState] = useState('idle');

  // Test error messages
  const testErrorMessages = () => {
    const errors = [
      KoreanStrings.messages.error.paymentFailed,
      KoreanStrings.messages.error.networkError,
      KoreanStrings.messages.error.subscriptionFailed,
      KoreanStrings.messages.error.tryAgain,
    ];
    
    Alert.alert(
      '오류 메시지 테스트',
      errors.join('\n\n'),
      [{ text: '확인', style: 'default' }]
    );
  };

  // Test success messages
  const testSuccessMessages = () => {
    const successes = [
      KoreanStrings.messages.success.subscriptionComplete,
      KoreanStrings.messages.success.purchaseComplete,
      KoreanStrings.messages.success.restored,
      KoreanStrings.messages.success.cancelled,
    ];
    
    Alert.alert(
      '성공 메시지 테스트',
      successes.join('\n\n'),
      [{ text: '확인', style: 'default' }]
    );
  };

  // Test currency formatting
  const testCurrencyFormatting = () => {
    const prices = [4400, 22000, 132000, 2200, 15000];
    const formatted = prices.map(price => KoreanUtils.formatCurrency(price));
    
    Alert.alert(
      '가격 형식 테스트',
      `원본: ${prices.join(', ')}\n\n형식화: ${formatted.join(', ')}`,
      [{ text: '확인', style: 'default' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={GlobalStyles.koreanTitle}>한국어 현지화 테스트</Text>
        </View>

        {/* Typography Test Section */}
        <View style={styles.section}>
          <Text style={GlobalStyles.koreanHeading}>1. 한국어 타이포그래피 테스트</Text>
          
          <View style={styles.typographyTest}>
            <Text style={GlobalStyles.koreanTitle}>
              제목 스타일 - VIP 구독 서비스
            </Text>
            <Text style={GlobalStyles.koreanBodyLarge}>
              본문 대형 - 프리미엄 기능과 VIP 전용 특별 혜택을 모두 마음껏 이용하세요.
            </Text>
            <Text style={GlobalStyles.koreanBody}>
              본문 일반 - VIP 회원님만을 위한 차별화된 서비스를 경험하실 수 있습니다.
            </Text>
            <Text style={GlobalStyles.koreanCaption}>
              캡션 - 구매 후 즉시 활성화되며, 언제든지 구독 취소가 가능합니다.
            </Text>
          </View>
        </View>

        {/* Pricing Test Section */}
        <View style={styles.section}>
          <Text style={GlobalStyles.koreanHeading}>2. 가격 표시 테스트</Text>
          
          <View style={styles.pricingTest}>
            <View style={styles.priceCard}>
              <Text style={styles.planLabel}>{KoreanStrings.vip.weekly}</Text>
              <Text style={styles.planPrice}>{KoreanStrings.vip.weeklyPrice}</Text>
              <Text style={styles.planDuration}>{KoreanStrings.vip.weeklyDuration}</Text>
            </View>
            
            <View style={styles.priceCard}>
              <Text style={styles.planLabel}>{KoreanStrings.vip.monthly}</Text>
              <Text style={styles.planPrice}>{KoreanStrings.vip.monthlyPrice}</Text>
              <Text style={styles.planDuration}>{KoreanStrings.vip.monthlyDuration}</Text>
              <Text style={styles.planSavings}>{KoreanStrings.vip.monthlySavings}</Text>
            </View>
            
            <View style={styles.priceCard}>
              <Text style={styles.planLabel}>{KoreanStrings.vip.yearly}</Text>
              <Text style={styles.planPrice}>{KoreanStrings.vip.yearlyPrice}</Text>
              <Text style={styles.planDuration}>{KoreanStrings.vip.yearlyDuration}</Text>
              <Text style={styles.planSavings}>{KoreanStrings.vip.yearlySavings}</Text>
            </View>
          </View>
        </View>

        {/* Benefits Test Section */}
        <View style={styles.section}>
          <Text style={GlobalStyles.koreanHeading}>3. 혜택 설명 테스트</Text>
          
          <View style={styles.benefitsTest}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>💎</Text>
              <Text style={GlobalStyles.koreanBody}>
                {KoreanStrings.vip.benefits.diamonds}
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🚀</Text>
              <Text style={GlobalStyles.koreanBody}>
                {KoreanStrings.vip.benefits.models}
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🧠</Text>
              <Text style={GlobalStyles.koreanBody}>
                {KoreanStrings.vip.benefits.memory}
              </Text>
            </View>
          </View>
        </View>

        {/* Message Tests */}
        <View style={styles.section}>
          <Text style={GlobalStyles.koreanHeading}>4. 메시지 테스트</Text>
          
          <View style={styles.messageTests}>
            <TouchableOpacity 
              style={[styles.testButton, { backgroundColor: '#4CAF50' }]}
              onPress={testSuccessMessages}
            >
              <Text style={styles.testButtonText}>성공 메시지 보기</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.testButton, { backgroundColor: '#FF4444' }]}
              onPress={testErrorMessages}
            >
              <Text style={styles.testButtonText}>오류 메시지 보기</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.testButton, { backgroundColor: Colors.primary }]}
              onPress={testCurrencyFormatting}
            >
              <Text style={styles.testButtonText}>가격 형식 보기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Error/Success Display Test */}
        <View style={styles.section}>
          <Text style={GlobalStyles.koreanHeading}>5. 상태 메시지 표시 테스트</Text>
          
          <View style={styles.statusTests}>
            <View style={styles.statusItem}>
              <Text style={GlobalStyles.koreanSuccessText}>
                {KoreanStrings.messages.success.subscriptionComplete}
              </Text>
            </View>
            
            <View style={styles.statusItem}>
              <Text style={GlobalStyles.koreanErrorText}>
                {KoreanStrings.messages.error.paymentFailed}
              </Text>
            </View>
            
            <View style={styles.statusItem}>
              <Text style={GlobalStyles.koreanWarningText}>
                {KoreanStrings.messages.error.tryAgain}
              </Text>
            </View>
          </View>
        </View>

        {/* Cultural Adaptation Test */}
        <View style={styles.section}>
          <Text style={GlobalStyles.koreanHeading}>6. 문화적 적응 테스트</Text>
          
          <View style={styles.culturalTest}>
            <Text style={GlobalStyles.koreanBody}>
              • 정중한 존댓말 사용: "구독해주시기 바랍니다" (X) → "구독하기" (O)
            </Text>
            <Text style={GlobalStyles.koreanBody}>
              • 적절한 경어 사용: "{KoreanStrings.help.contactText}"
            </Text>
            <Text style={GlobalStyles.koreanBody}>
              • 원화 표시 형식: {KoreanUtils.formatCurrency(22000)}
            </Text>
            <Text style={GlobalStyles.koreanBody}>
              • 한국식 할인 표현: {KoreanUtils.formatSavings(75)}
            </Text>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  typographyTest: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  pricingTest: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  priceCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.vipGold + '40',
  },
  planLabel: {
    ...KOREAN_TYPOGRAPHY.koreanCaption,
    color: Colors.vipGold,
    fontWeight: '600',
    marginBottom: 4,
  },
  planPrice: {
    ...KOREAN_TYPOGRAPHY.koreanHeading,
    color: Colors.text,
    fontWeight: '700',
    marginBottom: 4,
  },
  planDuration: {
    ...KOREAN_TYPOGRAPHY.koreanCaption,
    color: Colors.textSecondary,
  },
  planSavings: {
    ...KOREAN_TYPOGRAPHY.koreanCaption,
    color: Colors.vipGold,
    fontWeight: '600',
    marginTop: 4,
  },
  benefitsTest: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  benefitIcon: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  messageTests: {
    marginTop: 12,
    gap: 12,
  },
  testButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  testButtonText: {
    ...KOREAN_TYPOGRAPHY.koreanButton,
    color: '#FFFFFF',
  },
  statusTests: {
    marginTop: 12,
    gap: 12,
  },
  statusItem: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  culturalTest: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    gap: 8,
  },
  bottomPadding: {
    height: 40,
  },
});

export default KoreanLocalizationTest;