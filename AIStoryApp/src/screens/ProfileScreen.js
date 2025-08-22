import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { GlobalStyles } from '../styles/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Created');
  const [selectedContent, setSelectedContent] = useState('Saylor');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const createModalAnimation = useRef(new Animated.Value(0)).current;
  
  const profileStats = [
    { icon: 'wallet-outline', label: 'Wallet', color: '#E91E63' },
    { icon: 'crown-outline', label: 'Saylo Pro', color: '#FFC107' },
    { icon: 'create-outline', label: 'Creator', color: '#4CAF50' },
    { icon: 'star-outline', label: 'Treasure', color: '#2196F3' },
  ];

  const tabs = ['Created', 'My likes', 'Moment'];
  const contentTypes = ['Saylor', 'Video'];
  
  useEffect(() => {
    if (showCreateModal) {
      Animated.timing(createModalAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(createModalAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showCreateModal, createModalAnimation]);

  return (
    <SafeAreaView style={GlobalStyles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => {
              // Future: Implement mail functionality
            }}
          >
            <Ionicons name="mail-outline" size={22} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('NewComments')}
          >
            <Ionicons name="game-controller-outline" size={22} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={22} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImagePlaceholder}>
              <View style={styles.profilePlaceholderIcon}>
                <View style={styles.iconShape1} />
                <View style={styles.iconShape2} />
              </View>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('MyProfile')}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>User4ffe</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Lv1</Text>
          </View>
        </View>
        <Text style={styles.userId}>UserID: 386029808</Text>
        
        <TouchableOpacity onPress={() => navigation.navigate('EditBio')}>
          <Text style={styles.bioText}>My bio is still on its way~</Text>
        </TouchableOpacity>
        
        {/* User Stats */}
        <View style={styles.userStats}>
          <View style={styles.statColumn}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel2}>Following</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel2}>Followers</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel2}>Chatters</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel2}>Likes</Text>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <TouchableOpacity 
          style={styles.statItem}
          onPress={() => navigation.navigate('Wallet')}
        >
          <View style={[styles.statIcon, { backgroundColor: '#E91E63' }]}>
            <Ionicons name="wallet" size={20} color={Colors.text} />
          </View>
          <Text style={styles.statLabel}>Wallet</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.statItem}
          onPress={() => navigation.navigate('VIP')}
        >
          <View style={[styles.statIcon, { backgroundColor: '#FFC107' }]}>
            <Ionicons name="star" size={20} color={Colors.background} />
          </View>
          <Text style={styles.statLabel}>Saylo Pro</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.statItem}
          onPress={() => navigation.navigate('CreatorCenter')}
        >
          <View style={[styles.statIcon, { backgroundColor: '#4CAF50' }]}>
            <Ionicons name="create" size={20} color={Colors.text} />
          </View>
          <Text style={styles.statLabel}>Creator</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.statItem}
          onPress={() => navigation.navigate('Treasure')}
        >
          <View style={[styles.statIcon, { backgroundColor: '#2196F3' }]}>
            <Ionicons name="star" size={20} color={Colors.text} />
          </View>
          <Text style={styles.statLabel}>Treasure</Text>
        </TouchableOpacity>
      </View>

      {/* VIP Banner */}
      <TouchableOpacity style={styles.vipBanner} onPress={() => navigation.navigate('VIP')}>
        <LinearGradient
          colors={['#C4A574', '#B8906A', '#9A7852']}
          style={styles.vipGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.vipContent}>
            <View>
              <Text style={styles.vipTitle}>JOIN VIP</Text>
              <Text style={styles.vipSubtitle}>Enjoy multiple benefits ○</Text>
            </View>
            <View style={styles.vipIconContainer}>
              <Text style={styles.vipIcon}>👑</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Content Tabs */}
      <View style={styles.tabSection}>
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.tabActive]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.allButton}>
            <Text style={styles.allButtonText}>All</Text>
            <Ionicons name="chevron-down" size={14} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Content Type Selector */}
        <View style={styles.contentTypeContainer}>
          {contentTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.contentTypeButton,
                selectedContent === type && styles.contentTypeButtonActive
              ]}
              onPress={() => setSelectedContent(type)}
            >
              <Text style={[
                styles.contentTypeText,
                selectedContent === type && styles.contentTypeTextActive
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <View style={styles.emptyIconShape1} />
            <View style={styles.emptyIconShape2} />
          </View>
          <Text style={styles.emptyTitle}>No Saylor</Text>
          <Text style={styles.emptyText}>Login to experience more</Text>
          
          <TouchableOpacity 
            style={styles.loginButtonLarge}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonLargeText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Create Saylor Modal */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="none"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setShowCreateModal(false)}
        >
          <Animated.View 
            style={[
              styles.createModalContainer,
              {
                transform: [{
                  translateY: createModalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0]
                  })
                }],
                opacity: createModalAnimation
              }
            ]}
          >
            <TouchableOpacity activeOpacity={1}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Create a Saylor</Text>
                <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                  <Ionicons name="close" size={24} color={Colors.text} />
                </TouchableOpacity>
              </View>
              
              {/* Create Options */}
              <TouchableOpacity style={styles.createOption} onPress={() => {
                setShowCreateModal(false);
                navigation.navigate('CreateSaylor');
              }}>
                <View style={styles.createOptionIcon}>
                  <MaterialCommunityIcons name="star-four-points" size={24} color="#FFB74D" />
                </View>
                <View style={styles.createOptionContent}>
                  <Text style={styles.createOptionTitle}>Create a Saylor</Text>
                  <Text style={styles.createOptionDescription}>Create your own AI Character</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.createOption}>
                <View style={styles.createOptionIcon}>
                  <Ionicons name="videocam" size={24} color="#FFB74D" />
                </View>
                <View style={styles.createOptionContent}>
                  <Text style={styles.createOptionTitle}>Create video</Text>
                  <Text style={styles.createOptionDescription}>Create a wonderful video for your Saylor</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.createOption}>
                <View style={styles.createOptionIcon}>
                  <MaterialCommunityIcons name="cube-outline" size={24} color="#FFB74D" />
                </View>
                <View style={styles.createOptionContent}>
                  <View style={styles.createOptionTitleRow}>
                    <Text style={styles.createOptionTitle}>Customize model</Text>
                    <View style={styles.crownBadge}>
                      <Text style={styles.crownEmoji}>👑</Text>
                    </View>
                  </View>
                  <Text style={styles.createOptionDescription}>Customize the reply style of the basic model</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
              
              <Text style={styles.moreModesText}>More modes are coming soon</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 12,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  profileImageContainer: {
    marginBottom: 0,
  },
  profileImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3A3A4A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePlaceholderIcon: {
    width: 35,
    height: 35,
    position: 'relative',
  },
  iconShape1: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#5A5A6A',
    top: 0,
    left: 10,
  },
  iconShape2: {
    position: 'absolute',
    width: 25,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#5A5A6A',
    bottom: 0,
    left: 5,
  },
  editButton: {
    position: 'absolute',
    right: 0,
    top: 5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.surface,
    borderRadius: 12,
  },
  editButtonText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 8,
  },
  levelBadge: {
    backgroundColor: '#4A4A5A',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  levelText: {
    fontSize: 11,
    color: Colors.text,
    fontWeight: '500',
  },
  userId: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  bioText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    width: '100%',
  },
  statColumn: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  statLabel2: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.text,
  },
  vipBanner: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  vipGradient: {
    padding: 16,
  },
  vipContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vipTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  vipSubtitle: {
    fontSize: 12,
    color: '#333',
  },
  vipIconContainer: {
    position: 'relative',
  },
  vipIcon: {
    fontSize: 40,
  },
  tabSection: {
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 12,
  },
  tab: {
    marginRight: 20,
    paddingBottom: 10,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.text,
  },
  tabText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.text,
    fontWeight: '500',
  },
  allButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingBottom: 10,
  },
  allButtonText: {
    fontSize: 14,
    color: Colors.text,
    marginRight: 2,
  },
  contentTypeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  contentTypeButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
    borderRadius: 16,
    backgroundColor: Colors.surface,
  },
  contentTypeButtonActive: {
    backgroundColor: '#FFB74D',
  },
  contentTypeText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  contentTypeTextActive: {
    color: '#000',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3A3A4A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  emptyIconShape1: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#5A5A6A',
    top: 20,
    left: 35,
  },
  emptyIconShape2: {
    position: 'absolute',
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#5A5A6A',
    bottom: 25,
    left: 25,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  loginButtonLarge: {
    paddingVertical: 10,
    paddingHorizontal: 44,
    borderRadius: 20,
    backgroundColor: '#FFB74D',
  },
  loginButtonLargeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  createModalContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.surfaceLight,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  createOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  createOptionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 183, 77, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  createOptionContent: {
    flex: 1,
  },
  createOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 2,
  },
  createOptionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crownBadge: {
    marginLeft: 8,
  },
  crownEmoji: {
    fontSize: 14,
  },
  createOptionDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  moreModesText: {
    textAlign: 'center',
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 20,
  },
});

export default ProfileScreen;