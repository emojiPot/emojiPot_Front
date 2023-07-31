import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// flatList는 저장된 데이터를 받아오는 거기 때문에..사용X
const PostCreateScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>위치저장</Text>
        <Text>날짜입력</Text>
        <Text>사진업로드(5장)</Text>
        <Text>3가지 감정이모지 박스</Text>
        <Text>글작성박스</Text>
        <Text>공개/비공개 설정 체크박스</Text>
        <Text>여행업로드 박스</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: wp(7),
    paddingRight: wp(7),
    paddingTop: hp(3),
  },
});

export default PostCreateScreen;
