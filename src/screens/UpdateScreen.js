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

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const UpdateScreen = ({route}) => {
  const postId = route.params.postId;
  const [location, setLocation] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [record, setRecord] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/v1/posts/' + postId)
        .then((res) => {
          setLocation(res.data.result.location);
          setRecord(res.data.result.record);
        })
        .catch((err)=>{
            console.log(err)
        })
   }, [])

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

  const handleEmotionSelect = emotion => {
    setSelectedEmotion(emotion);
  };

  const handlePostTextChange = text => {
    setRecord(text);
  };

  // 위치 검색
  const getSearchPlace = async () => {
    try {
      const getPlace = await AsyncStorage.getItem('updatePlace') || '';
      console.log('검색 장소 확인');
      console.log(getPlace);
      setLocation(getPlace);
      if (location == null) { console.log('Update Place not found');}
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

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

  // 404 오류가 뜨는데 로그가 제대로 안 찍혀서 원인을 알 수 없음 > 해결 필요
  function uploadPost() {
    getToken();
    if(location.trim() == "") {
      Alert.alert("위치 입력 확인", "장소는 필수 입력 사항입니다.");
    } else if(record.trim() == "") {
      Alert.alert("게시글 입력 확인", "게시글은 필수 입력 사항입니다.");
    } else {
      axios.patch("http://localhost:8080/v1/posts"+postId,  
        {
          location: location,
          emotion: selectedEmotion,
          record: record
        }, {
          headers: {
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        }).then(function(resp) {
          console.log('게시글 수정 성공!');
        }).catch(error => {
          console.error('API 요청 에러:', error);
        }) 
    }
  }

  function goGoogleMap() {
    navigation.navigate('GoogleMapUpdate');
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
          <Text>글작성({record.length}/1000)</Text>
          <TextInput
            multiline
            placeholder="여기에 글을 작성해주세요!"
            value={record}
            onChangeText={handlePostTextChange}
            maxLength={1000}
            style={styles.postTextInput}
          />
        </View>
        <View style={styles.component}>
          <Text>공개/비공개</Text>
          {/* <CheckBox></CheckBox> */}
        </View>
      </ScrollView>
      <View style={styles.component}>
        <TouchableOpacity 
          style={styles.uploadBtn}  
          onPress={()=>uploadPost()}>
          <Text style={styles.uploadBtnText}>게시글 수정</Text>
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
  locationInput: {},
  postTextInput: {
    height: 150,
    borderColor: '#C4C1CC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    color: 'black',
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
});

export default UpdateScreen;
