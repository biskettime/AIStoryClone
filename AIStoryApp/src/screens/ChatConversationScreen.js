import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  ImageBackground,
  Dimensions,
  ScrollView,
  Modal,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { SPACING, TYPOGRAPHY } from '../styles/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ChatConversationScreen = ({ route, navigation }) => {
  const { character } = route.params;
  const [inputText, setInputText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [inputMode, setInputMode] = useState('say'); // 'say' or 'do'
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const slideAnim = useRef(new Animated.Value(width)).current;
  
  const storyDescription = "Lumine is a golden dragon who lives in a dwarven made palace that she conquered long ago. Like all dragons, she amassed a huge pile of gold and treasures that she loves.";
  
  const welcomeMessage = "Lumine rolls around on her pile of treasure as she lazes around. She yawns and stretches. 'Man, I'm bored. Maybe I'll actually get up today.' But then she rolls back over. 'Meh, maybe tomorrow.'";

  useEffect(() => {
    if (showMenu) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showMenu]);

  const menuItems = [
    { 
      title: "Dragon's Treasure Trove", 
      subtitle: character.description,
      type: 'header'
    },
    { title: 'Restart', icon: 'chevron-forward' },
    { title: 'Report', icon: 'chevron-forward' },
    { 
      title: 'Custom Chat Persona', 
      icon: 'chevron-forward',
      hasSection: true,
      sectionItems: [
        { label: 'Name', value: 'User38a0' },
        { label: 'Gender', value: '' },
        { label: 'Chat Persona', value: '' },
      ]
    },
    {
      title: 'Asset',
      hasSection: true,
      sectionItems: [
        { label: 'Dynamic Background', icon: 'chevron-forward' },
        { label: 'Static Background', icon: 'chevron-forward' },
        { label: 'Plot Video', icon: 'chevron-forward' },
      ]
    }
  ];

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        type: inputMode,
        timestamp: new Date(),
      };
      
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate AI response after delay
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          text: "*Lumine stretches her golden wings and yawns* Oh, a visitor? How amusing. It's been ages since someone dared to enter my treasure room. Are you here to admire my collection, or do you have something more interesting in mind?",
          sender: 'ai',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Full Screen Character Background */}
      <ImageBackground
        source={{ uri: character.image }}
        style={styles.fullBackground}
        resizeMode="cover"
      >
        <View style={styles.darkOverlay} />
        
        {/* Header with proper padding for status bar */}
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <View style={styles.headerCenter}>
              <View style={styles.profileInfo}>
                <Image
                  source={{ uri: character.image }}
                  style={styles.headerAvatar}
                />
                <View style={styles.headerTextContainer}>
                  <View style={styles.nameRow}>
                    <Text style={styles.characterName}>{character.name}</Text>
                    <Text style={styles.moodIndicator}>😊</Text>
                  </View>
                  <Text style={styles.characterStats}>244Chatted</Text>
                  <Text style={styles.characterHandle}>@{character.name}Main</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerIcon}>
                <Ionicons name="sparkles" size={20} color={Colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIcon}>
                <Ionicons name="camera-outline" size={20} color={Colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIcon}>
                <Ionicons name="time-outline" size={20} color={Colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIcon}>
                <Ionicons name="share-social-outline" size={20} color={Colors.text} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerIcon}
                onPress={() => setShowMenu(true)}
              >
                <Ionicons name="ellipsis-horizontal" size={20} color={Colors.text} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerIcon}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Stats Bar */}
          <View style={styles.statsBar}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={14} color={Colors.text} />
              <Text style={styles.statText}>18</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="chatbubble" size={14} color={Colors.text} />
              <Text style={styles.statText}>0</Text>
            </View>
          </View>
        </View>

        {/* Main Content Area */}
        <ScrollView 
          style={styles.contentScrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Story Description at the top */}
          <Text style={styles.storyDescription}>
            {storyDescription}
          </Text>

          {/* Welcome Message Box */}
          <View style={styles.welcomeContainer}>
            <View style={styles.welcomeHeader}>
              <Text style={styles.welcomeTitle}>{character.name}✧⁠*⁠｡</Text>
            </View>
            <Text style={styles.welcomeText}>
              {welcomeMessage}
            </Text>
            <View style={styles.welcomeActions}>
              <TouchableOpacity style={styles.welcomeButton}>
                <Ionicons name="eye-outline" size={18} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.welcomeButton}>
                <Text style={styles.skipButtonText}>»</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Messages */}
          {messages.map((message) => (
            <View key={message.id} style={styles.messageContainer}>
              {message.sender === 'user' ? (
                <View style={styles.userMessage}>
                  <Text style={styles.userMessageType}>
                    {message.type === 'do' ? '*action*' : ''}
                  </Text>
                  <Text style={styles.userMessageText}>{message.text}</Text>
                </View>
              ) : (
                <View style={styles.aiMessageWrapper}>
                  <View style={styles.aiMessage}>
                    <View style={styles.aiMessageHeader}>
                      <Image
                        source={{ uri: character.image }}
                        style={styles.aiAvatar}
                      />
                      <Text style={styles.aiName}>{character.name}</Text>
                    </View>
                    <Text style={styles.aiMessageText}>{message.text}</Text>
                    
                    {/* AI Message Actions */}
                    <View style={styles.aiMessageActions}>
                      <TouchableOpacity style={styles.aiActionButton}>
                        <Ionicons name="refresh" size={16} color={Colors.textSecondary} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.aiActionButton}>
                        <Ionicons name="copy-outline" size={16} color={Colors.textSecondary} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.aiActionButton}>
                        <Ionicons name="heart-outline" size={16} color={Colors.textSecondary} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.aiActionButton}>
                        <Ionicons name="share-outline" size={16} color={Colors.textSecondary} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.aiActionButton}>
                        <Ionicons name="flag-outline" size={16} color={Colors.textSecondary} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.aiActionButton}>
                        <Ionicons name="star-outline" size={16} color={Colors.textSecondary} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.aiActionButton}>
                        <Ionicons name="volume-high-outline" size={16} color={Colors.textSecondary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <View style={styles.typingContainer}>
              <View style={styles.typingBubble}>
                <Text style={styles.typingText}>{character.name} is typing</Text>
                <View style={styles.typingDots}>
                  <View style={[styles.dot, styles.dot1]} />
                  <View style={[styles.dot, styles.dot2]} />
                  <View style={[styles.dot, styles.dot3]} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Bottom Controls */}
        <View style={styles.bottomContainer}>
          {/* Action Buttons Row */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.actionButtonsScroll}
          >
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionButton, styles.plotVideoButton]}>
                <Ionicons name="play-circle" size={18} color={Colors.text} />
                <Text style={styles.actionButtonText}>Plot Video</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionButton, styles.bgVideoButton]}>
                <Ionicons name="flame" size={18} color={Colors.text} />
                <Text style={styles.actionButtonText}>BG Video</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionButton, styles.groupChatButton]}>
                <Ionicons name="people" size={18} color={Colors.text} />
                <Text style={styles.actionButtonText}>Group Chat</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionButton, styles.memoryButton]}>
                <Ionicons name="book" size={18} color={Colors.text} />
                <Text style={styles.actionButtonText}>Memory</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
                <Ionicons name="call" size={18} color={Colors.text} />
                <Text style={styles.actionButtonText}>Call</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionButton, styles.giftButton]}>
                <Ionicons name="gift" size={18} color={Colors.text} />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionButton, styles.imageButton]}>
                <Ionicons name="image" size={18} color={Colors.text} />
                <Text style={styles.actionButtonText}>Image</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionButton, styles.emotionButton]}>
                <Ionicons name="happy" size={18} color={Colors.text} />
                <Text style={styles.actionButtonText}>Emotion</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionButton, styles.regenerateButton]}>
                <Ionicons name="refresh" size={18} color={Colors.text} />
                <Text style={styles.actionButtonText}>Regenerate</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.actionButton, styles.storyButton]}>
                <Ionicons name="book-outline" size={18} color={Colors.text} />
                <Text style={styles.actionButtonText}>Story</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Input Area */}
          <View style={styles.inputContainer}>
            {/* Say/Do Toggle Switch */}
            <TouchableOpacity 
              style={styles.toggleContainer}
              onPress={() => setInputMode(inputMode === 'say' ? 'do' : 'say')}
            >
              <View style={[styles.toggleSwitch, inputMode === 'do' && styles.toggleSwitchDo]}>
                <View style={[styles.toggleButton, inputMode === 'do' && styles.toggleButtonDo]} />
              </View>
              <Text style={styles.toggleText}>{inputMode}</Text>
            </TouchableOpacity>
            
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder={inputMode === 'say' ? "Say something~" : "Do something..."}
                placeholderTextColor="#666"
                multiline
                maxHeight={80}
              />
              <TouchableOpacity style={styles.micButton}>
                <Ionicons name="mic" size={18} color="#999" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSend}
            >
              <Ionicons name="send" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Settings Menu Modal */}
      <Modal
        visible={showMenu}
        transparent={true}
        animationType="none"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <Animated.View 
            style={[
              styles.menuContainer,
              {
                transform: [{ translateX: slideAnim }]
              }
            ]}
          >
            <View style={styles.menuHandle} />
            <ScrollView showsVerticalScrollIndicator={false}>
              {menuItems.map((item, index) => (
                <View key={index}>
                  {item.type === 'header' ? (
                    <View style={styles.menuHeader}>
                      <Text style={styles.menuHeaderTitle}>{item.title}</Text>
                      <Text style={styles.menuHeaderSubtitle}>{item.subtitle}</Text>
                    </View>
                  ) : (
                    <>
                      <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>{item.title}</Text>
                        {item.icon && (
                          <Ionicons name={item.icon} size={20} color={Colors.textSecondary} />
                        )}
                      </TouchableOpacity>
                      {item.hasSection && item.sectionItems && (
                        <View style={styles.menuSection}>
                          {item.sectionItems.map((subItem, subIndex) => (
                            <TouchableOpacity key={subIndex} style={styles.menuSubItem}>
                              <Text style={styles.menuSubItemLabel}>{subItem.label}</Text>
                              {subItem.value !== undefined ? (
                                <Text style={styles.menuSubItemValue}>{subItem.value || ''}</Text>
                              ) : (
                                <Ionicons name={subItem.icon} size={18} color={Colors.textSecondary} />
                              )}
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </>
                  )}
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  fullBackground: {
    flex: 1,
    width: width,
    height: height,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  headerWrapper: {
    paddingTop: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.sm + SPACING.xs, // 12px
    paddingVertical: SPACING.sm, // 8px
    gap: SPACING.sm, // Consistent spacing between elements
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40, // Larger for better visibility
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.sm, // 8px
  },
  headerTextContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  moodIndicator: {
    fontSize: 12,
  },
  characterName: {
    ...TYPOGRAPHY.h5, // 16px with proper line height
    fontWeight: '600',
    color: Colors.text,
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
  characterStats: {
    ...TYPOGRAPHY.caption, // 11px with proper line height
    color: Colors.textSecondary,
    fontFamily: 'System',
  },
  characterHandle: {
    ...TYPOGRAPHY.captionSmall, // 10px with proper line height
    color: Colors.textTertiary,
    fontFamily: 'System',
    opacity: 0.8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    padding: 5,
    marginLeft: 2,
  },
  statsBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    color: Colors.text,
    fontSize: 12,
    marginLeft: 3,
  },
  contentScrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: SPACING.md, // 16px
    paddingTop: SPACING.sm + SPACING.xs, // 12px
    paddingBottom: SPACING.lg, // 24px
    gap: SPACING.md, // Consistent spacing between messages
  },
  storyDescription: {
    ...TYPOGRAPHY.body, // 14px with proper line height
    color: Colors.textSecondary,
    fontFamily: 'System',
    fontStyle: 'italic',
    marginBottom: SPACING.sm + SPACING.xs, // 12px
    opacity: 0.9,
    letterSpacing: 0.1,
  },
  welcomeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: SPACING.md, // 16px
    padding: SPACING.md, // 16px
    marginBottom: SPACING.md, // 16px
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  welcomeHeader: {
    marginBottom: 6,
  },
  welcomeTitle: {
    ...TYPOGRAPHY.h5, // 16px with proper hierarchy
    fontWeight: '600',
    color: '#1a1a1a',
    fontFamily: 'System',
    letterSpacing: 0.1,
  },
  welcomeText: {
    ...TYPOGRAPHY.body, // 14px with proper line height
    color: '#2a2a2a',
    fontFamily: 'System',
    marginBottom: SPACING.sm + SPACING.xs, // 12px
  },
  welcomeActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  welcomeButton: {
    padding: 6,
    marginLeft: 10,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  messageContainer: {
    marginVertical: SPACING.sm, // 8px consistent spacing
  },
  userMessage: {
    backgroundColor: 'rgba(218, 165, 32, 0.25)', // Gold theme consistency
    borderRadius: SPACING.md, // 16px
    padding: SPACING.md, // 16px
    alignSelf: 'flex-end',
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: 'rgba(218, 165, 32, 0.3)',
  },
  userMessageType: {
    ...TYPOGRAPHY.caption, // 11px with proper line height
    color: Colors.primary,
    fontFamily: 'System',
    fontStyle: 'italic',
    marginBottom: SPACING.xs, // 4px
    opacity: 0.8,
  },
  userMessageText: {
    ...TYPOGRAPHY.body, // 14px with proper line height
    color: Colors.text,
    fontFamily: 'System',
  },
  aiMessageWrapper: {
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  aiMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: SPACING.md, // 16px
    padding: SPACING.md, // 16px
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  aiMessageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiAvatar: {
    width: 28, // Larger for better visibility
    height: 28,
    borderRadius: 14,
    marginRight: SPACING.xs, // 4px
  },
  aiName: {
    ...TYPOGRAPHY.caption, // 11px with proper typography
    fontWeight: '600',
    color: '#1a1a1a',
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
  aiMessageText: {
    ...TYPOGRAPHY.body, // 14px with proper line height
    color: '#2a2a2a',
    fontFamily: 'System',
    marginBottom: SPACING.sm, // 8px
  },
  aiMessageActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  aiActionButton: {
    padding: 6,
    marginRight: 8,
  },
  typingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 12,
    padding: 12,
    alignSelf: 'flex-start',
    maxWidth: '60%',
  },
  typingText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  typingDots: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#999',
  },
  bottomContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  actionButtonsScroll: {
    paddingVertical: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    marginHorizontal: 3,
  },
  plotVideoButton: {
    backgroundColor: 'rgba(33, 150, 243, 0.9)',
  },
  bgVideoButton: {
    backgroundColor: 'rgba(255, 152, 0, 0.9)',
  },
  groupChatButton: {
    backgroundColor: 'rgba(156, 39, 176, 0.9)',
  },
  memoryButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
  },
  callButton: {
    backgroundColor: 'rgba(0, 188, 212, 0.9)',
  },
  giftButton: {
    backgroundColor: 'rgba(255, 193, 7, 0.9)',
    width: 40,
    height: 36,
    borderRadius: 18,
    padding: 0,
  },
  imageButton: {
    backgroundColor: 'rgba(233, 30, 99, 0.9)',
  },
  emotionButton: {
    backgroundColor: 'rgba(103, 58, 183, 0.9)',
  },
  regenerateButton: {
    backgroundColor: 'rgba(96, 125, 139, 0.9)',
  },
  storyButton: {
    backgroundColor: 'rgba(121, 85, 72, 0.9)',
  },
  actionButtonText: {
    ...TYPOGRAPHY.captionSmall, // 10px with proper typography
    color: Colors.text,
    fontFamily: 'System',
    fontWeight: '600',
    marginLeft: SPACING.xs, // 4px
    letterSpacing: 0.3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm + SPACING.xs, // 12px
    paddingVertical: SPACING.sm, // 8px
    gap: SPACING.sm, // Consistent spacing
  },
  toggleContainer: {
    alignItems: 'center',
    marginRight: 8,
  },
  toggleSwitch: {
    width: 42,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(186, 134, 252, 0.3)',
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchDo: {
    backgroundColor: 'rgba(255, 152, 0, 0.3)',
  },
  toggleButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  toggleButtonDo: {
    backgroundColor: '#FF9800',
    alignSelf: 'flex-end',
  },
  toggleText: {
    ...TYPOGRAPHY.captionSmall, // 10px with proper typography
    color: Colors.textSecondary,
    fontFamily: 'System',
    marginTop: SPACING.xs / 2, // 2px
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: 'rgba(40, 40, 50, 0.8)',
    borderRadius: 22,
    paddingLeft: 14,
    paddingRight: 36,
    paddingVertical: 10,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.body, // 14px with proper line height
    color: Colors.text,
    fontFamily: 'System',
    paddingVertical: 0, // Remove default padding
    includeFontPadding: false, // Android-specific
  },
  micButton: {
    position: 'absolute',
    right: 10,
    padding: 4,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(40, 40, 50, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: Colors.surface,
    width: width * 0.85,
    height: '100%',
    paddingBottom: 30,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  menuHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  menuHeader: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
  },
  menuHeaderTitle: {
    ...TYPOGRAPHY.h4, // 18px with proper hierarchy
    fontWeight: '600',
    color: Colors.text,
    fontFamily: 'System',
    marginBottom: SPACING.xs + 2, // 6px
    letterSpacing: 0.1,
  },
  menuHeaderSubtitle: {
    ...TYPOGRAPHY.body, // 14px with proper line height
    color: Colors.textSecondary,
    fontFamily: 'System',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
  },
  menuItemText: {
    ...TYPOGRAPHY.h5, // 16px with proper typography
    color: Colors.text,
    fontFamily: 'System',
    fontWeight: '500',
  },
  menuSection: {
    backgroundColor: Colors.background,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  menuSubItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuSubItemLabel: {
    ...TYPOGRAPHY.body, // 14px with proper typography
    color: Colors.textSecondary,
    fontFamily: 'System',
  },
  menuSubItemValue: {
    ...TYPOGRAPHY.body, // 14px with proper typography
    color: Colors.text,
    fontFamily: 'System',
    fontWeight: '500',
  },
});

export default ChatConversationScreen;