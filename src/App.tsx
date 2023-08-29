import 'react-native-gesture-handler';
import * as React from 'react';
import {StyleSheet, View, Text, Image, Button, Linking} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {enableScreens} from 'react-native-screens';
enableScreens();

// import LogoutScreen from './screens/LogoutScreen';
// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './components/AppTabNavigator/HomeTab';
import PostScreen from './components/AppTabNavigator/PostTab';
import LikesScreen from './components/AppTabNavigator/LikesTab';
import MypageScreen from './components/AppTabNavigator/MypageTab';
import DetailPostScreen from './screens/DetailScreen';
import UpdatePostScreen from './screens/UpdateScreen';
import UserInfoUpdateScreen  from './screens/UserInfoUpdateScreen';

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// function BackBtn() {
//   return (
//     <Image
//       source={require('./assest/images/backBtn.png')}
//       style={{marginLeft: 20, width: 30, height: 30}}
//     />
//   );
// }
function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Post" component={UserInfoUpdateScreen} />
        <Tab.Screen name="Likes" component={LikesScreen} />
        <Tab.Screen name="Mypage" component={MypageScreen} />
      </Tab.Navigator>
    </NavigationContainer>

    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Logout"
    //       component={LogoutScreen}
    //       options={{headerShown: false}}
    //     />
    //     <Stack.Screen
    //       name="Login"
    //       component={LoginScreen}
    //       options={{
    //         title: '',
    //         headerBackTitleVisible: false,
    //         headerBackImage: BackBtn,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="Register"
    //       component={RegisterScreen}
    //       options={{
    //         title: '',
    //         headerBackTitleVisible: false,
    //         headerBackImage: BackBtn,
    //       }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default App;