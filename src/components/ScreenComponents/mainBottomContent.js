import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import FontAwesome from "react-native-vector-icons/FontAwesome";

function MainBottomContent() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 35) * 0.49; // 스크린 비율에 맞게 이미지 크기 조정

  const [searchData, setSearchData] = useState([
    {
      id: 0,
      images: [],
      location: '',
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res1 = await axios.get("http://localhost:8080/v1/images");
        const images = res1.data.result;

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
      
        // const res2 = await axios.get('http://localhost:8080/v1/posts/');
        // const posts = res2.data.result;

        // const includeImagePostId = uniquePostNumbers.map(postNumber => {
        //   const matchPost = posts.find(post => String(post.postId) == postNumber)
        //   if(matchPost) {
        //     const tmpLocation = matchPost.location.length > 12 ? `${matchPost.location.substring(0, 12)}...` : matchPost.location;
        //     return tmpLocation;
        //   }
        //   else return "...";
        // });

        // updatedSearchData[0].location = includeImagePostId; 
        // setSearchData(updatedSearchData);
        // console.log(searchData);
      }catch(error) {
        console.log("에러 발생 : ", error);
      }
    };

    fetchData();
   }, [])

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity 
          style={styles.mainBtnStyle}
          >
          <View style={styles.mainBtnContainer}>
            <Image
              source={require('../../assest/images/popular.png')} 
              style={styles.mainBtnImage}
              resizeMode="cover"
            />
            <Text style={styles.mainBtnText}>인기게시물{'\n'}확인하기</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.mainBtnStyle}
          >
          <View style={styles.mainBtnContainer}>
            <Image
              source={require('../../assest/images/random.png')} 
              style={styles.mainBtnImage}
              resizeMode="cover"
            />
            <Text style={styles.mainBtnText}>랜덤으로{'\n'}확인하기</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  mainBtnStyle: {
    width: 150,
    height: 50,
    borderColor: '#C4C1CC',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
    justifyContent: 'center',
  },
  mainBtnText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  mainBtnImage: {
    width: 35,
    height: 35,
    borderRadius: 30,
    marginLeft: 10,
  },
  mainBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
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
  imageText: {
    color:'black',
    marginLeft: 5,
  },
});

export default MainBottomContent;
