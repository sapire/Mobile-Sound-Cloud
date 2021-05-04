import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { MusicMiddleware } from "../redux/Middlewares";
import { Audio, Video } from "expo-av";

export class Home extends Component {
  state = {
    text: "",
    loader: false,
    sound: null,
  };

  onChangeText = (text) => {
    clearTimeout(this.timeoutId);
    this.setState({ text, loader: true });
    this.timeoutId = setTimeout(() => {
      this.GetMusics(text);
    }, 2000);
  };

  GetMusics = (text) => {
    let { GetMusics } = this.props;
    GetMusics({
      text,
      callback: (data) => {
        this.setState({ loader: false });
      },
    });
  };

  PlayMusic = async (item) => {
    let { sound } = this.state;
    try {
      if (sound) {
        sound.unloadAsync();
      }
      const soundObj = await Audio.Sound.createAsync({
        uri: `${item.stream_url}?client_id=CW62xLA9h8wXrXC1WIaSX9OWA6novVIE`,
      });
      console.warn("sound =====", soundObj.sound);
      this.setState({ sound: soundObj.sound });
      await soundObj.sound.playAsync();
    } catch (e) {
      console.warn("Error===", e);
    }
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.PlayMusic(item)}
        style={{
          width: "100%",
          paddingVertical: 15,
          paddingHorizontal: 5,
          borderBottomWidth: 0.5,
          borderBottomColor: "gray",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{}}>
          <Image
            source={{ uri: item.artwork_url }}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View style={{ paddingLeft: 10, flex: 1 }}>
          <Text
            style={{ color: "gray", fontSize: 16, fontWeight: "bold" }}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "gray" }} numberOfLines={2}>
              Artist: {item.user?.username}
            </Text>
            <Text style={{ color: "gray" }} numberOfLines={2}>
              Artist: {item.playback_count}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    let { text, loader } = this.state;
    let { musics } = this.props;
    console.log(musics[0]);
    return (
      <View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}>
        <View
          style={{
            width: "90%",
            height: 50,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <TextInput
            style={{ flex: 1 }}
            value={text}
            onChangeText={this.onChangeText}
            placeholder="Search Soundcloud"
          />
          <Ionicons name="search" style={{ fontSize: 30 }} />
        </View>
        <View style={{ flex: 1, width: "90%" }}>
          {loader ? (
            <View
              style={{ flex: 1, paddingVertical: 20, alignItems: "center" }}
            >
              <ActivityIndicator size="large" color="gray" />
            </View>
          ) : (
            <FlatList
              data={musics}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              style={{ flex: 1 }}
              ListEmptyComponent={() => (
                <View
                  style={{
                    width: "100%",
                    paddingVertical: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 20, color: "gray" }}>
                    No Music Found{" "}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
        <View
          style={{
            width: "100%",
            height: 70,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("RecentSearch")}
            style={{
              width: "80%",
              height: "75%",
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>Recent Queries</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  musics: state.MusicReducer.musics,
});

const mapDispatchToProps = (dispatch) => ({
  GetMusics: (payload) => dispatch(MusicMiddleware.GetMusics(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
