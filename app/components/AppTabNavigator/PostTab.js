import * as React from 'react';
import {View, Text, Button} from 'react-native';

function PostTab({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '여긴 글쓰기 스크린입니다.',
    });
  });
  return (
    <View>
      <Text>PostTab</Text>
    </View>
  );
}

export default PostTab;
