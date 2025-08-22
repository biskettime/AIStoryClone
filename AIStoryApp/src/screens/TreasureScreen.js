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

const TreasureScreen = ({ navigation }) => {
  // Animation values
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  
  // Treasure categories with exact colors from screen5
  const treasureCategories = [
    {
      id: 'gift-diary',
      title: 'Gift diary',
      description: 'Treasure the beautiful memories related to gifts between you.',
      color: '#FF7A45', // Orange
      icon: '🎁',
      iconBg: '#FF9A65',
    },
    {
      id: 'bg-video',
      title: 'BG Video',
      description: 'Store all the video information you have.',
      color: '#5DCED0', // Cyan
      icon: '▶️',
      iconBg: '#7DD8DA',
    },
    {
      id: 'plot-video',
      title: 'Plot Video',
      description: 'Store all your plot videos',
      color: '#FF69B4', // Pink
      icon: '🎬',
      iconBg: '#FF89C4',
    },
    {
      id: 'plot-image',
      title: 'Plot Image',
      description: 'Treasure the exclusive images drawn from your conversation moments.',
      color: '#9B59B6', // Purple
      icon: '🖼️',
      iconBg: '#AB69C6',
    },
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
  
  const handleCategoryPress = (category) => {
    // Navigate to specific treasure category
    console.log('Opening category:', category.id);
    // In real app, would navigate to category detail screen
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color={Colors.text} />
          </TouchableOpacity>
          
          <Text style={styles.title}>Treasure</Text>
          
          <View style={styles.placeholder} />
        </View>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Treasure Grid */}
          <View style={styles.treasureGrid}>
            {treasureCategories.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                style={styles.treasureCard}
                onPress={() => handleCategoryPress(category)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[category.color, category.color]}
                  style={styles.cardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{category.title}</Text>
                    <Text style={styles.cardDescription}>
                      {category.description}
                    </Text>
                    
                    {/* Icon Container */}
                    <View style={[styles.iconContainer, { backgroundColor: category.iconBg + '40' }]}>
                      <Text style={styles.iconEmoji}>{category.icon}</Text>
                    </View>
                    
                    {/* Arrow */}
                    <View style={styles.arrowContainer}>
                      <Ionicons name="chevron-forward" size={20} color="rgba(0,0,0,0.3)" />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
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
    backgroundColor: '#0D0D14',
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 16,
  },
  treasureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  treasureCard: {
    width: (screenWidth - 48) / 2,
    height: (screenWidth - 48) / 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardGradient: {
    flex: 1,
    padding: 16,
  },
  cardContent: {
    flex: 1,
    position: 'relative',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.7)',
    lineHeight: 18,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 24,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default TreasureScreen;