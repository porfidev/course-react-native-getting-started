import moment from "moment";
import uuid from "uuid";
// import Expo from "expo";

// const { manifest } = Expo.Constants;
// const api = manifest.packagerOpts.dev
//   ? manifest.debuggerHost
//       .split(":")
//       .shift()
//       .concat(":3000")
//   : "productionurl.com";
export function getEvents() {
  return fetch(url)
    .then(response => response.json())
    .then(events => {
      return events.map(data => ({ ...data, date: new Date(data.date) }));
    })
    .catch(err => console.log(err));
}

export function saveEvent({ title, date }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ title, date, id: uuid() }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(response => response.json())
    .catch(err => console.error(err));
}

// const url = `http://${api}/events`;
const url = "http://localhost:3000/events";

export function formatDateTime(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format("H A on D MMM YYYY");
}

export function formatDate(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format("D MMM YYYY");
}

export function getCountdownParts(eventDate) {
  const duration = moment.duration(
    moment(new Date(eventDate)).diff(new Date())
  );
  return {
    days: parseInt(duration.as("days")),
    hours: duration.get("hours"),
    minutes: duration.get("minutes"),
    seconds: duration.get("seconds")
  };
}
