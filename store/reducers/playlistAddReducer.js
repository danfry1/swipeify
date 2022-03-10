import { PLAYLIST_ADD } from '../actions/playlistAdd';

const initialState = {
  playlistAdd: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAYLIST_ADD:
      const playlistAdd = action.playlistAdd;

      return {
        playlistAdd: playlistAdd,
      };
  }
  return state;
};
