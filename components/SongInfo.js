import React, { useEffect, useState } from 'react';
import { View, Text, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SpotifyWebApi from '../danfry1-spotify/src/spotify-web-api';
import SelectDropdown from 'react-native-select-dropdown';
import * as playlistAddAction from '../store/actions/playlistAdd';
import { useSelector, useDispatch } from 'react-redux';
import AutoScroll from '@homielab/react-native-auto-scroll';
import { TextInput } from 'react-native-gesture-handler';

const spotifyApi = new SpotifyWebApi();

const SongInfo = ({ index, playlist, addToPlaylist, playlistUri }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const [playlistAddingTo, setPlaylistAddingTo] = useState('');
  const [user, setUser] = useState();

  spotifyApi.setAccessToken(token);

  useEffect(() => {
    spotifyApi.getPlaylist(addToPlaylist).then(
      function (data) {
        setPlaylistAddingTo(data.body.name);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
  }, []);

  useEffect(() => {
    spotifyApi
      .getUserPlaylists('pw1iz1z1qx58xfcc77txufmj7', { limit: 10 })
      .then(
        function (data) {
          setUser(data.body.items);
        },
        function (err) {
          console.log('sorry', err);
        }
      );
  }, []);

  return (
    <View>
      {playlist.length === 0 ? (
        <Text>Sorry</Text>
      ) : playlistUri[index].track.name.split('(').join('-').split('-')[0]
          .length >= 21 ? (
        <AutoScroll delay={2300} endPadding={20}>
          <Text
            style={{
              color: 'black',
              left: 20,
              fontSize: 42,
              // fontSize: 32,
              fontFamily: 'Gill Sans',
              marginTop: 20,
            }}
          >
            <Ionicons name='musical-note' size={30} color='black' />
            {playlistUri[index].track.name.split('(').join('-').split('-')[0]}
          </Text>
        </AutoScroll>
      ) : (
        <Text
          style={{
            color: 'black',
            left: 20,
            fontSize: 42,
            // fontSize: 32,
            fontFamily: 'Gill Sans',
            marginTop: 20,
          }}
        >
          <Ionicons name='musical-note' size={30} color='black' />{' '}
          {playlistUri[index].track.name.split('(').join('-').split('-')[0]}
        </Text>
      )}
      {playlist.length === 0 ? (
        <Text>Sorry</Text>
      ) : (
        <Text
          style={{
            color: 'black',
            left: 20,
            fontSize: 26,
            fontFamily: 'Gill Sans',
            marginTop: 10,
          }}
        >
          <Ionicons name='person-outline' size={30} color='black' />{' '}
          {playlistUri[index].track.album.artists[0].name}
        </Text>
      )}
      {playlist.length === 0 ? (
        <Text>Sorry</Text>
      ) : (
        <Text
          style={{
            color: 'black',
            left: 20,
            marginTop: 10,
            fontSize: 22,
            fontFamily: 'Gill Sans',
          }}
        >
          <MaterialCommunityIcons
            name='playlist-music'
            size={24}
            color='black'
          />{' '}
          {playlist.name}
        </Text>
      )}
      <View
        style={{
          alignSelf: 'center',
          marginTop: 10,
          marginBottom: -15,
        }}
      >
        <SelectDropdown
          data={
            user ? user.filter((el) => el.owner.display_name === 'danfry') : ''
          }
          onSelect={(selectedItem, index) => {
            console.log(selectedItem.name, index);
            dispatch(playlistAddAction.playlistAdd(selectedItem.id));
          }}
          defaultButtonText={playlistAddingTo}
          // defaultButtonText={'⬇️'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.name;
          }}
          rowTextForSelection={(item, index) => {
            return item === playlistAddingTo ? playlistAddingTo : item.name;
          }}
          buttonStyle={{
            height: 40,
            // width: dropdown ? 120 : 60,
            marginTop: 10,
            width: 200,
            borderRadius: 1000,
            backgroundColor: '#ECECEC',
          }}
          dropdownBackgroundColor='#ECECEC'
        />
      </View>
    </View>
  );
};

export default SongInfo;
