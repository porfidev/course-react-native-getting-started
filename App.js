/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import EventList from "./src/EventList.js";
import EventForm from "./src/EventForm.js";
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
  List: {
    screen: EventList,
    navigationOptions: () => ({
      title: "Event List"
    })
  },
  Form: {
    screen: EventForm,
    navigationOptions: () => ({
      title: "Add new Event"
    })
  }
});

export default createAppContainer(AppNavigator);
