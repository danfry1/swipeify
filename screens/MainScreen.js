import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  StatusBar,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import SpotifyWebApi from '../danfry1-spotify/src/spotify-web-api';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from 'react-native-dynamic-search-bar';
const spotifyApi = new SpotifyWebApi();

const MainScreen = ({ navigation }) => {
  const token = useSelector((state) => state.token.token);
  const [user, setUser] = useState({});
  // {
  //   id: '28736378928',
  //   owner: {
  //     display_name: 'danfry',
  //   },
  //   name: 'New Playlist',
  //   images: [
  //     {
  //       url: 'https://thumbs.dreamstime.com/b/plus-button-icon-plus-button-icon-vector-illustration-105545139.jpg',
  //     },
  //   ],
  // }
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [search, setSearch] = useState(null);
  const [searchQuery, setSearchQuery] = useState(false);
  const [searchedPlaylist, setSearchedPlaylist] = useState();
  spotifyApi.setAccessToken(token);
  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const goToSwipe = (id) => {
    navigation.navigate('FromTo', {
      playlistImage: id.images[0].url,
      playlistName: id.name,
      playlist: id.id,
      user: user,
    });
  };

  const searchPlaylists = () => {
    if (!search) return;
    spotifyApi.searchPlaylists(search, { limit: 10 }).then(
      function (data) {
        // console.log('Found playlists are', data.body);
        setSearchedPlaylist(data.body);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
    setSearchQuery(!searchQuery);
  };
  // console.log(search);

  useEffect(() => {
    spotifyApi
      .getUserPlaylists('pw1iz1z1qx58xfcc77txufmj7', { limit: 10 })
      .then(
        function (data) {
          setUser(data.body);
        },
        function (err) {
          console.log('sorry', err);
        }
      );
  }, []);

  useEffect(() => {
    spotifyApi
      .getFeaturedPlaylists({
        limit: 10,
        offset: 0,
        country: 'US',
        locale: 'en-US',
        timestamp: new Date().toISOString(),
      })
      .then(
        function (data) {
          setFeaturedPlaylists(data.body);
        },
        function (err) {
          console.log('sorry', err);
        }
      );
  }, []);

  useEffect(() => {
    spotifyApi.getNewReleases({ limit: 10, offset: 0, country: 'US' }).then(
      function (data) {
        setNewReleases(data.body);
      },
      function (err) {
        console.log('sorry', err);
      }
    );
  }, []);

  const Item = ({ title, image }) => (
    <View style={styles.item}>
      <Pressable
        onPress={() => goToSwipe(title)}
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
          }}
        />
        <Text style={styles.name}>{title.name}</Text>
      </Pressable>
    </View>
  );
  // console.log('search', searchedPlaylist);
  // console.log(user);

  const renderItem = ({ item }) => <Item title={item} image={item.images} />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 20, backgroundColor: 'black' }}>
        <View style={{ height: 50 }}>
          <SearchBar
            placeholder='Search here'
            returnKeyType='done'
            onSubmitEditing={() => searchPlaylists()}
            onSearchPress={() => {
              console.log('search');
              searchPlaylists();
            }}
            onChangeText={(text) => {
              // console.log(text);
              setSearch(text);
            }}
            style={{ alignSelf: 'flex-start', width: '80%', left: 10 }}
          />
          <Ionicons
            onPress={goToProfile}
            name='person-outline'
            size={30}
            style={{ color: 'white', left: 330, top: -36 }}
          />
        </View>
        <ScrollView>
          <Text
            style={{
              fontSize: 32,
              color: 'white',
              left: 20,
              display: searchQuery ? 'flex' : 'none',
              paddingTop: 0,
            }}
          >
            <Ionicons size={30} name='search-outline' /> Search Results
          </Text>

          {searchQuery ? (
            <FlatList
              data={searchedPlaylist ? searchedPlaylist.playlists.items : ''}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
              style={{ height: 210 }}
              //height: 270
            />
          ) : (
            <Text>Sorry</Text>
          )}

          <Text style={styles.title}>Your Playlists</Text>
          <FlatList
            data={user.items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            style={{ height: 210 }}
            //height: 270
          />
          <Text style={styles.title}>Featured Playlists</Text>
          {featuredPlaylists.length !== 0 ? (
            <FlatList
              data={featuredPlaylists.playlists.items}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
              style={{ height: 210 }}
              //height: 270
            />
          ) : (
            <Text>Sorry</Text>
          )}
          <Text style={styles.title}>New Releases</Text>
          {newReleases.length !== 0 ? (
            <FlatList
              data={newReleases.albums.items}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
              style={{ height: 210 }}
              //height: 270
            />
          ) : (
            <Text>Sorry</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddbdfc',
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'black',
    height: 150,
    // height: 200,
    // width: 200,
    width: 150,
    marginVertical: 16,
    // marginHorizontal: 16,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  name: {
    // fontSize: 26,
    fontSize: 20,
    color: 'white',
    marginTop: 5,
    // color: 'black',
  },
  title: {
    fontSize: 32,
    color: 'white',
    // color: 'black',
    left: 20,
    paddingTop: 0,
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
  },
});
