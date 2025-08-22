import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

const SettingsScreen = ({ navigation }) => {
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [redeemCode, setRedeemCode] = useState('');
  const slideAnim = useRef(new Animated.Value(300)).current;
  
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const settingsOptions = [
    {
      id: 'feedback',
      title: 'Feedback',
      icon: 'create-outline',
      iconColor: Colors.text,
      onPress: () => navigation.navigate('Feedback'),
    },
    {
      id: 'about',
      title: 'About Saylo',
      icon: 'information-circle-outline',
      iconColor: Colors.text,
      onPress: () => navigation.navigate('AboutSaylo'),
    },
    {
      id: 'blacklist',
      title: 'BlackList',
      icon: 'person-remove-outline',
      iconColor: Colors.text,
      onPress: () => navigation.navigate('BlackList'),
    },
    {
      id: 'security',
      title: 'Account Security',
      icon: 'shield-outline',
      iconColor: Colors.text,
      onPress: () => navigation.navigate('AccountSecurity'),
    },
    {
      id: 'language',
      title: 'Switch Language',
      icon: 'language-outline',
      iconColor: Colors.text,
      onPress: () => navigation.navigate('SwitchLanguage'),
    },
    {
      id: 'redeem',
      title: 'Redeem rewards',
      icon: 'gift-outline',
      iconColor: Colors.text,
      onPress: () => setShowRedeemModal(true),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.ScrollView 
        style={[{ flex: 1, transform: [{ translateX: slideAnim }] }]}
        showsVerticalScrollIndicator={false}
      >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Settings Options */}
      <View style={styles.optionsContainer}>
        {settingsOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionRow}
            onPress={option.onPress}
          >
            <View style={styles.optionLeft}>
              <Ionicons name={option.icon} size={20} color={option.iconColor} />
              <Text style={styles.optionText}>{option.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out Button */}
      <View style={styles.signOutContainer}>
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </View>

      {/* Redeem Rewards Modal */}
      <Modal
        visible={showRedeemModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRedeemModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Redeem rewards</Text>
              <TouchableOpacity onPress={() => setShowRedeemModal(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtext}>
              Please enter the redemption code.
            </Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={redeemCode}
                onChangeText={setRedeemCode}
                placeholder=""
                placeholderTextColor={Colors.textSecondary}
              />
              <TouchableOpacity style={styles.pasteButton}>
                <Text style={styles.pasteText}>Paste</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.confirmButton, 
                redeemCode.length > 0 && styles.confirmButtonEnabled
              ]}
              disabled={redeemCode.length === 0}
              onPress={() => {
                if (redeemCode.length > 0) {
                  // Simulate redeem process
                  setShowRedeemModal(false);
                  setRedeemCode('');
                }
              }}
            >
              <Text style={[
                styles.confirmButtonText,
                redeemCode.length > 0 && styles.confirmButtonTextEnabled
              ]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </Animated.ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 45 : 25,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.surfaceLight,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 15,
    color: Colors.text,
    marginLeft: 12,
  },
  signOutContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  signOutButton: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderRadius: 25,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    width: '85%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  modalSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.text,
  },
  pasteButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  pasteText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  confirmButton: {
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    opacity: 0.5,
  },
  confirmButtonEnabled: {
    backgroundColor: Colors.primary,
    opacity: 1,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  confirmButtonTextEnabled: {
    color: '#000',
  },
});

export default SettingsScreen;