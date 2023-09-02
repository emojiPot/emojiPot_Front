import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function MainBottomContent() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 35) * 0.49; // 스크린 비율에 맞게 이미지 크기 조정

  const postId = 16; // 임시로 하였으며 image 테이블에서 이미지를 가져오면서 postId도 같이 가져올 수 있기 때문에 수정 필요

  const searchData = [
    {
      id: 0,
      images: [
        require('../../assest/images/post1.jpg'),
        require('../../assest/images/post2.jpg'),
      ],
    },
    // 필요한 경우 데이터를 추가할 수 있습니다
  ];

  return (
    <View>
      {searchData.map((data, index) => {
        return (
          <View key={data.id} style={styles.row}>
            {data.images.map((imageData, imgIndex) => {
              return (
                <View key={imgIndex} style={styles.content}>
                  <TouchableOpacity
                      onPress={() => navigation.navigate('Detail', {
                        postId: postId,
                      })}
                    style={[{width: itemWidth}]}>
                    <Image source={imageData} style={styles.image} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  content: {
    marginBottom: 10,
    width: '49%',
  },
});

export default MainBottomContent;
