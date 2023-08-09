import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

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
  const data = [
    {
      title: 'woorim',
    },
    {
      title: 'woorim',
    },
  ];
  return (
    <FlatList
      data={data}
      renderItem={({item, i}) => (
        <View style={styles.container} key={i}>
          <View>
            <Text style={styles.itemNameText}>{item.title}</Text>
          </View>
          <View></View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginHorizontal: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    height: 86,
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
  itemNameText: {
    fontSize: 20,
  },
});

export default LikesScreen;
