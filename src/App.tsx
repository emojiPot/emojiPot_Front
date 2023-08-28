import 'react-native-gesture-handler';
import * as React from 'react';
import {StyleSheet, View, Text, Image, Button, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {enableScreens} from 'react-native-screens';
enableScreens();

import LogoutScreen from './screens/LogoutScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './components/AppTabNavigator/HomeTab';
import PostScreen from './components/AppTabNavigator/PostTab';
import LikesScreen from './components/AppTabNavigator/LikesTab';
import MypageScreen from './components/AppTabNavigator/MypageTab';
import DetailPostScreen from './screens/DetailScreen';
import UpdatePostScreen from './screens/UpdateScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BackBtn() {
  return (
    <Image
      source={require('./assest/images/backBtn.png')}
      style={{marginLeft: 20, width: 30, height: 30}}
    />
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // 로그인 여부를 저장하는 상태

  return (
    <NavigationContainer>
      {/* 서버 연결이 되어야 할 수 있을 것 같음 */}
      {/* {isLoggedIn ? ( */}
      <Tab.Navigator>

        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="ios-home" color="black" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="ios-create" size={size} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Likes"
          component={LikesScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="ios-heart" size={size} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Mypage"
          component={MypageScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="ios-home" size={size} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
      {/* ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{8
              title: '',
              headerBackTitleVisible: false,
              headerBackImage: BackBtn,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: '',
              headerBackTitleVisible: false,
              headerBackImage: BackBtn,
            }}
          />
        </Stack.Navigator>
      )} */}
    </NavigationContainer>
  );
}

export default App;