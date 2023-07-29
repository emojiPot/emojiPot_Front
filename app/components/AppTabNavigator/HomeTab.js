import * as React from 'react';
import {View, Text, Button} from 'react-native';
import HomeScreen from '../../screens/HomeScreen';

function HomeTab({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
    });
  });
  return (
    <View>
      <HomeScreen />
    </View>
  );
}

export default HomeTab;
