import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import SpotifyWebApi from '../danfry1-spotify/src/spotify-web-api';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
const spotifyApi = new SpotifyWebApi();

const ProfileScreen = ({ navigation }) => {
  const token = useSelector((state) => state.token.token);
  const [user, setUser] = useState({});
  spotifyApi.setAccessToken(token);
  const goToSwipe = () => {
    navigation.navigate('Main');
  };
  const goToTopTracks = () => {
    navigation.navigate('TopTracks');
  };
  useEffect(() => {
    spotifyApi.getMe().then(
      function (data) {
        console.log('user data', data.body);
        setUser(data.body);
      },
      function (err) {
        console.log('sorry', err);
      }
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <Ionicons
        size={30}
        name='arrow-back-outline'
        style={styles.button}
        onPress={goToSwipe}
      />
      <Image
        source={
          user.images
            ? {
                uri: user.images[0].url,
              }
            : {
                uri: 'no',
              }
        }
        style={{
          height: 200,
          width: 200,
          marginTop: 70,
          borderRadius: 8,
          marginBottom: 20,
        }}
      />
      <Text style={{ color: 'white', fontSize: 42 }}>@{user.display_name}</Text>

      <View style={{ alignItems: 'flex-start' }}>
        <Text
          style={{
            color: 'white',
            marginTop: 24,
            fontSize: 26,
          }}
        >
          <Ionicons
            name='people'
            size={30}
            style={{ color: 'white', marginTop: 20 }}
          />{' '}
          {user.followers ? user.followers.total : ''}
        </Text>

        <Text style={{ color: 'white', fontSize: 32, marginTop: 20 }}>
          <Ionicons
            name='mail-outline'
            size={30}
            style={{ color: 'white', marginTop: 20 }}
          />{' '}
          {user.email}
        </Text>
        <Text style={{ color: 'white', marginTop: 20, fontSize: 26 }}>
          <Ionicons
            name='star-outline'
            size={30}
            style={{ color: 'white', marginTop: 20 }}
          />{' '}
          {user.product}
        </Text>
      </View>
      <Pressable
        style={{
          width: 200,
          height: 50,
          marginTop: 20,
          borderRadius: 8,
          backgroundColor: '#667761',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={goToTopTracks}
      >
        <Text style={{ fontSize: 26, color: 'white' }}>Top Tracks</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  button: {
    marginTop: 20,
    flex: 0.2,
    color: 'white',
    position: 'relative',
    left: -140,
    top: 40,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});
