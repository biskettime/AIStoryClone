import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import { GlobalStyles } from '../styles/globalStyles';

const ChatsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('Chatting');
  
  const chatData = [
    {
      id: '1',
      name: 'A Midnight Encounter',
      lastMessage: 'Lily: Hey there, new neighbor! You\'re kinda c...',
      time: '13:19',
      unread: 0,
      image: 'https://via.placeholder.com/60x60/FF6B6B/FFFFFF?text=ME',
      online: false,
    },
  ];

  const momentData = [
    {
      id: '1',
      author: 'X-Departed',
      time: '2025-08-21 11:31',
      content: 'Updated it a bit to keep her closer. She should show a reaction if you get too far away, she will calm down. Just talk her through it. I actually really like this one and 220...',
      image: 'https://via.placeholder.com/400x300/BA86FC/FFFFFF?text=Moment',
      showMore: true,
    },
    {
      id: '2',
      author: 'Shedowlove',
      time: '2025-08-18 10:37',
      content: 'A vampire who doesn\'t want blood...but love...',
      image: 'https://via.placeholder.com/400x300/E91E63/FFFFFF?text=Vampire',
      character: 'Peter',
      characterDesc: 'Peter is a vampire who liv...',
      likes: 19,
      comments: 8,
    },
  ];

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatConversation', { 
        character: {
          id: item.id,
          title: item.name,
          image: item.image,
          description: item.lastMessage,
        }
      })}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        {item.online && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMomentItem = ({ item }) => (
    <View style={styles.momentCard}>
      <View style={styles.momentHeader}>
        <View style={styles.momentAuthor}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/40x40/4ECDC4/FFFFFF?text=U' }} 
            style={styles.authorAvatar}
          />
          <View>
            <Text style={styles.authorName}>{item.author}</Text>
            <Text style={styles.momentTime}>{item.time}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.momentContent} numberOfLines={3}>
        {item.content}
      </Text>
      
      {item.showMore && (
        <TouchableOpacity>
          <Text style={styles.showMore}>Show more ›</Text>
        </TouchableOpacity>
      )}
      
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.momentImage} />
      )}
      
      {item.character && (
        <View style={styles.characterInfo}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/40x40/E91E63/FFFFFF?text=P' }}
            style={styles.characterAvatar}
          />
          <View style={styles.characterDetails}>
            <Text style={styles.characterName}>{item.character}</Text>
            <Text style={styles.characterDesc}>{item.characterDesc}</Text>
          </View>
        </View>
      )}
      
      {item.likes && (
        <View style={styles.momentFooter}>
          <View style={styles.momentStats}>
            <TouchableOpacity style={styles.statItem}>
              <Ionicons name="heart-outline" size={20} color={Colors.textSecondary} />
              <Text style={styles.statCount}>{item.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statItem}>
              <Ionicons name="chatbubble-outline" size={18} color={Colors.textSecondary} />
              <Text style={styles.statCount}>{item.comments}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={GlobalStyles.container} edges={['top']}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Moment' && styles.tabActive]}
          onPress={() => setSelectedTab('Moment')}
        >
          <Text style={[styles.tabText, selectedTab === 'Moment' && styles.tabTextActive]}>
            Moment
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Chatting' && styles.tabActive]}
          onPress={() => setSelectedTab('Chatting')}
        >
          <Text style={[styles.tabText, selectedTab === 'Chatting' && styles.tabTextActive]}>
            Chatting
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.messageIcon}
          onPress={() => navigation.navigate('Inbox')}
        >
          <Ionicons name="mail-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {selectedTab === 'Chatting' ? (
        <>
          {/* Chat List */}
          <FlatList
            data={chatData}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No more content</Text>
              </View>
            }
          />
        </>
      ) : (
        <>
          {/* Moment List */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {momentData.map((item) => (
              <View key={item.id}>
                {renderMomentItem({ item })}
              </View>
            ))}
          </ScrollView>
          
          {/* Floating Add Button - Only in Moment tab */}
          <TouchableOpacity 
            style={styles.floatingButton}
            onPress={() => navigation.navigate('CreateSaylor')}
          >
            <Ionicons name="add" size={28} color={Colors.background} />
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
  },
  tab: {
    marginRight: 24,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: 2,
  },
  tabText: {
    fontSize: 18,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  tabTextActive: {
    color: Colors.text,
  },
  messageIcon: {
    marginLeft: 'auto',
  },
  listContent: {
    paddingHorizontal: 20,
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.surfaceLight,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  chatTime: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadCount: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  momentCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
  },
  momentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  momentAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  momentTime: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  momentContent: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  showMore: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 12,
  },
  momentImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  characterInfo: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  characterAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  characterDetails: {
    flex: 1,
  },
  characterName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  characterDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  momentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  momentStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  editButton: {
    padding: 4,
  },
});

export default ChatsScreen;