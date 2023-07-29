import * as React from 'react';
import {View, Text, Button} from 'react-native';

function LikesTab({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Likes',
    });
  });
  return (
    <View>
      <Text>LikesTab</Text>
    </View>
  );
}

export default LikesTab;
