import 'expo/build/Expo.fx';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { activateKeepAwake } from 'expo-keep-awake';

import App from './App';
import Agenda from './src/screens/Agenda'

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(Agenda);