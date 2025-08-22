import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../styles/colors';

const { width: screenWidth } = Dimensions.get('window');

const WalletScreen = ({ navigation }) => {
  const [selectedPackage, setSelectedPackage] = useState(2);
  
  // Animation values
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  
  const diamondPackages = [
    { id: 1, amount: 100, bonus: 0, price: '₩1,100', hasDouble: true },
    { id: 2, amount: 500, bonus: 50, price: '₩5,500', hasDouble: true, popular: true },
    { id: 3, amount: 1000, bonus: 100, price: '₩11,000', hasDouble: true },
    { id: 4, amount: 2000, bonus: 300, price: '₩22,000', hasDouble: false },
    { id: 5, amount: 5000, bonus: 1000, price: '₩55,000', hasDouble: false, bestValue: true },
    { id: 6, amount: 10000, bonus: 3000, price: '₩99,000', hasDouble: false },
  ];

  const useCases = [
    { icon: 'chatbubbles', title: 'Chat with AI', color: '#42A5F5' },
    { icon: 'image', title: 'Generate Images', color: '#66BB6A' },
    { icon: 'videocam', title: 'Create Videos', color: '#AB47BC' },
    { icon: 'lock-open', title: 'Unlock Features', color: '#FFB74D' },
  ];
  
  const transactionHistory = [
    { id: 1, type: 'purchase', amount: 500, date: 'Today', time: '14:23' },
    { id: 2, type: 'spent', amount: -40, date: 'Today', time: '10:15', description: 'Chat with Saylor' },
    { id: 3, type: 'bonus', amount: 40, date: 'Yesterday', time: '00:00', description: 'Daily VIP Bonus' },
    { id: 4, type: 'spent', amount: -20, date: 'Yesterday', time: '18:30', description: 'Image Generation' },
  ];
  
  // Initialize animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  const handlePurchase = (packageId) => {
    setSelectedPackage(packageId);
    // In real app, would trigger payment flow
    console.log('Purchasing package:', packageId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeInAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        {/* Header - Outside ScrollView */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Wallet</Text>
          <TouchableOpacity onPress={() => console.log('Details pressed')}>
            <Text style={styles.detailsText}>Details</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Diamond Balance Card - Simple and Centered */}
          <View style={styles.balanceCardContainer}>
            <View style={styles.balanceCard}>
              <Text style={styles.diamondIcon}>💎</Text>
              <Text style={styles.balance}>100</Text>
            </View>
          </View>

          {/* VIP Promotion Banner */}
          <TouchableOpacity 
            style={styles.vipBanner}
            onPress={() => navigation.navigate('VIP')}
          >
            <LinearGradient
              colors={['#FFD700', '#FFB74D']}
              style={styles.vipGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.vipContent}>
                <Text style={styles.vipIcon}>👑</Text>
                <View style={styles.vipTextContent}>
                  <Text style={styles.vipTitle}>VIP Members Get More!</Text>
                  <Text style={styles.vipSubtitle}>+10% bonus on all purchases</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#1A1F3A" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Buy Diamonds Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Buy Diamonds</Text>
            <View style={styles.packagesGrid}>
              {diamondPackages.map((pkg) => (
                <TouchableOpacity 
                  key={pkg.id} 
                  style={[
                    styles.packageCard,
                    selectedPackage === pkg.id && styles.packageCardSelected,
                    pkg.popular && styles.packageCardPopular,
                  ]}
                  onPress={() => handlePurchase(pkg.id)}
                >
                  {pkg.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularBadgeText}>POPULAR</Text>
                    </View>
                  )}
                  {pkg.bestValue && (
                    <View style={styles.bestValueBadge}>
                      <Text style={styles.bestValueBadgeText}>BEST VALUE</Text>
                    </View>
                  )}
                  {pkg.hasDouble && (
                    <View style={styles.doubleBadge}>
                      <Text style={styles.doubleBadgeText}>×2</Text>
                    </View>
                  )}
                  
                  <Text style={styles.packageDiamond}>💎</Text>
                  <Text style={styles.packageAmount}>{pkg.amount.toLocaleString()}</Text>
                  {pkg.bonus > 0 && (
                    <Text style={styles.packageBonus}>+{pkg.bonus}</Text>
                  )}
                  <View style={styles.packagePriceContainer}>
                    <Text style={styles.packagePrice}>{pkg.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity style={styles.purchaseButton}>
              <LinearGradient
                colors={['#42A5F5', '#2196F3']}
                style={styles.purchaseGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.purchaseButtonText}>Purchase Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Use Cases */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What can you do with Diamonds?</Text>
            <View style={styles.useCaseGrid}>
              {useCases.map((useCase, index) => (
                <View key={index} style={styles.useCaseCard}>
                  <View style={[styles.useCaseIcon, { backgroundColor: useCase.color + '20' }]}>
                    <Ionicons name={useCase.icon} size={24} color={useCase.color} />
                  </View>
                  <Text style={styles.useCaseText}>{useCase.title}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Recent Transactions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {transactionHistory.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIcon,
                    { backgroundColor: transaction.type === 'spent' ? '#FF6B6B20' : '#4CAF5020' }
                  ]}>
                    <Ionicons 
                      name={transaction.type === 'spent' ? 'remove' : 'add'} 
                      size={16} 
                      color={transaction.type === 'spent' ? '#FF6B6B' : '#4CAF50'} 
                    />
                  </View>
                  <View>
                    <Text style={styles.transactionDescription}>
                      {transaction.description || (transaction.type === 'purchase' ? 'Diamond Purchase' : 'Bonus Received')}
                    </Text>
                    <Text style={styles.transactionDate}>{transaction.date} • {transaction.time}</Text>
                  </View>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount > 0 ? '#4CAF50' : '#FF6B6B' }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount} 💎
                </Text>
              </View>
            ))}
          </View>

          <View style={{ height: 50 }} />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1F3A',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  detailsText: {
    fontSize: 16,
    color: Colors.text,
  },
  balanceCardContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  balanceCard: {
    width: '100%',
    maxWidth: 280,
    alignSelf: 'center',
    backgroundColor: '#3A3A4E',
    padding: 24,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diamondIcon: {
    fontSize: 32,
    marginRight: 10,
  },
  balance: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFB74D',
  },
  vipBanner: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  vipGradient: {
    padding: 16,
  },
  vipContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  vipTextContent: {
    flex: 1,
  },
  vipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1F3A',
    marginBottom: 2,
  },
  vipSubtitle: {
    fontSize: 12,
    color: '#1A1F3A',
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
  },
  packagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  packageCard: {
    width: (screenWidth - 44) / 3,
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  packageCardSelected: {
    borderColor: '#42A5F5',
  },
  packageCardPopular: {
    borderColor: '#FFB74D',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#FFB74D',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  popularBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#1A1F3A',
  },
  bestValueBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  bestValueBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFF',
  },
  doubleBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B6B',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doubleBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  packageDiamond: {
    fontSize: 24,
    marginTop: 8,
    marginBottom: 4,
  },
  packageAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  packageBonus: {
    fontSize: 12,
    color: '#4CAF50',
    marginBottom: 8,
  },
  packagePriceContainer: {
    backgroundColor: '#1A1F3A',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  packagePrice: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },
  purchaseButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  purchaseGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  useCaseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  useCaseCard: {
    width: (screenWidth - 44) / 2,
    backgroundColor: '#252C4A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  useCaseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  useCaseText: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#252C4A',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDescription: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default WalletScreen;