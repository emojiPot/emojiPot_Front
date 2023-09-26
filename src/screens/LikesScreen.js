import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Feather from "react-native-vector-icons/Feather";
// 반응형만들기
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// flatList는 저장된 데이터를 받아오는 거기 때문에
// 근데 여기에서 내가 저장한 글들의 목록을 받아오는 거기 때문에
// data를 받아오는 Flatlist로 써두되지 않을까..?
// 사진이랑 제목보이게해서 클릭하면 해당 게시물로 넘어가도록

const LikesScreen = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [isLiked, setIsLiked] = useState([]);

  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token') || '';
      console.log('토큰 확인 : ');
      console.log(storedToken);
      setToken(storedToken);
      if (storedToken == null) { console.log('Token not found');}
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

  useEffect(() => {
    getToken();

    axios.get('http://localhost:8080/v1/posts', 
      {
        headers: {
          'Authorization' : 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        const posts = res.data.result;
        console.log(posts);
        setIsLiked(posts.filter(post => post.likeNum == 1));
        console.log(isLiked);
      })
      .catch((err)=>{
        console.error('API 요청 에러:', err);
      })
  }, [])

  return (
    <FlatList
      data={isLiked}
      renderItem={({item, i}) => (
        <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {
          postId: item.postId,
        })}>
          <View style={styles.container} key={i}>
            <View>
              <View style={styles.titleContainer}>
                <Text style={styles.itemNameText}>{item.username}</Text>
                <Text style={styles.itemContentText}>{item.createdAt}</Text>
              </View>
              <View style={styles.locationComponent}>
                <Feather name="map-pin" size={15} color="black"/>
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
              <Text style={styles.itemContentText}>{item.record}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 12,
    marginHorizontal: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    height: 110,
    shadowColor: '#f1f2f3',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 18.95,
    elevation: 1,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    borderColor: '#F2F3F4',
    borderWidth: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  itemNameText: {
    fontSize: 20,
    color: 'black',
  },
  itemContentText: {
    color: 'black',
  }, 
  locationText: {
    color: 'black',
    marginLeft: 5,
  },
  locationComponent: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default LikesScreen;
