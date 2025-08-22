import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../styles/colors';
import { GlobalStyles, SPACING, TYPOGRAPHY } from '../styles/globalStyles';

const CharacterCard = ({ character, width, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };
  const getBadgeColor = (category) => {
    switch(category) {
      case 'Dynamic':
        return Colors.badgeDynamic;
      case 'Anime':
        return Colors.badgeAnime;
      case 'Male':
        return Colors.badgeMale;
      case 'Female':
        return Colors.badgeFemale;
      default:
        return Colors.primary;
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity 
        style={[styles.container, { width }]} 
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
      <ImageBackground
        source={{ uri: character.image }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          {/* Badge */}
          {character.badge && (
            <View style={[styles.badge, { backgroundColor: getBadgeColor(character.category) }]}>
              <Text style={styles.badgeText}>{character.badge}</Text>
            </View>
          )}
          
          {/* View Count Badge */}
          {character.views && (
            <View style={styles.viewBadge}>
              <Text style={styles.viewText}>🔥 {character.views}</Text>
            </View>
          )}
          
          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {character.title}
            </Text>
            <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
              {character.description}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    borderRadius: SPACING.lg, // 24px for premium feel
    overflow: 'hidden',
    backgroundColor: Colors.cardBackground,
    ...GlobalStyles.shadow, // Enhanced shadow
  },
  imageBackground: {
    flex: 1,
  },
  image: {
    borderRadius: SPACING.lg,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: SPACING.md, // 16px following 8px grid
  },
  badge: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    paddingHorizontal: SPACING.sm + SPACING.xs, // 12px
    paddingVertical: SPACING.xs, // 4px
    borderRadius: SPACING.sm + SPACING.xs, // 12px
    ...GlobalStyles.shadowSmall,
  },
  badgeText: {
    ...TYPOGRAPHY.captionSmall,
    color: Colors.text,
    fontFamily: 'System',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  content: {
    marginTop: 'auto',
    gap: SPACING.xs, // 4px between title and description
  },
  title: {
    ...TYPOGRAPHY.h5, // 16px with proper line height
    color: Colors.text,
    fontFamily: 'System',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    letterSpacing: 0.2, // Improved readability
  },
  description: {
    ...TYPOGRAPHY.bodySmall, // 12px with proper line height
    color: Colors.textSecondary,
    fontFamily: 'System',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    opacity: 0.9, // Subtle transparency for hierarchy
  },
  viewBadge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: SPACING.sm, // 8px
    paddingVertical: SPACING.xs, // 4px
    borderRadius: SPACING.sm + SPACING.xs, // 12px
    ...GlobalStyles.shadowSmall,
  },
  viewText: {
    ...TYPOGRAPHY.captionSmall,
    color: Colors.text,
    fontFamily: 'System',
    fontWeight: '600',
  },
});

export default CharacterCard;