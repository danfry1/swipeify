import { View, Text, FlatList, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import SpotifyWebApi from '../danfry1-spotify/src/spotify-web-api';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import AutoScroll from '@homielab/react-native-auto-scroll';

const spotifyApi = new SpotifyWebApi();

const TopTracksScreen = () => {
  const token = useSelector((state) => state.token.token);
  spotifyApi.setAccessToken(token);

  const [topTracks, setTopTracks] = useState();
  useEffect(() => {
    spotifyApi.getMyTopTracks().then(
      function (data) {
        setTopTracks(data.body.items);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#667761', height: '100%' }}>
      <View style={{ height: '100%', width: '100%' }}>
        <View
          style={{
            height: '10%',
            width: '100%',
            borderBottomWidth: 2,
            borderBottomColor: '#fff',
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 32,
              padding: 20,
              fontWeight: '700',
            }}
          >
            <Ionicons name='heart-circle-outline' size={30} /> Your Top Tracks
          </Text>
        </View>
        <FlatList
          data={topTracks}
          renderItem={({ item, index }) => (
            <View
              style={{
                // height: 110,
                // borderWidth: 3,
                // margin: 15,

                marginLeft: 10,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ fontSize: 24, marginRight: 10, fontWeight: '500' }}
              >
                {index + 1}
              </Text>
              <Image
                source={{ uri: item ? item.album.images[0].url : 'no' }}
                style={{ height: 60, width: 60, borderRadius: 8 }}
              />
              <View style={{ marginLeft: 10 }}>
                {item.name.length > 27 ? (
                  <AutoScroll delay={3000} endPadding={10}>
                    <Text style={{ fontSize: 24 }}>{item.name}</Text>
                  </AutoScroll>
                ) : (
                  <Text style={{ fontSize: 24 }}>{item.name}</Text>
                )}

                <Text>{item.artists[0].name}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default TopTracksScreen;
