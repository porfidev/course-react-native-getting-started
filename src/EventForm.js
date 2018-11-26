import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { formatDateTime, saveEvent } from "./api/api";

const styles = StyleSheet.create({
  fieldContainer: {
    margin: 20,
    backgroundColor: "#CCC"
  },
  text: {
    height: 40,
    margin: 0,
    marginRight: 7,
    paddingLeft: 10
  },
  button: {
    height: 50,
    backgroundColor: "#48B",
    borderColor: "#48BBEC",
    margin: 10,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18
  },
  borderTop: {
    borderColor: "#FCC",
    borderTopWidth: 0.5
  }
});

export default class EventForm extends Component {
  state = {
    title: null,
    date: ""
  };

  handleAdd = () => {
    saveEvent(this.state).then(() => this.props.navigation.navigate("List"));
  };

  handleChange = value => {
    this.setState(() => ({ title: value }));
  };

  handleDatePress = () => {
    this.setState(() => ({ showDatePicker: true }));
  };

  handleDatePicked = date => {
    this.setState(() => ({ date }));
    this.handleDateCanceled();
  };

  handleDateCanceled = () => {
    this.setState(() => ({ showDatePicker: false }));
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.text}
            placeholder={"Event Title"}
            spellCheck={false}
            value={this.state.title}
            onChangeText={this.handleChange}
          />
          <TextInput
            style={[styles.text, styles.borderTop]}
            placeholder={"Event date"}
            spellcheck={false}
            value={formatDateTime(this.state.date.toString())}
            editable={this.state.showDatePickerDialog}
            onFocus={this.handleDatePress}
          />
          <DateTimePicker
            isVisible={this.state.showDatePicker}
            mode="datetime"
            onConfirm={this.handleDatePicked}
            onCancel={this.handleDateCanceled}
          />
        </View>
        <TouchableHighlight onPress={this.handleAdd} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
