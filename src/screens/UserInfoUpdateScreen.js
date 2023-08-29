import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  CheckBox,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserInfoUpdateScreen = () => {
    const [token, setToken] = useState('');

    const getToken = async () => {
      try {
        setToken(await AsyncStorage.getItem('token'));
        if (token == null) { console.log('Token not found');}
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    // const username = 'sunyoung';
    // useEffect(() => {
    //     getToken();
    //     axios.get('http://localhost:8080/v1/user/info' + username, 
    //     {
    //       headers: {
    //         'Authorization' : 'Bearer ' + token,
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //         .then((res) => {
    //             // setUserName(res.data.result.username);
    //             // setIntroduce(res.data.result.introduce);
    //             // setUserId(res.data.result.userId);
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    // }, [])

  //사진 받아오기
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handlePhotoUpload = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        maxFiles: 5,
        mediaType: 'photo',
      });
      setSelectedPhotos(images);
    } catch (error) {
      console.log(error);
    }
  };

  const [userName, setUserName] = useState('');

  const handleUserNameChange = text => {
    setUserName(text);
  };

  const [introduce, setIntroduce] = useState('');

  const handleIntroduceChange = text => {
    setIntroduce(text);
  };

  const [userId, setUserId] = useState('');

  const handleUserIdChange = text => {
    setUserId(text);
  };

  function uploadUserInfo() {
    getToken();
    if(userName.trim() == "") {
      Alert.alert("사용자 이름 확인", "사용자 이름은 필수 입력 사항입니다.");
    } else {
      axios.post("http://localhost:8080/v1/users/modify/" + userId,  
        {
          userName: userName,
          introduce: introduce,
        }, {
          headers: {
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        }).then(function(resp) {
          Alert.alert("정보 변경 성공!", "사용자 정보가 성공적으로 변경되었습니다.");
          // 마이페이지로 이동
        }).catch(error => {
          console.error('API 요청 에러:', error);
        }) 
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollComponent}>
        <View style={styles.component}>
          <Text>사진업로드(5장)</Text>
          <TouchableOpacity onPress={handlePhotoUpload}>
            <Text>사진을 선택하세요</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.component}>
          <Text>사용자 이름</Text>
          <TextInput
            placeholder={userName}
            onChangeText={handleUserNameChange}
            style={styles.postTextInput}
          />
        </View>
        <View style={styles.component}>
          <Text>소개 글</Text>
          <TextInput
            placeholder={introduce}
            onChangeText={handleIntroduceChange}
            style={styles.postTextInput}
          />
        </View>
      </ScrollView>
      <View style={styles.component}>
        <TouchableOpacity 
          style={styles.uploadBtn}  
          onPress={()=>uploadUserInfo()}>
          <Text style={styles.uploadBtnText}>프로필 업데이트</Text>
        </TouchableOpacity>
      </View>
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
  scrollComponent: {
    marginTop: hp(10),
  },
  component: {
    paddingBottom: hp(2),
  },
  // 버튼스타일
  uploadBtn: {
    backgroundColor: '#C4C1CC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  uploadBtnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTextInput: {
    borderColor: '#C4C1CC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});

export default UserInfoUpdateScreen;