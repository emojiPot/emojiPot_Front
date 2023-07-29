import * as React from 'react';
import {View, Text, Button} from 'react-native';

function LikesTab({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '여긴 저장 스크린입니다.',
    });
  });
  return (
    <View>
      <Text>LikesTab</Text>
    </View>
  );
}

export default LikesTab;
