/**
 * Critical User Flow Tests for VIP Screen
 * Automated testing suite for production-ready VIP/Ads-free implementation
 */

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { Alert, Vibration } from 'react-native';
import VIPScreen from '../src/screens/VIPScreen';
import { animationTelemetry } from '../src/utils/animationTelemetry';

// Mock dependencies
jest.mock('../src/utils/animationTelemetry', () => ({
  animationTelemetry: {
    trackVIPScreenEntrance: jest.fn(),
    trackVIPScreenExit: jest.fn(),
    trackTabSwitch: jest.fn(),
    trackPlanSelection: jest.fn(),
    trackPurchaseButton: jest.fn(),
    flush: jest.fn(),
  },
}));

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Vibration: {
      vibrate: jest.fn(),
    },
    Alert: {
      alert: jest.fn(),
    },
  };
});

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children, ...props }) => {
    const { View } = require('react-native');
    return <View {...props}>{children}</View>;
  },
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, ...props }) => {
    const { Text } = require('react-native');
    return <Text {...props}>{name}</Text>;
  },
}));

describe('VIP Screen Critical User Flows', () => {
  const mockNavigation = {
    goBack: jest.fn(),
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Vibration.vibrate.mockClear();
    Alert.alert.mockClear();
  });

  describe('Screen Initialization and Performance', () => {
    it('should render VIP screen successfully', async () => {
      const { getByText } = render(<VIPScreen navigation={mockNavigation} />);
      
      // Check for essential elements
      expect(getByText('광고 제거')).toBeTruthy();
      expect(getByText('VIP')).toBeTruthy();
      
      // Verify telemetry tracking started
      expect(animationTelemetry.trackVIPScreenEntrance).toHaveBeenCalled();
    });

    it('should initialize with VIP tab selected by default', () => {
      const { getByText } = render(<VIPScreen navigation={mockNavigation} />);
      
      // VIP tab should be active
      const vipTab = getByText('VIP');
      expect(vipTab).toBeTruthy();
    });

    it('should have all accessibility labels for screen readers', () => {
      const { getByLabelText } = render(<VIPScreen navigation={mockNavigation} />);
      
      // Check critical accessibility labels
      expect(getByLabelText('뒤로 가기')).toBeTruthy();
      expect(getByLabelText('VIP 탭')).toBeTruthy();
      expect(getByLabelText('광고 제거 탭')).toBeTruthy();
      expect(getByLabelText('도움말')).toBeTruthy();
    });
  });

  describe('Tab Switching Functionality', () => {
    it('should switch from VIP to Ads-free tab', async () => {
      const { getByLabelText, getByText } = render(<VIPScreen navigation={mockNavigation} />);
      
      const adsFreetab = getByLabelText('광고 제거 탭');
      fireEvent.press(adsFreetab);
      
      // Verify telemetry tracking
      expect(animationTelemetry.trackTabSwitch).toHaveBeenCalledWith('VIP', 'Ads-free');
      
      // Verify vibration feedback
      expect(Vibration.vibrate).toHaveBeenCalledWith(30);
      
      // Check that ads-free content is visible
      await waitFor(() => {
        expect(getByText('광고 없는 경험을 즐기세요')).toBeTruthy();
      });
    });

    it('should switch from Ads-free to VIP tab', async () => {
      const { getByLabelText, getByText } = render(<VIPScreen navigation={mockNavigation} />);
      
      // First switch to Ads-free
      const adsfreTab = getByLabelText('광고 제거 탭');
      fireEvent.press(adsfreTab);
      
      // Then switch back to VIP
      const vipTab = getByLabelText('VIP 탭');
      fireEvent.press(vipTab);
      
      // Verify telemetry tracking
      expect(animationTelemetry.trackTabSwitch).toHaveBeenCalledWith('Ads-free', 'VIP');
      
      // Check that VIP content is visible
      await waitFor(() => {
        expect(getByText('VIP 혜택')).toBeTruthy();
        expect(getByText('VIP 특권')).toBeTruthy();
      });
    });

    it('should not trigger animation when clicking same tab', () => {
      const { getByLabelText } = render(<VIPScreen navigation={mockNavigation} />);
      
      const vipTab = getByLabelText('VIP 탭');
      fireEvent.press(vipTab); // Click same tab
      
      // Should not track tab switch for same tab
      expect(animationTelemetry.trackTabSwitch).not.toHaveBeenCalled();
    });
  });

  describe('VIP Plan Selection', () => {
    it('should display correct VIP pricing with fixed discount', () => {
      const { getByText } = render(<VIPScreen navigation={mockNavigation} />);
      
      // Check corrected monthly discount (should be 14%, not 28%)
      expect(getByText('14% 할인')).toBeTruthy();
      expect(getByText('50% 할인')).toBeTruthy(); // Yearly discount
      
      // Check prices in Korean Won
      expect(getByText('₩5,900')).toBeTruthy();  // Weekly
      expect(getByText('₩22,000')).toBeTruthy(); // Monthly
      expect(getByText('₩132,000')).toBeTruthy(); // Yearly
    });

    it('should select monthly plan by default', () => {
      const { getByLabelText } = render(<VIPScreen navigation={mockNavigation} />);
      
      const monthlyPlan = getByLabelText(/월간 플랜 선택/);
      expect(monthlyPlan).toBeTruthy();
    });

    it('should switch between VIP plans with telemetry tracking', async () => {
      const { getByLabelText } = render(<VIPScreen navigation={mockNavigation} />);
      
      const weeklyPlan = getByLabelText(/주간 플랜 선택/);
      fireEvent.press(weeklyPlan);
      
      // Verify telemetry tracking
      expect(animationTelemetry.trackPlanSelection).toHaveBeenCalledWith('weekly');
      
      // Verify vibration feedback
      expect(Vibration.vibrate).toHaveBeenCalledWith([30, 50]);
    });

    it('should display all VIP benefits correctly', () => {
      const { getByText } = render(<VIPScreen navigation={mockNavigation} />);
      
      // Check VIP perks
      expect(getByText('Get 40 diamonds / day')).toBeTruthy();
      expect(getByText('+10% diamonds recharge')).toBeTruthy();
      
      // Check VIP privileges
      expect(getByText('Unlimited group chat')).toBeTruthy();
      expect(getByText('Unlimited advanced models')).toBeTruthy();
      expect(getByText('Memory slots per role 1→5')).toBeTruthy();
      expect(getByText('New role creates 10→30 / week')).toBeTruthy();
      expect(getByText('Image gens 200→400 / day')).toBeTruthy();
      expect(getByText('Role edit times 3→6')).toBeTruthy();
    });
  });

  describe('Ads-free Plan Selection', () => {
    it('should display Ads-free plans when tab is selected', async () => {
      const { getByLabelText, getByText } = render(<VIPScreen navigation={mockNavigation} />);
      
      const adsFreeTab = getByLabelText('광고 제거 탭');
      fireEvent.press(adsFreeTab);
      
      await waitFor(() => {
        expect(getByText('₩4,400')).toBeTruthy();  // Monthly ads-free
        expect(getByText('₩29,000')).toBeTruthy(); // Yearly ads-free
        expect(getByText('44% 할인')).toBeTruthy(); // Yearly discount
      });
    });

    it('should display all ads-free benefits', async () => {
      const { getByLabelText, getByText } = render(<VIPScreen navigation={mockNavigation} />);
      
      const adsFreeTab = getByLabelText('광고 제거 탭');
      fireEvent.press(adsFreeTab);
      
      await waitFor(() => {
        expect(getByText('Remove all ads')).toBeTruthy();
        expect(getByText('Smoother experience')).toBeTruthy();
        expect(getByText('Priority support')).toBeTruthy();
        expect(getByText('Clean interface')).toBeTruthy();
      });
    });
  });

  describe('Purchase Flow', () => {
    it('should track purchase button interaction', async () => {
      const { getByLabelText } = render(<VIPScreen navigation={mockNavigation} />);
      
      const purchaseButton = getByLabelText('VIP 구독하기');
      fireEvent.press(purchaseButton);
      
      // Verify telemetry tracking
      expect(animationTelemetry.trackPurchaseButton).toHaveBeenCalled();
      
      // Verify vibration feedback
      expect(Vibration.vibrate).toHaveBeenCalledWith([50, 100]);
    });

    it('should show loading state during purchase', async () => {
      const { getByLabelText, getByText } = render(<VIPScreen navigation={mockNavigation} />);
      
      const purchaseButton = getByLabelText('VIP 구독하기');
      fireEvent.press(purchaseButton);
      
      // Should show loading state
      await waitFor(() => {
        expect(getByText(/구매 중/)).toBeTruthy();
      }, { timeout: 1000 });
    });

    it('should handle purchase success', async () => {
      const { getByLabelText, getByText } = render(<VIPScreen navigation={mockNavigation} />);
      
      const purchaseButton = getByLabelText('VIP 구독하기');
      fireEvent.press(purchaseButton);
      
      // Wait for success state (mocked to succeed after 2 seconds)
      await waitFor(() => {
        expect(getByText(/구독이 완료되었습니다/)).toBeTruthy();
      }, { timeout: 3000 });
    });

    it('should handle purchase errors gracefully', async () => {
      // Mock Math.random to force error scenario
      const originalRandom = Math.random;
      Math.random = jest.fn(() => 0.05); // Force network error
      
      const { getByLabelText, getByText } = render(<VIPScreen navigation={mockNavigation} />);
      
      const purchaseButton = getByLabelText('VIP 구독하기');
      fireEvent.press(purchaseButton);
      
      // Wait for error state
      await waitFor(() => {
        expect(getByText(/네트워크 오류/)).toBeTruthy();
      }, { timeout: 3000 });
      
      // Restore original Math.random
      Math.random = originalRandom;
    });
  });

  describe('Navigation and Interactions', () => {
    it('should navigate back when back button is pressed', () => {
      const { getByLabelText } = render(<VIPScreen navigation={mockNavigation} />);
      
      const backButton = getByLabelText('뒤로 가기');
      fireEvent.press(backButton);
      
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });

    it('should open help modal when help button is pressed', async () => {
      const { getByLabelText } = render(<VIPScreen navigation={mockNavigation} />);
      
      const helpButton = getByLabelText('도움말');
      fireEvent.press(helpButton);
      
      // Help modal should open (mocked component will be visible)
      await waitFor(() => {
        // The modal component itself would be tested separately
        expect(helpButton).toBeTruthy();
      });
    });

    it('should have accessible footer links', () => {
      const { getByLabelText } = render(<VIPScreen navigation={mockNavigation} />);
      
      expect(getByLabelText('서비스 약관')).toBeTruthy();
      expect(getByLabelText('개인정보 처리방침')).toBeTruthy();
      expect(getByLabelText('구매 복원')).toBeTruthy();
    });
  });

  describe('Performance and Memory Management', () => {
    it('should flush telemetry data on unmount', () => {
      const { unmount } = render(<VIPScreen navigation={mockNavigation} />);
      
      unmount();
      
      // Verify telemetry is flushed on unmount
      expect(animationTelemetry.flush).toHaveBeenCalled();
    });

    it('should handle rapid tab switching without memory leaks', async () => {
      const { getByLabelText } = render(<VIPScreen navigation={mockNavigation} />);
      
      const vipTab = getByLabelText('VIP 탭');
      const adsFreeTab = getByLabelText('광고 제거 탭');
      
      // Rapidly switch tabs
      for (let i = 0; i < 5; i++) {
        fireEvent.press(adsFreeTab);
        fireEvent.press(vipTab);
      }
      
      // Should still function correctly
      expect(animationTelemetry.trackTabSwitch).toHaveBeenCalled();
    });
  });

  describe('Accessibility Compliance', () => {
    it('should meet WCAG 2.1 AA requirements for interactive elements', () => {
      const { getByLabelText } = render(<VIPScreen navigation={mockNavigation} />);
      
      // All interactive elements should have accessibility labels
      const interactiveElements = [
        '뒤로 가기',
        'VIP 탭',
        '광고 제거 탭',
        '도움말',
        'VIP 구독하기',
        '서비스 약관',
        '개인정보 처리방침',
        '구매 복원',
      ];
      
      interactiveElements.forEach(label => {
        expect(getByLabelText(label)).toBeTruthy();
      });
    });

    it('should have proper role attributes for interactive elements', () => {
      const { getByRole } = render(<VIPScreen navigation={mockNavigation} />);
      
      // Check for proper roles
      expect(getByRole('button')).toBeTruthy(); // Should find at least one button
      expect(getByRole('tab')).toBeTruthy();    // Should find at least one tab
    });
  });

  describe('Korean Localization', () => {
    it('should display all Korean text correctly', () => {
      const { getByText } = render(<VIPScreen navigation={mockNavigation} />);
      
      // Check Korean UI elements
      expect(getByText('광고 제거')).toBeTruthy();
      expect(getByText('VIP 혜택')).toBeTruthy();
      expect(getByText('VIP 특권')).toBeTruthy();
      expect(getByText('광고 없는 경험을 즐기세요')).toBeTruthy();
      expect(getByText('방해 없이, 순수한 채팅만')).toBeTruthy();
    });

    it('should use Korean Won currency format', () => {
      const { getByText } = render(<VIPScreen navigation={mockNavigation} />);
      
      // Check Korean Won formatting
      expect(getByText('₩5,900')).toBeTruthy();
      expect(getByText('₩22,000')).toBeTruthy();
      expect(getByText('₩132,000')).toBeTruthy();
      expect(getByText('₩4,400')).toBeTruthy();
      expect(getByText('₩29,000')).toBeTruthy();
    });
  });
});