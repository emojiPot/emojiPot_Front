import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import CommentScreen from './CommentScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const DetailScreen = ({route}) => {
  const navigation = useNavigation();
  const postId = route.params.postId;
  //const postId = 1;
  const [liked, setLiked] = useState(false);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [record, setRecord] = useState("");
  const [showCommentScreen, setShowCommentScreen] = useState(false);
  const [token, setToken] = useState('');

  // 화면 시작할 때 바로 서버에서 해당 게시글의 정보 가져오기
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

  // 로그인했을 때 저장한 토큰 가져오기
  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token') || '';
      console.log('토큰 확인');
      console.log(storedToken);
      setToken(storedToken);
      if (token == null) { console.log('Token not found');}
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

  // 게시글 좋아요 반영
  const handleLikePress = () => {
    setLiked(!liked);
  };

  // 댓글 페이지로 이동
  const handleGoCmd = () => {
    navigation.navigate('CommentScreen', {
      postId: postId,
    });
  };

  // 게시글 삭제
  function deletePost() {
    getToken();
    axios.delete('http://localhost:8080/v1/posts/' + postId, 
    {
      headers: {
        'Authorization' : 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
        Alert.alert("게시글 삭제 완료", "게시글이 성공적으로 삭제되었습니다.");
        navigation.goBack(null);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  // 게시글 수정
  function updatePost() {
    navigation.navigate('Update', {
      postId: postId,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.posts}>
        {/* 프로필, 팔로우, 스크랩 버튼 한 묶음 */}
        <View style={styles.postHeader}>
          <Image
            source={require('../assest/images/post2.jpg')} // 프로필 사진 경로 
            style={styles.profileImage}
            resizeMode="cover"
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.buttonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scrapButton}>
              <Text style={styles.buttonText}>Scrap</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={require('../assest/images/post1.jpg')} // DB에서 이미지 가져와서 출력
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.postInfo}>
          {/* {showCommentScreen && <CommentScreen />} */}
          {/* 좋아요 클릭 DB로 전송 */}
          <View style={styles.likeCmdBtnContainer}>
            <TouchableOpacity onPress={handleLikePress}> 
              {liked ? <AntDesign name="hearto" size={20} color="black" marginRight={10}/> : <AntDesign name="heart" size={20} color="black" marginRight={10}/>}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGoCmd}> 
              <Fontisto name="comment" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.delUpBtnContainer}>
            <TouchableOpacity onPress={()=>updatePost()}> 
              <AntDesign name="ellipsis1" size={20} color="black" marginRight={10}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={()=>deletePost()}> 
             <EvilIcons name="trash" size={30} color="black" marginRight={10}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.postContent}>
          <Text style={styles.postText}>{location}</Text>
          <Text style={styles.postText}>{record}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: wp(1),
    paddingTop: hp(2),
  },
  posts: {
    marginHorizontal: wp(3),
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  likeCmdComponent: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCmdBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 5,
  },
  delUpBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  followButton: {
    backgroundColor: '#F5A6A1',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrapButton: {
    backgroundColor: '#C4C1CC',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  image: {
    width: 'auto',
    height: hp(40),
    borderRadius: 6,
  },
  postInfo: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
    flexDirection: 'row',
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postText: {
    color: '#343639',
    marginBottom: 10,
  },
  postContent: {
    flexDirection: 'col',
    paddingHorizontal: 10,
  }
});

export default DetailScreen;
