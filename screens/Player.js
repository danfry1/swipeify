import {
  View,
  Text,
  Dimensions,
  Pressable,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import SpotifyWebApi from '../danfry1-spotify/src/spotify-web-api';
import { useSelector } from 'react-redux';

const spotifyApi = new SpotifyWebApi();
const Player = () => {
  const token = useSelector((state) => state.token.token);
  const [playlistUri, setPlaylistUri] = useState();
  spotifyApi.setAccessToken(token);
  useEffect(() => {
    spotifyApi.getPlaylist('7GtNYCxYHF6dxGOElPUQTL').then(
      function (data) {
        // console.log('Some information about this playlist', data.body);
        // setFirstSong(data.body.tracks.items[0].track.uri);
        setPlaylistUri(data.body.tracks.items);
        // setPlaylistLength(data.body.tracks.items.length);
        // setPlaylistItems(data.body);
      },
      function (err) {
        console.log('Something went wrong!');
      }
    );
  }, []);

  const Item = ({ title, image }) => (
    <View style={styles.item}>
      <Pressable style={{ height: '100%', width: '100%' }}>
        {/* {console.log(title)} */}
        <Image
          source={{
            uri: image,
          }}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 1000,
            zIndex: -5,
          }}
        />
      </Pressable>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item} image={item.track.album.images[0].url} />
  );

  return (
    <View style={{ top: 150, height: '100%' }}>
      <Carousel
        layout={'stack'}
        layoutCardOffset={10}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={200}
        data={playlistUri}
        renderItem={renderItem}
        keyExtractor={(item) => item.track.id}
        horizontal={true}
        style={{
          marginBottom: -100,
          zIndex: -2,
        }}
      />
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 200,
    width: 200,
    borderRadius: 1000,
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
