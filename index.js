/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import RouterApp from './src/router';
import {name as appName} from './app.json';

const App = RouterApp({database: null});

AppRegistry.registerComponent(appName, () => App);
