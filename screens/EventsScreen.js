import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const eventsData = [
  {
    id: '1',
    name: 'Purdue Football Game vs Indiana',
    date: '11/23/2025',
    time: '12:00 PM',
    location: 'Ross-Ade Stadium',
    parkingImpact: 'Heavy traffic and parking lot closures around the stadium and campus.',
  },
  {
    id: '2',
    name: 'Fall Concert Series: The Chainsmokers',
    date: '11/18/2025',
    time: '8:00 PM',
    location: 'Elliott Hall of Music',
    parkingImpact: 'Increased demand at nearby garages like Grant Street and University Street.',
  },
  {
    id: '3',
    name: 'Purdue Career Fair',
    date: '9/16/2025',
    time: '10:00 AM - 3:00 PM',
    location: 'Purdue Memorial Union',
    parkingImpact: 'High traffic and limited spots in the PMU and Grant Street garages.',
  },
  {
    id: '4',
    name: 'Men\'s Basketball Game vs Illinois',
    date: '12/05/2025',
    time: '7:00 PM',
    location: 'Mackey Arena',
    parkingImpact: 'Heavy congestion and lot closures, especially near Northwestern and Grant Street garages.',
  },
];

const EventCard = ({ event }) => (
  <View style={styles.card}>
    <Text style={styles.eventName}>🎉 {event.name}</Text>
    <Text style={styles.eventDetail}>
      <Text style={styles.label}>📅 Date:</Text> {event.date}
    </Text>
    <Text style={styles.eventDetail}>
      <Text style={styles.label}>⏰ Time:</Text> {event.time}
    </Text>
    <Text style={styles.eventDetail}>
      <Text style={styles.label}>📍 Location:</Text> {event.location}
    </Text>
    <Text style={[styles.eventDetail, styles.impact]}>
      <Text style={styles.label}>⚠️ Parking Impact:</Text> {event.parkingImpact}
    </Text>
  </View>
);

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🅿️ Upcoming Events</Text>
      <FlatList
        data={eventsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A259FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2C2C2E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F7F7F7',
    marginBottom: 8,
  },
  eventDetail: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
  },
  impact: {
    color: '#FF6B6B',
    marginTop: 8,
  },
});
