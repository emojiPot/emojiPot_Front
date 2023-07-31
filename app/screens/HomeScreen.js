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
      <ScrollView>
        <MainTopContent />
        <View style={styles.popularContentContainer}>
          <Text style={styles.popularText}>인기게시물</Text>
          <MainBottomContent />
        </View>
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
  },
});

export default HomeScreen;
