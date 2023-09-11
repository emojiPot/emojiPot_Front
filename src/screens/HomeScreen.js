import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
import SearchBox from '../components/ScreenComponents/searchBox';
import MainTopContent from '../components/ScreenComponents/mainTopContent';
import MainBottomContent from '../components/ScreenComponents/mainBottomContent';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SearchBox />
      <MainTopContent />
      <View style={styles.popularContentContainer}>
        <Text style={styles.popularText}>인기게시물</Text>
      </View>
      <ScrollView style={styles.bottomContent}>
        <MainBottomContent />
        <MainBottomContent />
        <MainBottomContent />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  popularContentContainer: {
    marginTop: 20,
  },
  popularText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 20,
    color: 'black',
  },
  bottomContent: {
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
