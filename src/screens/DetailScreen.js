import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DetailScreen = () => {
  // route.params 에서 전달된 데이터를 가져올 수 있습니다.
  //   const {content} = route.params;

  // 좋아요 상태와 이를 변경하는 함수를 생성합니다
  const [liked, setLiked] = useState(false);

  const handleLikePress = () => {
    setLiked(!liked);
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
          <TouchableOpacity onPress={handleLikePress} style={styles.likeButton}>
            <Text style={styles.likeText}>{liked ? 'Unlike' : 'Like'}</Text>
          </TouchableOpacity>
          <Text>위치정보가져와야지</Text>
          <Text>해당 post의 글 가져와야지</Text>
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
});

export default DetailScreen;
