import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const VIPProfileModal = ({ visible, onClose, userData, selectedTab }) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
          toValue: screenHeight,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

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
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity 
                onPress={onClose}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={28} color={Colors.text} />
              </TouchableOpacity>
              
              <Text style={styles.title}>VIP Profile</Text>
              
              <View style={styles.placeholder} />
            </View>

            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* User Profile Section */}
              <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                  {userData?.avatar ? (
                    <Image source={{ uri: userData.avatar }} style={styles.avatar} />
                  ) : (
                    <LinearGradient
                      colors={selectedTab === 'VIP' 
                        ? ['#FFB74D', '#FF9800'] 
                        : ['#42A5F5', '#2196F3']
                      }
                      style={styles.avatarGradient}
                    >
                      <Text style={styles.avatarIcon}>👤</Text>
                    </LinearGradient>
                  )}
                </View>
                
                <Text style={styles.username}>{userData?.username || 'User4ffe'}</Text>
                <Text style={styles.membershipStatus}>
                  {userData?.isVIPActive ? 'VIP Active' : 'Not Activated'}
                </Text>
              </View>

              {/* Membership Info */}
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Current Plan</Text>
                <View style={styles.planCard}>
                  <View style={styles.planHeader}>
                    <Text style={styles.planName}>
                      {selectedTab === 'VIP' ? 'VIP Premium' : 'Ads-Free'}
                    </Text>
                    {!userData?.isVIPActive && (
                      <View style={styles.inactiveBadge}>
                        <Text style={styles.inactiveText}>INACTIVE</Text>
                      </View>
                    )}
                  </View>
                  
                  {userData?.isVIPActive ? (
                    <>
                      <Text style={styles.planPrice}>₩4,400/month</Text>
                      <Text style={styles.planExpiry}>Expires: Jan 15, 2025</Text>
                      <Text style={styles.planDays}>15 days remaining</Text>
                    </>
                  ) : (
                    <Text style={styles.planInactive}>
                      Subscribe to unlock all features
                    </Text>
                  )}
                </View>
              </View>

              {/* Usage Statistics */}
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Usage Statistics</Text>
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>125</Text>
                    <Text style={styles.statLabel}>Diamonds Used</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>42</Text>
                    <Text style={styles.statLabel}>Chats Created</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>89</Text>
                    <Text style={styles.statLabel}>Images Generated</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>5</Text>
                    <Text style={styles.statLabel}>Memory Slots</Text>
                  </View>
                </View>
              </View>

              {/* Benefits Section */}
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Your Benefits</Text>
                {selectedTab === 'VIP' ? (
                  <View style={styles.benefitsList}>
                    <View style={styles.benefitItem}>
                      <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                      <Text style={styles.benefitText}>40 diamonds daily</Text>
                    </View>
                    <View style={styles.benefitItem}>
                      <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                      <Text style={styles.benefitText}>Unlimited group chat</Text>
                    </View>
                    <View style={styles.benefitItem}>
                      <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                      <Text style={styles.benefitText}>Advanced AI models</Text>
                    </View>
                    <View style={styles.benefitItem}>
                      <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                      <Text style={styles.benefitText}>5 memory slots per role</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.benefitsList}>
                    <View style={styles.benefitItem}>
                      <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                      <Text style={styles.benefitText}>No advertisements</Text>
                    </View>
                    <View style={styles.benefitItem}>
                      <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                      <Text style={styles.benefitText}>Faster loading</Text>
                    </View>
                    <View style={styles.benefitItem}>
                      <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                      <Text style={styles.benefitText}>Clean interface</Text>
                    </View>
                  </View>
                )}
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                {userData?.isVIPActive ? (
                  <>
                    <TouchableOpacity style={styles.secondaryButton}>
                      <Text style={styles.secondaryButtonText}>Manage Subscription</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton}>
                      <Text style={styles.secondaryButtonText}>Cancel Subscription</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity style={styles.primaryButton}>
                    <LinearGradient
                      colors={selectedTab === 'VIP' 
                        ? ['#FFB74D', '#FF9800'] 
                        : ['#42A5F5', '#2196F3']
                      }
                      style={styles.buttonGradient}
                    >
                      <Text style={styles.primaryButtonText}>
                        Subscribe Now
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  content: {
    flex: 1,
    backgroundColor: '#1A1F3A',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A3654',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  scrollContent: {
    paddingBottom: 50,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  membershipStatus: {
    fontSize: 16,
    color: '#8B92A9',
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 20,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  inactiveBadge: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  inactiveText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  planPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFB74D',
    marginBottom: 8,
  },
  planExpiry: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  planDays: {
    fontSize: 14,
    color: '#4CAF50',
  },
  planInactive: {
    fontSize: 14,
    color: '#8B92A9',
    fontStyle: 'italic',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  statItem: {
    width: '47%',
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#42A5F5',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8B92A9',
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#252C4A',
    padding: 12,
    borderRadius: 8,
  },
  benefitText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  actionButtons: {
    paddingHorizontal: 20,
    gap: 12,
  },
  primaryButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#42A5F5',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#42A5F5',
  },
});

export default VIPProfileModal;