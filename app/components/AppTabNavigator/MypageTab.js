import * as React from 'react';
import {View, Text, Button} from 'react-native';

function MypageTab({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '여긴 마이페이지 스크린입니다.',
    });
  });
  return (
    <View>
      <Text>MypageTab</Text>
    </View>
  );
}

export default MypageTab;
