import React, { memo, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const LoginScreen = memo(({ navigation }) => {
  // Memoize navigation handlers for performance
  const handleSkipPress = useCallback(() => {
    navigation.navigate('MainTabs');
  }, [navigation]);

  const handleEmailLogin = useCallback(() => {
    // Handle email login implementation
    console.log('Email login pressed');
  }, []);

  const handleGoogleLogin = useCallback(() => {
    // Handle Google login implementation
    console.log('Google login pressed');
  }, []);

  const handleAppleLogin = useCallback(() => {
    // Handle Apple login implementation
    console.log('Apple login pressed');
  }, []);

  // Memoize gradient colors to prevent recreation
  const gradientColors = useMemo(() => [Colors.primary, Colors.secondary], []);
  const gradientStart = useMemo(() => ({ x: 0, y: 0 }), []);
  const gradientEnd = useMemo(() => ({ x: 1, y: 1 }), []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* App Icon */}
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={gradientColors}
            style={styles.appIcon}
            start={gradientStart}
            end={gradientEnd}
          >
            <Text style={styles.appIconText}>S</Text>
          </LinearGradient>
        </View>

        {/* Login Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleEmailLogin}>
            <Ionicons name="mail-outline" size={24} color={Colors.background} />
            <Text style={styles.loginButtonText}>Log in via Mail / Phone</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.loginButton, styles.googleButton]} onPress={handleGoogleLogin}>
            <Image 
              source={{ uri: 'https://www.google.com/favicon.ico' }}
              style={styles.socialIcon}
            />
            <Text style={styles.loginButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.loginButton, styles.appleButton]} onPress={handleAppleLogin}>
            <Ionicons name="logo-apple" size={24} color={Colors.background} />
            <Text style={styles.loginButtonText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>You agree to Saylo's</Text>
          <View style={styles.termsLinks}>
            <TouchableOpacity>
              <Text style={styles.termsLink}>Terms of Service</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}> and </Text>
            <TouchableOpacity>
              <Text style={styles.termsLink}>Privacy policy</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Skip for now */}
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleSkipPress}
        >
          <Text style={styles.skipText}>Skip for now →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 80,
  },
  appIcon: {
    width: 120,
    height: 120,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIconText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: Colors.text,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.text,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 16,
  },
  googleButton: {
    backgroundColor: Colors.text,
  },
  appleButton: {
    backgroundColor: Colors.text,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
    marginLeft: 8,
  },
  termsContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  termsText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  termsLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsLink: {
    fontSize: 12,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
  skipButton: {
    position: 'absolute',
    bottom: 40,
  },
  skipText: {
    fontSize: 16,
    color: Colors.primary,
  },
});

export default LoginScreen;