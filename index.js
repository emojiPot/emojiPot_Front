/**
 * @format
 */
//import {enableScreens} from 'react-native-screens';
import {AppRegistry} from 'react-native';
//enableScreens();

//import App from './src/App';
import App from './Map/ar-map.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
