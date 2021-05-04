import React, { Component } from "react";
import { GET_MUSICS ,SAVE_QUERY} from "../Constants";

export class MusicAction extends Component {
  static GetMusics(data) {
    return { type: GET_MUSICS, payload: data };
  }
  static SaveQuery(data) {
    return { type: SAVE_QUERY, payload: data };
  }
}

export default MusicAction;
