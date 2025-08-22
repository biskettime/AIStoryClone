import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQItem = ({ faq, isExpanded, onToggle, index }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Configure layout animation
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        springDamping: 0.8,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });

    // Animate chevron rotation
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const handlePress = () => {
    // Scale animation for press feedback
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onToggle(faq.id);
  };

  const chevronRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.questionContainer,
          isExpanded && styles.questionContainerExpanded,
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`FAQ: ${faq.question}`}
        accessibilityHint={isExpanded ? "탭하여 답변 숨기기" : "탭하여 답변 보기"}
        accessibilityState={{ expanded: isExpanded }}
      >
        <View style={styles.questionContent}>
          <View style={styles.questionHeader}>
            <View style={styles.questionNumber}>
              <Text style={styles.questionNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.questionText}>{faq.question}</Text>
          </View>
          
          <Animated.View
            style={[
              styles.chevronContainer,
              {
                transform: [{ rotate: chevronRotate }],
              },
            ]}
          >
            <Ionicons
              name="chevron-down"
              size={20}
              color={Colors.vipGold}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.answerContainer}>
          <View style={styles.answerDivider} />
          <Text style={styles.answerText} accessibilityRole="text">
            {faq.answer}
          </Text>
          
          {/* Helpful actions */}
          <View style={styles.answerActions}>
            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="이 답변이 도움이 되었나요?"
            >
              <Ionicons name="thumbs-up-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.actionText}>도움됨</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="더 자세한 도움이 필요하신가요?"
            >
              <Ionicons name="chatbubble-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.actionText}>문의하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
    shadowColor: Colors.vipGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionContainer: {
    padding: 18,
  },
  questionContainerExpanded: {
    backgroundColor: Colors.surfaceLight,
  },
  questionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  questionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.vipGold + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.vipGold + '40',
  },
  questionNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.vipGold,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    lineHeight: 20,
  },
  chevronContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.vipGold + '15',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.vipGold + '30',
  },
  answerContainer: {
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  answerDivider: {
    height: 1,
    backgroundColor: Colors.surfaceLight,
    marginBottom: 16,
  },
  answerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  answerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});

export default FAQItem;