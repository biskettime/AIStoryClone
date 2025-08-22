import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import ChatsScreen from './src/screens/ChatsScreen';
import CreateScreen from './src/screens/CreateScreen';
import HuntScreen from './src/screens/HuntScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ChatConversationScreen from './src/screens/ChatConversationScreen';
import LoginScreen from './src/screens/LoginScreen';
import DebugModeScreen from './src/screens/DebugModeScreen';
import CreateSaylorScreen from './src/screens/CreateSaylorScreen';
import SearchScreen from './src/screens/SearchScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BlackListScreen from './src/screens/BlackListScreen';
import AccountSecurityScreen from './src/screens/AccountSecurityScreen';
import SwitchLanguageScreen from './src/screens/SwitchLanguageScreen';
import VIPScreen from './src/screens/VIPScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import AboutSayloScreen from './src/screens/AboutSayloScreen';
import ReportScreen from './src/screens/ReportScreen';
import MyProfileScreen from './src/screens/MyProfileScreen';
import NewCommentsScreen from './src/screens/NewCommentsScreen';
import EditBioScreen from './src/screens/EditBioScreen';
import EditNicknameScreen from './src/screens/EditNicknameScreen';
import EditAgeScreen from './src/screens/EditAgeScreen';
import EditGenderScreen from './src/screens/EditGenderScreen';
import CreatorCenterScreen from './src/screens/CreatorCenterScreen';
import WalletScreen from './src/screens/WalletScreen';
import BGVideoScreen from './src/screens/BGVideoScreen';
import DiamondRankingScreen from './src/screens/DiamondRankingScreen';
import InboxScreen from './src/screens/InboxScreen';
import TreasureScreen from './src/screens/TreasureScreen';
import CreatorPolicyScreen from './src/screens/CreatorPolicyScreen';
import ReviewRulesScreen from './src/screens/ReviewRulesScreen';
import FAQExposureScreen from './src/screens/FAQExposureScreen';
import CommunityGuidelinesScreen from './src/screens/CommunityGuidelinesScreen';
import CreationSpecScreen from './src/screens/CreationSpecScreen';
import PerfectPoseScreen from './src/screens/PerfectPoseScreen';
import ScriptCreationScreen from './src/screens/ScriptCreationScreen';
import GenerateImagesScreen from './src/screens/GenerateImagesScreen';
import CharacterSettingScreen from './src/screens/CharacterSettingScreen';
import AdvancedCharacterScreen from './src/screens/AdvancedCharacterScreen';

import { Colors } from './src/styles/colors';
import ErrorBoundary from './src/components/ErrorBoundary';
// Performance Dashboard removed
import AccessibilityManager from './src/utils/accessibility';
import { CreateModalProvider, createModalManager } from './src/components/CreateModalManager';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chats') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Create') {
            return (
              <View style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: Colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Ionicons name="add" size={28} color={Colors.background} />
              </View>
            );
          } else if (route.name === 'Hunt') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'My') {
            iconName = focused ? 'happy' : 'happy-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFB74D',
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen 
        name="Create" 
        component={CreateScreen}
        options={{
          tabBarLabel: '',
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            createModalManager.show();
          },
        }}
      />
      <Tab.Screen name="Hunt" component={HuntScreen} />
      <Tab.Screen name="My" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const MainApp = () => {
  return (
    <NavigationContainer>
      <CreateModalProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: Colors.background }
          }}
        >
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="ChatConversation" component={ChatConversationScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="DebugMode" component={DebugModeScreen} />
          <Stack.Screen name="CreateSaylor" component={CreateSaylorScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="BlackList" component={BlackListScreen} />
          <Stack.Screen name="AccountSecurity" component={AccountSecurityScreen} />
          <Stack.Screen name="SwitchLanguage" component={SwitchLanguageScreen} />
          <Stack.Screen name="VIP" component={VIPScreen} />
          <Stack.Screen name="Feedback" component={FeedbackScreen} />
          <Stack.Screen name="AboutSaylo" component={AboutSayloScreen} />
          <Stack.Screen name="Report" component={ReportScreen} />
          <Stack.Screen name="MyProfile" component={MyProfileScreen} />
          <Stack.Screen name="NewComments" component={NewCommentsScreen} />
          <Stack.Screen name="EditBio" component={EditBioScreen} />
          <Stack.Screen name="EditNickname" component={EditNicknameScreen} />
          <Stack.Screen name="EditAge" component={EditAgeScreen} />
          <Stack.Screen name="EditGender" component={EditGenderScreen} />
          <Stack.Screen name="CreatorCenter" component={CreatorCenterScreen} />
          <Stack.Screen name="Wallet" component={WalletScreen} />
          <Stack.Screen name="BGVideo" component={BGVideoScreen} />
          <Stack.Screen name="DiamondRanking" component={DiamondRankingScreen} />
          <Stack.Screen name="Inbox" component={InboxScreen} />
          <Stack.Screen name="Treasure" component={TreasureScreen} />
          <Stack.Screen name="CreatorPolicy" component={CreatorPolicyScreen} />
          <Stack.Screen name="ReviewRules" component={ReviewRulesScreen} />
          <Stack.Screen name="FAQExposure" component={FAQExposureScreen} />
          <Stack.Screen name="CommunityGuidelines" component={CommunityGuidelinesScreen} />
          <Stack.Screen name="CreationSpec" component={CreationSpecScreen} />
          <Stack.Screen name="PerfectPose" component={PerfectPoseScreen} />
          <Stack.Screen name="ScriptCreation" component={ScriptCreationScreen} />
          <Stack.Screen name="GenerateImages" component={GenerateImagesScreen} />
          <Stack.Screen name="CharacterSetting" component={CharacterSettingScreen} />
          <Stack.Screen name="AdvancedCharacter" component={AdvancedCharacterScreen} />
        </Stack.Navigator>
      </CreateModalProvider>
    </NavigationContainer>
  );
};

const App = () => {
  // Initialize accessibility manager
  useEffect(() => {
    AccessibilityManager.initialize();
    
    return () => {
      AccessibilityManager.cleanup();
    };
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent"
        translucent={true}
      />
      <MainApp />
      
      {/* Development performance dashboard */}
      {/* Performance Dashboard removed */}
      
    </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default App;