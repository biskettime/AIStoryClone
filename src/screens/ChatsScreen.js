import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';
import { GlobalStyles } from '../styles/globalStyles';

const ChatsScreen = () => {
  return (
    <View style={[GlobalStyles.container, GlobalStyles.center]}>
      <Text style={GlobalStyles.h2}>Chats</Text>
      <Text style={[GlobalStyles.body, { marginTop: 8 }]}>
        Your conversations will appear here
      </Text>
    </View>
  );
};

export default ChatsScreen;