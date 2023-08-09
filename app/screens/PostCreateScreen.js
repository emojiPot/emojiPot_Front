import React, {useState} from 'react';
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
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// 이미지 받아오기
// import ImagePicker from 'react-native-image-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// 여기서 const 로직들 다시 원하는 방향으로 바꾸기
const PostCreateScreen = () => {
  // 위치 받아오기
  const [location, setLocation] = useState('');

  const handleLocationChange = text => {
    setLocation(text);
  };

  // 날짜 받아오기
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selected) => {
    if (selected) {
      setSelectedDate(selected);
    }
    setShowDatePicker(false);
  };

  //사진 받아오기
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handlePhotoUpload = () => {
    // Implement your logic to handle photo uploads here
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.component}>
          <Text>위치저장</Text>
          {/* 근데 위치 받는거 텍스트로 입력받아두 되는걸까..? 따로 기능이 있는 걸까? */}
          <TextInput
            placeholder="위치를 입력해주세요!"
            value={location}
            onChangeText={handleLocationChange}
            style={styles.locationInput}
          />
        </View>
        <View style={styles.component}>
          <Text>날짜입력</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text>{selectedDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="calendar"
              onChange={handleDateChange}
            />
          )}
        </View>
        <View style={styles.component}>
          <Text>사진업로드(5장)</Text>
        </View>
        <View style={styles.component}>
          <Text>3가지 감정이모지 박스</Text>
          <View style={styles.emotionContainer}>
            <TouchableOpacity
              style={[
                styles.emotionIcon,
                selectedEmotion === 'happy' && styles.selectedEmotion,
              ]}
              onPress={() => handleEmotionSelect('happy')}>
              <Text>HAPPY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.emotionIcon,
                selectedEmotion === 'sad' && styles.selectedEmotion,
              ]}
              onPress={() => handleEmotionSelect('sad')}>
              <Text>SAD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.emotionIcon,
                selectedEmotion === 'angry' && styles.selectedEmotion,
              ]}
              onPress={() => handleEmotionSelect('angry')}>
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
        <View style={styles.component}>
          <Text>공개/비공개</Text>
          {/* <CheckBox></CheckBox> */}
        </View>
      </ScrollView>
      <View style={styles.component}>
        <TouchableOpacity style={styles.uploadBtn}>
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
    paddingLeft: wp(7),
    paddingRight: wp(7),
    paddingTop: hp(3),
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

export default PostCreateScreen;
