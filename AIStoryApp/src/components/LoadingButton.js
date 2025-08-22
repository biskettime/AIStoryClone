import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../styles/colors';

const LoadingButton = ({
  title,
  onPress,
  loading = false,
  success = false,
  disabled = false,
  style,
  gradientColors = [Colors.primary, Colors.primaryDark],
  icon,
  hapticFeedback = true,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (success) {
      // Success animation
      Animated.sequence([
        Animated.timing(successAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(successAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [success]);

  useEffect(() => {
    // Disabled state animation
    Animated.timing(opacityAnim, {
      toValue: disabled ? 0.5 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [disabled]);

  const handlePress = () => {
    if (loading || disabled) return;

    // Press animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress?.();
  };

  const getButtonContent = () => {
    if (success) {
      return (
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: successAnim,
            },
          ]}
        >
          <Ionicons name="checkmark-circle" size={20} color="#000" />
          <Text style={styles.buttonText}>완료!</Text>
        </Animated.View>
      );
    }

    if (loading) {
      return (
        <View style={styles.contentContainer}>
          <ActivityIndicator size="small" color="#000" />
          <Text style={styles.buttonText}>처리 중...</Text>
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        {icon && <Ionicons name={icon} size={18} color="#000" />}
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    );
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
        style,
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={loading || disabled}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{
          disabled: disabled || loading,
          busy: loading,
        }}
      >
        <LinearGradient
          colors={success ? ['#4CAF50', '#45a049'] : gradientColors}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {getButtonContent()}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default LoadingButton;