import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CommentScreen from './CommentScreen';

const DetailScreen = () => {
  // route.params 에서 전달된 데이터를 가져올 수 있습니다.
  //   const {content} = route.params;

  // 좋아요 상태와 이를 변경하는 함수를 생성합니다
  const [liked, setLiked] = useState(false);

  const handleLikePress = () => {
    setLiked(!liked);
  };

  const [showCommentScreen, setShowCommentScreen] = useState(false);

  const handleCommentPress = () => {
    setShowCommentScreen(true); // CommentScreen 컴포넌트를 렌더링할지 결정
  };

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
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.scrapButton}>
              <Text style={styles.scrapButtonText}>Scrap</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={require('../assest/images/post1.jpg')} // 이미지 경로
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.postInfo}>
          {/* 이거 하트 아이콘으로 바꾸기 */}
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={handleLikePress}>
              <Icon
                name={liked ? 'heart' : 'heart-outline'}
                size={30}
                color="#C4C1CC"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCommentPress}>
              <Icon
                name="chatbubble-ellipses-outline"
                size={30}
                color="#C4C1CC"
              />
            </TouchableOpacity>
          </View>

          <Text>위치정보가져와야지</Text>
          <Text>해당 post의 글 가져와야지</Text>
        </View>
        {showCommentScreen && <CommentScreen />}
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
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrapButton: {
    backgroundColor: '#C4C1CC',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  scrapButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
    backgroundColor: '#C4C1CC',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  likeText: {
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
});

export default DetailScreen;
