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

const DetailScreen = ({route}) => {
  //const {postId} = route.params.postId;
  const {postId} = 1;
  const [liked, setLiked] = useState(false);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [record, setRecord] = useState("");

  // 게시글 상세 조회 서버에서 아직 구현 미완료
  //useEffect(() => {
  //  axios.get('http://localhost:8080/v1/posts/'+{postId})
  //      .then((res) => {
  //         
  //      })
  //      .catch((err)=>{
  //          console.log(err)
  //      })
  //}, [])

  const handleLikePress = () => {
    setLiked(!liked);
  };

  function deletePost() {
    axios.delete('http://localhost:8080/v1/posts/'+{postId})
    .then((res) => {
        Alert.alert("게시글 삭제 완료", "게시글이 성공적으로 삭제되었습니다.");
        // 게시글 목록 화면으로 이동
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  function updatePost() {
    //게시글 수정 페이지로 이동
    //navigation.navigate('');
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
          {/* 이거 하트 아이콘으로 바꾸기 */}
          {/* 좋아요 클릭 DB로 전송 */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={handleLikePress} style={styles.likeButton}> 
                <Text>{liked ? '🖤' : '❤'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.updateButton} onPress={()=>updatePost()}> 
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={()=>deletePost()}> 
             <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <Text>{location}</Text>
          <Text>{record}</Text>
          <Text>댓글도 보여야되구나</Text>
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
  buttonsContainer: {
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
  updateButton: {
    backgroundColor: '#99CCFF',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: '#F5A6A1',
    marginTop: 10,
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
    paddingBottom: 15,
    flexDirection: 'column', // 요소들을 세로로 배치
    marginBottom: 10, // 아래쪽 여백 추가
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  likeButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default DetailScreen;