import React from 'react';
// import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/ProfileScreen';
import FromToScreen from './screens/FromToScreen';
import PlayerScreen from './screens/Player';
import TopTracksScreen from './screens/TopTracksScreen';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import tokenReducer from './store/reducers/token';
import playlistAddReducer from './store/reducers/playlistAddReducer';

const reducers = combineReducers({
  token: tokenReducer,
  playlistAdd: playlistAddReducer,
});

const store = createStore(reducers);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name='Login'
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name='Home'
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name='Main'
            component={MainScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name='Profile'
            component={ProfileScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name='FromTo'
            component={FromToScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name='Player'
            component={PlayerScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name='TopTracks'
            component={TopTracksScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
