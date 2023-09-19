import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyPageContent from '../components/ScreenComponents/myPageContent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MypageScreen = () => {
  const navigation = useNavigation();

  function GoUpdateScreen() {
    navigation.navigate('UserUpdate');
  }

  function UserLogout() {
    AsyncStorage.removeItem('token');
    navigation.navigate('Logout');
  }

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
      <View style={styles.userBtn}>
        <TouchableOpacity 
          style={styles.followBtn}
          onPress={()=>GoUpdateScreen()}>
          <Text style={styles.followBtnText}>UPDATE</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.followBtn}
          onPress={()=>UserLogout()}>
          <Text style={styles.followBtnText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* 데이터 그냥 적용해본거 */}
        <MyPageContent />
        <MyPageContent />
        <MyPageContent />
        <MyPageContent />
        <MyPageContent />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  userBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  followBtn: {
    backgroundColor: '#C4C1CC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 5,
  },
  followBtnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MypageScreen;