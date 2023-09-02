import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './AppTabNavigator/HomeTab';
import PostScreen from './AppTabNavigator/PostTab';
import LikesScreen from './AppTabNavigator/LikesTab';
import MypageScreen from './AppTabNavigator/MypageTab';

const Tab = createBottomTabNavigator();

const TabNavi = () => {
    return (
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
    )
}

export default TabNavi;