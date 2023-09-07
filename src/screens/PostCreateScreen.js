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
          console.log('게시글 수정 성공!');
          Alert.alert("게시글 수정 성공!", "게시글이 성공적으로 수정되었습니다.");
          navigation.navigate('TabNav');
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
      <View style={styles.component1}>
        <TouchableOpacity 
          style={styles.componetn1Btn}
          onPress={()=>goGoogleMap()}>
          <Text style={styles.componentText}>위치 검색</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.componetn1Btn}
          onPress={handlePhotoUpload}>
            <Text style={styles.componentText}>사진업로드(5장)</Text>
        </TouchableOpacity>
      </View>
      {/* 검색한 장소를 업로드 버튼 클릭 시 가져오고 있기 때문에 바로 출력이 안 됨 -> 어떻게 해결할 수 있을지.. */}
      <Text style={styles.searchLocationText}>🚩 {searchPlace}</Text> 
      <ScrollView style={styles.scrollComponent}>
        <View style={styles.component}>
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
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: wp(7),
    paddingTop: hp(3),
  },
  scrollComponent: {
    marginTop: hp(3),
  },
  component1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(2),
  },
  componetn1Btn: {
    backgroundColor: '#C4C1CC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  component2: {
    paddingBottom: hp(2),
  },
  componentText: {
    color: 'black',
  },
  searchLocationText: {
    color: 'black',
    borderColor: '#dee2e6',
    borderWidth: 1,
    borderRadius: 5,
    padding: 7,
  },
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
