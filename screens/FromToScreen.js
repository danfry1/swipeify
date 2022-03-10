import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import SpotifyWebApi from '../danfry1-spotify/src/spotify-web-api';

const spotifyApi = new SpotifyWebApi();

const FromToScreen = (props) => {
  const token = useSelector((state) => state.token.token);
  spotifyApi.setAccessToken(token);
  const user = props.route.params.user;
  const playlistName = props.route.params.playlistName;
  const navigation = props.navigation;
  const [vis, setVis] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState('');
  const goToSwipe = (id) => {
    console.log('id😃😃😃😃', id.name);
    console.log('new playlist', newPlaylist);
    if (id.name === 'New Playlist') {
      spotifyApi
        .createPlaylist('Swipeify', {
          description: 'This playlist was created using Swipeify',
          public: true,
        })
        .then(
          function (data) {
            console.log('data idid', data.body.id);
            // setNewPlaylist(data.body.id);
            id.id = data.body.id;
            console.log('Created a new playlist!');
          },
          function (err) {
            console.log('sorry', err);
          }
        );
    }

    setVis(!vis);
    setTimeout(() => {
      navigation.replace('Home', {
        playlist: props.route.params.playlist,
        playlistToAddTo: id.id,
        user: user,
      });
    }, 1200);
  };

  const Item = ({ title, image }) => (
    <View style={styles.item}>
      <Pressable
        onPress={() => {
          slideImage();
          goToSwipe(title);
        }}
        style={{ height: '100%', width: '100%' }}
      >
        <Image
          source={
            image.length === 0
              ? {
                  uri: 'no',
                }
              : {
                  uri: image[0].url,
                }
          }
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 8,
            zIndex: -5,
          }}
        />
        <Text style={styles.name}>{title.name}</Text>
      </Pressable>
    </View>
  );

  // id = pw1iz1z1qx58xfcc77txufmj7
  const renderItem = ({ item }) => {
    return <Item title={item} image={item.images} />;
  };

  const dropCard = useRef(new Animated.Value(0)).current;

  const slideImage = () => {
    let anim = Animated.timing(dropCard, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });
    anim.start();
  };

  const yVal = dropCard.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 313],
  });

  const animStyle = {
    transform: [{ translateY: yVal }],
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Pressable>
        <Animated.View style={[styles.animatedz, animStyle]}>
          <Text
            style={{
              fontSize: 26,
              color: 'white',
              // display: vis ? 'none' : 'flex',
              alignSelf: 'center',
              top: 80,
            }}
          >
            {playlistName}
          </Text>
          <Image
            source={{ uri: props.route.params.playlistImage }}
            style={{
              height: 200,
              width: 200,
              alignSelf: 'center',
              top: 90,
              borderRadius: 8,
              zIndex: 10,
            }}
          />
        </Animated.View>
      </Pressable>

      <Ionicons
        name='arrow-down'
        size={50}
        style={{
          color: !vis ? 'white' : 'black',
          zIndex: -10,
          alignSelf: 'center',
          top: '15%',
        }}
      />

      <View style={{ top: 150, height: '100%' }}>
        <Carousel
          sliderWidth={Dimensions.get('window').width}
          itemWidth={200}
          data={[
            {
              id: newPlaylist || '1212',
              name: 'New Playlist',
              images: [
                {
                  url: 'https://thumbs.dreamstime.com/b/plus-button-icon-plus-button-icon-vector-illustration-105545139.jpg',
                },
              ],
            },
            ...user.items.filter(
              (el) =>
                el.name !== playlistName && el.owner.display_name === 'danfry'
            ),
          ]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          style={{
            marginBottom: -100,
            zIndex: -2,
          }}
        />
      </View>
    </View>
  );
};

export default FromToScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'black',
    height: 200,
    width: 200,
    borderRadius: 8,
  },
  name: {
    fontSize: 26,
    color: 'white',
  },
  title: {
    fontSize: 32,
    color: 'white',
    left: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  button: {
    flex: 0.2,
    width: 200,
    height: 200,
    color: 'purple',
    backgroundColor: 'pink',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    borderRadius: 8,
  },
  animatedz: {
    zIndex: 100,
  },
});
