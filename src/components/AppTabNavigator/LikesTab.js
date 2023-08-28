import * as React from 'react';
import {TouchableOpacity, Image} from 'react-native';
// import LikesScreen from '../../screens/LikesScreen';
import DetailScreen from '../../screens/DetailScreen';

function BackBtn({navigation}) {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require('../../assest/images/backBtn.png')}
        style={{marginLeft: 20, width: 30, height: 30}}
      />
    </TouchableOpacity>
  );
}

function LikesTab({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // title: '나의 관심목록',
      headerLeft: () => <BackBtn navigation={navigation} />,
    });
  });
  return <DetailScreen />;
}

export default LikesTab;
