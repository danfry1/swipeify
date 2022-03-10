import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SpotifyWebApi from '../danfry1-spotify/src/spotify-web-api';
import { useSelector } from 'react-redux';

const spotifyApi = new SpotifyWebApi();

const TogglePlay = ({ index, playlistUri, firstSong }) => {
  const token = useSelector((state) => state.token.token);
  spotifyApi.setAccessToken(token);
  const [playing, setPlaying] = useState(true);

  let uriz = playlistUri ? playlistUri[index].track.uri : firstSong;

  useEffect(() => {
    spotifyApi
      .play({
        uris: [uriz],
        position_ms: 40000,
      })
      .then(
        function () {
          console.log(
            '🎶🎶🎶🎶Now Playing: ',
            playlistUri ? playlistUri[index].track.uri : firstSong
          );
        },
        function (err) {
          console.log('nope', err);
        }
      );
  }, [index, firstSong]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: -10,
      }}
    >
      <Pressable
        onPress={() =>
          spotifyApi.pause().then(
            function () {
              setPlaying(false);
              console.log('Playback paused');
            },
            function (err) {
              console.log('nope', err);
            }
          )
        }
        style={{
          display: playing ? 'flex' : 'none',
          marginTop: '5%',
        }}
      >
        <Ionicons name='pause' size={50} color='black' />
      </Pressable>

      <Pressable
        onPress={() =>
          spotifyApi.play().then(
            function () {
              setPlaying(true);
              console.log('Playback resumed');
            },
            function (err) {
              console.log('nope', err);
            }
          )
        }
        style={{
          display: playing ? 'none' : 'flex',
          marginTop: '5%',
        }}
      >
        <Ionicons name='md-play-sharp' size={50} color='black' />
      </Pressable>
    </View>
  );
};

export default TogglePlay;

const styles = StyleSheet.create({});
