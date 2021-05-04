import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import { connect } from "react-redux";

export class RecentSearch extends Component {
  state = {};

  render() {
    let { queries } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Text style={{ textAlign: "center", fontSize: 24 }}>
          {" "}
          Recent Queries{" "}
        </Text>
        <FlatList
          data={queries.slice(0,4)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 20,
              }}
            >
              <Text>
                {index}. {item}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                paddingVertical: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No queries found</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  queries: state.MusicReducer.queries,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RecentSearch);
