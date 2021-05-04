import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { client_id } from "../../config";
import { MusicAction } from "../Actions";

export default class MusicMiddleware extends Component {
  static GetMusics({ text, callback }) {
    return async (dispatch) => {
      try {
        let response = await fetch(
          `http://api.soundcloud.com/tracks?client_id=${client_id}&q=${text}`
        );
        // console.warn("Get Musics", response);
        if (response.status == 200) {
          response = await response.json();
          dispatch(MusicAction.GetMusics(response));
          if (text) dispatch(MusicAction.SaveQuery(text));
          callback(true);
        } else {
          callback(false);
        }
      } catch (e) {
        callback(false);
        console.warn("====error", e.message);
      }
    };
  }
}
