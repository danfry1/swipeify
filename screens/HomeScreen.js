import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, SafeAreaView, Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import TogglePlay from '../components/TogglePlay';
import SwipeCard from '../components/SwipeCard';
import SongInfo from '../components/SongInfo';
import SpotifyWebApi from '../danfry1-spotify/src/spotify-web-api';
import { useSelector } from 'react-redux';

const spotifyApi = new SpotifyWebApi();

const HomeScreen = (props) => {
  const [index, setIndex] = useState(0);
  const [playlistLength, setPlaylistLength] = useState();
  const [playlistUri, setPlaylistUri] = useState();
  const [firstSong, setFirstSong] = useState();
  console.log('💯💯💯💯index', index);
  const onSwiped = () => {
    if (index === playlistLength - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };
  const token = useSelector((state) => state.token.token);
  const [playlistItems, setPlaylistItems] = useState([]);
  spotifyApi.setAccessToken(token);
  console.log('playlist songs are coming from', props.route.params.playlist);
  useEffect(() => {
    spotifyApi.getPlaylist(props.route.params.playlist).then(
      function (data) {
        setFirstSong(data.body.tracks.items[0].track.uri);
        setPlaylistUri(data.body.tracks.items);
        setPlaylistLength(data.body.tracks.items.length);
        setPlaylistItems(data.body);
      },
      function (err) {
        console.log('sorry', err);
      }
    );
  }, []);

  let playlistAdd = props.route.params.playlistToAddTo;

  return (
    <SafeAreaView style={{ backgroundColor: '#667761', height: '100%' }}>
      <View style={styles.container}>
        <StatusBar style='light' />
        <SongInfo
          index={index}
          playlist={playlistItems}
          addToPlaylist={playlistAdd}
          playlistUri={playlistUri}
        />
        {/* '#4f772d' */}
        {playlistItems ? (
          <TogglePlay
            index={index}
            playlistUri={playlistUri}
            firstSong={firstSong}
          />
        ) : (
          <Text>Sorry</Text>
        )}
        <View
          style={{
            backgroundColor: '#fff1e6',
            height: '64%',
            marginTop: 30,
            borderColor: '#ECECEC',
            borderWidth: 5,
          }}
        >
          <SwipeCard
            index={index}
            onSwiped={onSwiped}
            playlist={playlistItems}
            addToPlaylist={playlistAdd}
            playlistUri={playlistUri}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#667761',
  },
});
