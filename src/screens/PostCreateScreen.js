import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostCreateScreen = () => {

  const [searchPlace, setSearchPlace] = useState('');

  // 위치 검색
  const getSearchPlace = async () => {
    try {
      const getPlace = await AsyncStorage.getItem('searchPlace') || '';
      console.log('검색 장소 확인');
      console.log(getPlace);
      setSearchPlace(getPlace);
      if (searchPlace == null) { console.log('Search Place not found');}
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

  const navigation = useNavigation();

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

  //이모지
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const handleEmotionSelect = emotion => {
    setSelectedEmotion(emotion);
  };

  //글 작성
  const [postText, setPostText] = useState('');

  const handlePostTextChange = text => {
    setPostText(text);
  };

  //공개,비공개 선택
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };

  const [token, setToken] = useState('');

  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token') || '';
      console.log('토큰 확인');
      console.log(storedToken);
      setToken(storedToken);
      if (token == null) { console.log('Token not found');}
      getSearchPlace();
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

  function uploadPost() {
    getToken();

    if(postText.trim() == "") {
      Alert.alert("게시글 입력 확인", "게시글은 필수 입력 사항입니다.");
    } else {
      axios.post("http://localhost:8080/v1/posts",
        {
          location: searchPlace,
          emotion: selectedEmotion,
          record: postText,
          is_opened : 1
        }, {
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(function(resp) {
          console.log('게시글 등록 성공!');
        }).catch(error => {
          console.error('API 요청 에러:', error);
        })
    }
  }

  function goGoogleMap() {
    navigation.navigate('GoogleMap');
  }


  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <TouchableOpacity 
          style={styles.uploadBtn}
          onPress={()=>goGoogleMap()}>
          <Text style={styles.uploadBtnText}>위치 검색</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollComponent}>
        <View style={styles.component}>
          <Text>사진업로드(5장)</Text>
          <TouchableOpacity onPress={handlePhotoUpload}>
            <Text>사진을 선택하세요</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.component}>
          <Text>3가지 감정이모지 박스</Text>
          <View style={styles.emotionContainer}>
            <TouchableOpacity
              style={[
                styles.emotionIcon,
                selectedEmotion === 'happy' && styles.selectedEmotion,
              ]}
              onPress={() => handleEmotionSelect(1)}>
              <Text>HAPPY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.emotionIcon,
                selectedEmotion === 'sad' && styles.selectedEmotion,
              ]}
              onPress={() => handleEmotionSelect(2)}>
              <Text>SAD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.emotionIcon,
                selectedEmotion === 'angry' && styles.selectedEmotion,
              ]}
              onPress={() => handleEmotionSelect(3)}>
              <Text>ANGRY</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.component}>
          <Text>글작성({postText.length}/1000)</Text>
          <TextInput
            multiline
            placeholder="여기에 글을 작성해주세요!"
            value={postText}
            onChangeText={handlePostTextChange}
            maxLength={1000}
            style={styles.postTextInput}
          />
        </View>
      </ScrollView>
      <View style={styles.component}>
        <View style={styles.checkBoxContainer}>
          <Text style={{fontSize: 16}}>공개/비공개</Text>
          <CheckBox
            value={isChecked}
            onValueChange={handleCheckBoxChange}
            style={styles.checkBox}
          />
        </View>
        <TouchableOpacity 
          style={styles.uploadBtn}
          onPress={()=>uploadPost()}>
          <Text style={styles.uploadBtnText}>여행기록 업로드</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    // container 감싸고 있는 컴포넌트
    container: {},
    // input을 감싸는 컴포넌트
    textInputContainer: {
      flexDirection: "row",
    },
    // input창
    textInput: {
      backgroundColor: "#c8c7cc",
      borderRadius: 8,
      paddingVertical: 9,
      paddingHorizontal: 12,
      fontSize: 16,
      color: "#6c6c6e",
    },
    // 검색결과 리스트 컴포넌트
    listView: {
      backgroundColor: "#c8c7cc",
      borderRadius: 10,
      paddingHorizontal: 10,
      elevation: 8,
      shadowColor: "#6164BB",
    },
    // 검색결과 행
    row: {
       paddingVertical: 20,
    },
    // 검색결과 divided line
    separator: {
      height: 2,
      backgroundColor: "#c8c7cc",
    },
    // 검색결과 text
    description: {
      fontSize: 15,
    },
    // 필요없음
    loader: {
      flexDirection: "row",
      justifyContent: "flex-end",
      height: 20,
    },
  },
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: wp(7),
    paddingTop: hp(3),
  },
  scrollComponent: {
    marginTop: hp(10),
  },
  component: {
    paddingBottom: hp(2),
  },
  // locationInput: {},
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  emotionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    height: 80,
    borderColor: '#C4C1CC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  emotionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#C4C1CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedEmotion: {
    backgroundColor: '#FFD700', // 선택된 이모지의 배경색 변경
  },
  postTextInput: {
    height: 150,
    borderColor: '#C4C1CC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
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
});

export default PostCreateScreen;
