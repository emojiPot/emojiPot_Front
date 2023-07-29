import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';

function MypageTab({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '여긴 마이페이지 스크린입니다.',
    });
  });
  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          src={
            'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
          } // 프로필이미지 등록
          style={styles.profileImage}
        />
      </View>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>+팔로우</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50, // 원형으로 만들기 위해 반지름 값을 뷰의 절반 크기로 설정
    overflow: 'hidden', // 이미지를 뷰 경계 내에 강제로 보여주기 위해 overflow 속성 추가
    marginBottom: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  followButton: {
    backgroundColor: '#C4C1CC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  followButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MypageTab;
