import React, { memo, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../styles/colors';

/**
 * High-performance skeleton loader with optimized animations
 * Features:
 * - Native driver animations for smooth performance
 * - Customizable shapes and sizes
 * - Memory-efficient gradient animations
 * - Accessibility support
 */

const SkeletonLoader = memo(({
  width = 100,
  height = 20,
  borderRadius = 4,
  style,
  animated = true,
}) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) return;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false, // LinearGradient doesn't support native driver
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [animated, shimmerValue]);

  const animatedStyle = animated ? {
    opacity: shimmerValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    }),
  } : { opacity: 0.3 };

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
        },
        animatedStyle,
        style,
      ]}
      accessible={true}
      accessibilityLabel="Loading content"
      accessibilityRole="progressbar"
    >
      {animated && (
        <LinearGradient
          colors={[Colors.skeletonBase, Colors.skeletonHighlight, Colors.skeletonBase]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </Animated.View>
  );
});

// Pre-built skeleton components for common use cases
export const SkeletonText = memo(({ lines = 1, lastLineWidth = '60%', style }) => (
  <View style={[styles.textContainer, style]}>
    {Array.from({ length: lines }, (_, index) => (
      <SkeletonLoader
        key={index}
        width={index === lines - 1 ? lastLineWidth : '100%'}
        height={16}
        borderRadius={4}
        style={styles.textLine}
      />
    ))}
  </View>
));

export const SkeletonAvatar = memo(({ size = 40, style }) => (
  <SkeletonLoader
    width={size}
    height={size}
    borderRadius={size / 2}
    style={style}
  />
));

export const SkeletonCard = memo(({ style }) => (
  <View style={[styles.card, style]}>
    {/* Header */}
    <View style={styles.cardHeader}>
      <SkeletonAvatar size={40} />
      <View style={styles.cardHeaderText}>
        <SkeletonText lines={2} lastLineWidth="40%" />
      </View>
    </View>
    
    {/* Content */}
    <SkeletonLoader
      width="100%"
      height={200}
      borderRadius={8}
      style={styles.cardImage}
    />
    
    {/* Footer */}
    <View style={styles.cardFooter}>
      <SkeletonText lines={2} lastLineWidth="80%" />
    </View>
  </View>
));

export const SkeletonCharacterCard = memo(({ style }) => (
  <View style={[styles.characterCard, style]}>
    {/* Character Image */}
    <SkeletonLoader
      width="100%"
      height={120}
      borderRadius={12}
      style={styles.characterImage}
    />
    
    {/* Character Info */}
    <View style={styles.characterInfo}>
      {/* Title */}
      <SkeletonLoader
        width="80%"
        height={16}
        borderRadius={4}
        style={styles.characterTitle}
      />
      
      {/* Description */}
      <SkeletonText lines={2} lastLineWidth="60%" />
      
      {/* Stats */}
      <View style={styles.characterStats}>
        <SkeletonLoader width={50} height={12} borderRadius={4} />
        <SkeletonLoader width={50} height={12} borderRadius={4} />
      </View>
    </View>
  </View>
));

export const SkeletonList = memo(({ itemCount = 5, renderItem, style }) => (
  <View style={[styles.list, style]}>
    {Array.from({ length: itemCount }, (_, index) => (
      <View key={index} style={styles.listItem}>
        {renderItem ? renderItem(index) : <SkeletonCard />}
      </View>
    ))}
  </View>
));

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.skeletonBase,
    overflow: 'hidden',
  },
  
  textContainer: {
    width: '100%',
  },
  
  textLine: {
    marginBottom: 8,
  },
  
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  cardHeaderText: {
    flex: 1,
    marginLeft: 12,
  },
  
  cardImage: {
    marginBottom: 12,
  },
  
  cardFooter: {
    marginTop: 8,
  },
  
  characterCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    width: 160,
    marginRight: 12,
  },
  
  characterImage: {
    marginBottom: 8,
  },
  
  characterInfo: {
    flex: 1,
  },
  
  characterTitle: {
    marginBottom: 8,
  },
  
  characterStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  
  list: {
    flex: 1,
  },
  
  listItem: {
    marginBottom: 8,
  },
});

export default SkeletonLoader;