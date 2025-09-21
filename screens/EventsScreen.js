import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  ScrollView,
} from 'react-native';

const eventsData = [
  {
    id: '1',
    name: 'Purdue Football Game vs Indiana',
    date: '11/23/2024',
    time: '12:00 PM',
    location: 'Ross-Ade Stadium',
    parkingImpact: 'Heavy traffic and parking lot closures around the stadium and campus.',
  },
  {
    id: '2',
    name: 'Fall Concert Series: The Chainsmokers',
    date: '11/18/2024',
    time: '8:00 PM',
    location: 'Elliott Hall of Music',
    parkingImpact: 'Increased demand at nearby garages like Grant Street and University Street.',
  },
  {
    id: '3',
    name: 'Purdue Career Fair',
    date: '11/16/2024',
    time: '10:00 AM - 3:00 PM',
    location: 'Purdue Memorial Union',
    parkingImpact: 'High traffic and limited spots in the PMU and Grant Street garages.',
  },
  {
    id: '4',
    name: "Men's Basketball Game vs Illinois",
    date: '12/05/2024',
    time: '7:00 PM',
    location: 'Mackey Arena',
    parkingImpact: 'Heavy congestion and lot closures, especially near Northwestern and Grant Street garages.',
  },
];

const EventCard = ({ event }) => (
  <View style={styles.card}>
    <Text style={styles.eventName}>{event.name}</Text>
    <Text style={styles.eventDetail}>
      <Text style={styles.label}>Date:</Text> {event.date}
    </Text>
    <Text style={styles.eventDetail}>
      <Text style={styles.label}>Time:</Text> {event.time}
    </Text>
    <Text style={styles.eventDetail}>
      <Text style={styles.label}>Location:</Text> {event.location}
    </Text>
    <Text style={[styles.eventDetail, styles.impact]}>
      <Text style={styles.label}>Parking Impact:</Text> {event.parkingImpact}
    </Text>
  </View>
);

export default function EventsScreen() {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Upcoming Events</Text>
        <FlatList
          data={eventsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard event={item} />}
          scrollEnabled={false} // Disable FlatList scrolling to allow the parent ScrollView to handle it
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#dea663',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderColor: '#bf8441',
    borderWidth: 1,
    // Add the glow effect here
    shadowColor: '#dea663',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f7e2ad',
    marginBottom: 8,
  },
  eventDetail: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#bf8441',
  },
  impact: {
    color: '#FF6B6B',
    marginTop: 8,
  },
});
