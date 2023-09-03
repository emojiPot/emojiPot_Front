import React from 'react';
import {View, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

const App = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js',
        }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default App;
