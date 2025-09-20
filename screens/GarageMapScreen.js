import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const garages = [
  { name: 'University Street Garage', available: 380, capacity: 780 },
  { name: 'McCutcheon Drive Garage', available: 0, capacity: 620 },
  { name: 'Wood Street Garage', available: 239, capacity: 550 },
  { name: 'Harrison Street Garage', available: 0, capacity: 400 }
];

export default function GarageMapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Garage Availability</Text>
      {garages.map((g, i) => {
        const percent = Math.round((g.available / g.capacity) * 100);
        const status = percent === 0 ? 'Full' : percent < 50 ? 'Medium' : 'High';
        const color = percent === 0 ? 'red' : percent < 50 ? 'orange' : 'yellow';

        return (
          <View key={i} style={[styles.card, { borderColor: color }]}>
            <Text style={styles.name}>{g.name}</Text>
            <Text>{g.available} / {g.capacity} spots</Text>
            <Text>{percent}% Full</Text>
            <Text>Status: {status} Availability</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  card: { borderWidth: 2, padding: 15, marginBottom: 15 },
  name: { fontWeight: 'bold', fontSize: 16 }
});
