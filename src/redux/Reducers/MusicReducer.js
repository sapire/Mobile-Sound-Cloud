import { GET_MUSICS, SAVE_QUERY } from "../Constants";

const initialState = {
  queries: [],
  musics: [],
};

export default function MusicReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MUSICS:
      state = {
        ...state,
        musics: action.payload,
      };
      break;
    case SAVE_QUERY:
      state.queries.unshift(action.payload);
      state = {
        ...state,
        queries: state.queries,
      };
      break;

    default:
      break;
  }
  return state;
}
