import React, { memo, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../styles/colors';
import OptimizedModal from '../components/OptimizedModal';
import OptimizedButton from '../components/OptimizedButton';
import OptimizedImage from '../components/OptimizedImage';
import { getA11yProps, useVoiceOverAnnouncements } from '../utils/accessibility';
import { HapticManager } from '../utils/performance';

const { width, height } = Dimensions.get('window');

const CharacterDetailModal = memo(({ visible, character, onClose }) => {
  // Voice-over announcements
  const { announce, announceSuccess } = useVoiceOverAnnouncements();

  // Memoize callbacks for performance
  const handleClose = useCallback(() => {
    HapticManager.lightImpact();
    onClose();
  }, [onClose]);

  const handleChatPress = useCallback(() => {
    HapticManager.mediumImpact();
    announceSuccess(`Starting chat with ${character?.title}`);
    // Navigate to chat implementation
    console.log('Starting chat with:', character?.title);
  }, [character?.title, announceSuccess]);

  // Memoize stats to prevent unnecessary recalculations
  const characterStats = useMemo(() => ({
    chats: '12.3k',
    likes: '8.9k'
  }), []);

  // Memoize tags to prevent array recreation
  const characterTags = useMemo(() => [
    'Romance', 'Adventure', 'Fantasy'
  ], []);

  // Memoize accessibility props
  const modalA11yProps = useMemo(() => getA11yProps({
    label: `Character details for ${character?.title}`,
    role: 'dialog',
  }), [character?.title]);

  const backButtonA11yProps = useMemo(() => getA11yProps({
    label: 'Close character details',
    hint: 'Returns to previous screen',
  }), []);

  const chatButtonA11yProps = useMemo(() => getA11yProps({
    label: `Start chat with ${character?.title}`,
    hint: 'Opens chat conversation',
  }), [character?.title]);

  if (!character) return null;

  return (
    <OptimizedModal
      visible={visible}
      onClose={handleClose}
      animationType="slide"
      enableHaptics={true}
      enableBlur={false}
      style={styles.modal}
      {...modalA11yProps}
    >
      <View style={styles.container}>
        <OptimizedImage
          source={character.image}
          style={styles.imageBackground}
          width={width}
          height={height}
          resizeMode="cover"
          priority="high"
          enableProgressiveLoading={true}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
            style={styles.gradient}
          >
            {/* Header */}
            <View style={styles.header}>
              <OptimizedButton
                onPress={handleClose}
                variant="ghost"
                size="small"
                style={styles.backButton}
                icon={<Ionicons name="arrow-back" size={28} color={Colors.text} />}
                enableHaptics={true}
                {...backButtonA11yProps}
              />
              <OptimizedButton
                variant="ghost"
                size="small"
                style={styles.moreButton}
                icon={<Ionicons name="ellipsis-horizontal" size={24} color={Colors.text} />}
                enableHaptics={true}
                {...getA11yProps({ label: 'More options' })}
              />
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              <View style={styles.characterInfo}>
                {character.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{character.badge}</Text>
                  </View>
                )}
                
                <Text style={styles.title}>{character.title}</Text>
                
                <View style={styles.stats}>
                  <View style={styles.statItem}>
                    <Ionicons name="chatbubbles" size={20} color={Colors.textSecondary} />
                    <Text style={styles.statText}>{characterStats.chats} chats</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="heart" size={20} color={Colors.textSecondary} />
                    <Text style={styles.statText}>{characterStats.likes} likes</Text>
                  </View>
                </View>

                <Text style={styles.description}>
                  {character.description}
                </Text>

                <View style={styles.tags}>
                  {characterTags.map((tag, index) => (
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* Bottom Actions */}
            <View style={styles.bottomActions}>
              <OptimizedButton
                title="Start Chat"
                onPress={handleChatPress}
                variant="primary"
                size="large"
                style={styles.chatButton}
                icon={<Ionicons name="chatbubble" size={20} color={Colors.text} />}
                iconPosition="left"
                enableHaptics={true}
                {...chatButtonA11yProps}
              />
            </View>
          </LinearGradient>
        </OptimizedImage>
      </View>
    </OptimizedModal>
  );
});

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageBackground: {
    flex: 1,
    width: width,
    height: height,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  moreButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    flex: 1,
    marginTop: 'auto',
  },
  characterInfo: {
    paddingHorizontal: 20,
    paddingTop: height * 0.4,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statText: {
    color: Colors.textSecondary,
    marginLeft: 6,
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    marginBottom: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: Colors.categoryInactive,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: Colors.text,
    fontSize: 13,
  },
  bottomActions: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  chatButton: {
    borderRadius: 28,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default CharacterDetailModal;