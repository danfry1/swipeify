import { useSelector } from 'react-redux';
import Swiper from 'react-native-deck-swiper';
import {
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import React, { useRef } from 'react';
import { useState } from 'react';
import SpotifyWebApi from '../danfry1-spotify/src/spotify-web-api';
import { Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const spotifyApi = new SpotifyWebApi();

const SwipeCard = ({
  index,
  onSwiped,
  playlist,
  addToPlaylist,
  playlistUri,
}) => {
  const token = useSelector((state) => state.token.token);
  spotifyApi.setAccessToken(token);
  console.log('playlist that song is added to', addToPlaylist);
  const [isSpinning, setIsSpinning] = useState(false);
  console.log(isSpinning);
  const playlistAdd = useSelector((state) => state.playlistAdd.playlistAdd);
  console.log('playlistADD😘😘😘', playlistAdd);
  const addToLikedSongs = (id) => {
    spotifyApi
      .addTracksToPlaylist(playlistAdd ? playlistAdd : addToPlaylist, [id])
      .then(
        function (data) {
          console.log(
            `✅✅✅✅Added ${playlistUri[index].track.name} to playlist!`
          );
        },
        function (err) {
          console.log('sorry', err);
        }
      );
  };
  let vinylCard = useRef(new Animated.Value(0)).current;

  const slideImage = () => {
    Animated.loop(
      Animated.timing(vinylCard, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      {
        iterations: 10,
      }
    ).start((finished) => console.log('fin', finished));
  };

  const stopImage = () => {
    Animated.loop(
      Animated.timing(vinylCard, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      {
        iterations: 1,
      }
    ).start(({ finished }) => {
      if (finished) {
        console.log('hi');
      }
    });
  };

  const yVal = vinylCard.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animStyle = {
    transform: [{ rotate: yVal }],
  };

  return (
    <View style={styles.swiperContainer}>
      {playlist.length === 0 ? (
        <Text>Hi</Text>
      ) : (
        <Swiper
          cards={playlistUri}
          cardIndex={index}
          renderCard={(card) => (
            <Animated.View
              style={[
                styles.card,
                { borderRadius: isSpinning ? 1000 : 8 },
                { borderWidth: isSpinning ? 2 : 0 },
                { borderColor: 'black' },
                animStyle,
              ]}
            >
              <Pressable
                onLongPress={() => {
                  isSpinning ? stopImage() : slideImage();
                  setIsSpinning((prev) => !prev);
                }}
                style={{ height: '100%', width: '100%' }}
              >
                <ImageBackground
                  style={styles.imgBackground}
                  source={{ uri: card.track.album.images[0].url }}
                >
                  {isSpinning ? (
                    <Ionicons
                      name='ellipse'
                      size={30}
                      style={{
                        alignSelf: 'center',
                        top: 160,
                        zIndex: 2,
                        color: 'black',
                      }}
                    />
                  ) : (
                    <Text style={{ display: 'none' }}>0</Text>
                  )}
                </ImageBackground>
              </Pressable>
            </Animated.View>
          )}
          onSwiped={onSwiped}
          onTapCard={() => {
            console.log('hi');
          }}
          stackSize={isSpinning ? 1 : 4}
          stackSeparation={-20}
          onSwipedLeft={() => console.log('⬅️ ⬅️ ⬅️ ⬅️ left')}
          onSwipedRight={() => addToLikedSongs(playlistUri[index].track.uri)}
          onSwipedAll={() => console.log('all swiped')}
          disableTopSwipe
          disableBottomSwipe
          infinite
        />
      )}
    </View>
  );
};

export default SwipeCard;

const styles = StyleSheet.create({
  swiperContainer: {
    backgroundColor: 'black',
  },
  card: {
    // flex: Dimensions.get('window').height < 750 ? 0.5 : 0.6,
    flex: 0.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    overflow: 'hidden',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});

// if (playlist.length === 0) {
//   return (
//     <Image
//       source={{
//         uri: 'https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif',
//       }}
//       style={{ alignItems: 'center', justifyContent: 'center' }}
//     />
//   );
// }
