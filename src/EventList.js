import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import data from "../db.json";
import { getEvents } from "./api/api";
import EventCard from "./EventCard";
import ActionButton from "react-native-action-button";

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#F3F3CC"
  }
});

class EventList extends Component {
  componentDidMount() {
    // const events = data.events;

    getEvents().then(events => {
      this.setState(
        () => ({ events }),
        () => {
          setInterval(() => {
            this.setState(currentState => ({
              events: currentState.events.map(event => ({
                ...event,
                timer: Date.now()
              }))
            }));
          }, 1000);
        }
      );
    });
    //

    // this.setState(() => ({
    //   events: events.map(element => ({
    //     ...element,
    //     date: new Date(element.date)
    //   }))
    // }));

    // on navigate
    this.props.navigation.addListener("didFocus", () => {
      getEvents().then(events => this.setState({ events }));
    });
  }

  state = {
    events: []
  };

  handleAddEvent = () => {
    this.props.navigation.navigate("Form");
  };

  render() {
    const { events } = this.state;
    const renderItem = ({ item }) => <EventCard event={item} />;
    const keyExtractor = item => item.id;
    return [
      <FlatList
        key={"flatList"}
        style={styles.list}
        renderItem={renderItem}
        data={events}
        keyExtractor={keyExtractor}
      />,
      <ActionButton
        key={"add"}
        onPress={this.handleAddEvent}
        buttonColor={"rgba(10,75,60,.5)"}
      />
    ];
  }
}

export default EventList;
