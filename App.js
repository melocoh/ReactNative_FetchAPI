import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import axios from 'axios';
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // sets the initial state
    //@isLoading boolean sets a loading screen while data is fetching
    //@dataSource string the source of the data
    this.state = {
      isLoading: true,
      dataSource: null,
    };
  }

  // not sure what this method does
  componentDidMount() {
    // fetches [GET] API
    return (
      axios.get("https://[IP Address]:44302/api/Movies")
        .then(response => response.data) // turns the response data into JSON
        .then(responseJson => { // using responseJson parameter

          // sets new state after fetching data
          // @isLoading boolean no longer loading
          // @dataSource string populated with json data
          this.setState({
            isLoading: false,
            dataSource: responseJson,
          });
        })

        // catches error
        .catch((error) => {
          console.log(error);
        })
    );
  }

  render() {
    if (this.state.isLoading) {

      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {

      let movies = this.state.dataSource.map((val, key) =>{
        return <View key={key} style={styles.item}>
          <Text>{val.title}</Text>
        </View>
      });

      return (
        <View style={styles.container}>
          {movies}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
});
