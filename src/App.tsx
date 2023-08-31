import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Button, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import UserInfoUpdateScreen  from './screens/UserInfoUpdateScreen';
import PostCreateScreen from './screens/PostCreateScreen';
import Home from './screens/HomeScreen';
import UpdateScreen from './screens/UpdateScreen';

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
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부를 저장하는 상태
  // const [LoginStr, setLoginStr] = useState("false");

  // const getLogin = async () => {
  //   try {
  //     setLoginStr(await typeof AsyncStorage.getItem('isLogin'));
  //     if (LoginStr == null) { console.log('Token not found');}
  //   } catch (error) {
  //     console.error('Error retrieving token:', error);
  //   }
  // };

  // useEffect(() => {
  //   getLogin();
  //   if(LoginStr == 'true') setIsLoggedIn(true);
  //  }, [])

  return (
    // <NavigationContainer>
    //   {isLoggedIn ? (
    //   <Tab.Navigator>

    //     <Tab.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{
    //         tabBarIcon: ({color, size}) => (
    //           <Icon name="ios-home" color="black" size={size} />
    //         ),
    //       }}
    //     />
    //     <Tab.Screen
    //       name="Post"
    //       component={PostScreen}
    //       options={{
    //         tabBarIcon: ({color, size}) => (
    //           <Icon name="ios-create" size={size} color="black" />
    //         ),
    //       }}
    //     />
    //     <Tab.Screen
    //       name="Likes"
    //       component={LikesScreen}
    //       options={{
    //         tabBarIcon: ({color, size}) => (
    //           <Icon name="ios-heart" size={size} color="black" />
    //         ),
    //       }}
    //     />
    //     <Tab.Screen
    //       name="Mypage"
    //       component={MypageScreen}
    //       options={{
    //         tabBarIcon: ({color, size}) => (
    //           <Icon name="ios-home" size={size} color="black" />
    //         ),
    //       }}
    //     />
    //   </Tab.Navigator>
    //   ) : (
    //     <Stack.Navigator>
    //       <Stack.Screen
    //         name="Login"
    //         component={LoginScreen}
    //         options={{
    //           title: '',
    //           headerBackTitleVisible: false,
    //           headerBackImage: BackBtn,
    //         }}
    //       />
    //       <Stack.Screen
    //         name="Register"
    //         component={RegisterScreen}
    //         options={{
    //           title: '',
    //           headerBackTitleVisible: false,
    //           headerBackImage: BackBtn,
    //         }}
    //       />
    //     </Stack.Navigator>
    //   )}
    // </NavigationContainer>
    

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Logout"
          component={LogoutScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
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
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerBackImage: BackBtn,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailPostScreen}
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerBackImage: BackBtn,
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateScreen}
          options={{
            title: '',
            headerBackTitleVisible: false,
            headerBackImage: BackBtn,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;