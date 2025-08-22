import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';
import { GlobalStyles } from '../styles/globalStyles';

const ProfileScreen = () => {
  return (
    <View style={[GlobalStyles.container, GlobalStyles.center]}>
      <Text style={GlobalStyles.h2}>My Profile</Text>
      <Text style={[GlobalStyles.body, { marginTop: 8 }]}>
        Your profile and settings
      </Text>
    </View>
  );
};

export default ProfileScreen;