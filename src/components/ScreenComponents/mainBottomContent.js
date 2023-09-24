import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

function MainBottomContent() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 35) * 0.49; // 스크린 비율에 맞게 이미지 크기 조정

  const postId = 25; // 임시로 하였으며 image 테이블에서 이미지를 가져오면서 postId도 같이 가져올 수 있기 때문에 수정 필요

  const [searchData, setSearchData] = useState([
    {
      id: 0,
      images: [],
    },
  ]);

  useEffect(() => {
      axios.get("http://localhost:8080/v1/images")
        .then(function(resp) {
          const images = resp.data.result;
          // 이미지 uri에서 숫자(게시글 번호) 찾기
          const postNumbers = images.map(image => {
            const match = image.match(/\/(\d+)\//);
            return match ? match[1] : null;
          });

          // 중복 제거
          const uniquePostNumbers = [...new Set(postNumbers)];
          const firstImages = uniquePostNumbers.map(postNumber => {
            return images.find(image => image.includes(`/${postNumber}/`));
          });
          
          const updatedSearchData = [...searchData]; 
          updatedSearchData[0].images = firstImages; 
          setSearchData(updatedSearchData);
        }).catch(error => {
          console.error('API 요청 에러:', error);
        })
   }, [])

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
                        postId: imageData.match(/\/(\d+)\//)[1],
                      })}
                    style={[{width: itemWidth}]}>
                    <Image source={{uri : imageData}} style={styles.image} />
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
