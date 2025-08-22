import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';
import { GlobalStyles } from '../styles/globalStyles';

const HuntScreen = () => {
  return (
    <View style={[GlobalStyles.container, GlobalStyles.center]}>
      <Text style={GlobalStyles.h2}>Hunt</Text>
      <Text style={[GlobalStyles.body, { marginTop: 8 }]}>
        Discover new characters
      </Text>
    </View>
  );
};

export default HuntScreen;