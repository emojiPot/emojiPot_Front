import * as React from 'react';
import {StyleSheet, View, Text, Image, Button, Linking} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import HomeScreen from './components/AppTabNavigator/HomeTab';
import PostScreen from './components/AppTabNavigator/PostTab';
import LikesScreen from './components/AppTabNavigator/LikesTab';
import MypageScreen from './components/AppTabNavigator/MypageTab';

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Post" component={PostScreen} />
        <Tab.Screen name="Likes" component={LikesScreen} />
        <Tab.Screen name="Mypage" component={MypageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
