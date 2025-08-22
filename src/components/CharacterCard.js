import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../styles/colors';

const CharacterCard = ({ character, width, onPress }) => {
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
    <TouchableOpacity 
      style={[styles.container, { width }]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: character.image }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          {/* Badge */}
          {character.badge && (
            <View style={[styles.badge, { backgroundColor: getBadgeColor(character.category) }]}>
              <Text style={styles.badgeText}>{character.badge}</Text>
            </View>
          )}
          
          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>
              {character.title}
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              {character.description}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.cardBackground,
  },
  imageBackground: {
    flex: 1,
  },
  image: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: Colors.text,
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    marginTop: 'auto',
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
});

export default CharacterCard;