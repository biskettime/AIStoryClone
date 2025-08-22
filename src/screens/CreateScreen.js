import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../styles/colors';
import { GlobalStyles } from '../styles/globalStyles';

const CreateScreen = () => {
  return (
    <View style={[GlobalStyles.container, GlobalStyles.center]}>
      <Icon name="add-circle-outline" size={80} color={Colors.primary} />
      <Text style={[GlobalStyles.h2, { marginTop: 20 }]}>Create New Character</Text>
      <Text style={[GlobalStyles.body, { marginTop: 8, textAlign: 'center', paddingHorizontal: 40 }]}>
        Start creating your own unique AI character
      </Text>
      <TouchableOpacity style={[GlobalStyles.button, { marginTop: 30 }]}>
        <Text style={GlobalStyles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateScreen;