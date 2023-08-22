import 'react-native-gesture-handler';
import * as React from 'react';
// import {StyleSheet, View, Text, Image, Button, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
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
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={30} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="create" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Likes"
          component={LikesScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="heart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Mypage"
          component={MypageScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="person" color={color} size={size} />
            ),
          }}
        />
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
