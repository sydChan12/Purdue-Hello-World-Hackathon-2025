import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const garages = [
  { name: 'University Street Garage', available: 380, capacity: 780 },
  { name: 'McCutcheon Drive Garage', available: 0, capacity: 620 },
  { name: 'Wood Street Garage', available: 239, capacity: 550 },
  { name: 'Harrison Street Garage', available: 0, capacity: 400 }
];

export default function GarageMapScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🚗 Garage Availability</Text>
      {garages.map((g, i) => {
        const percent = Math.round((g.available / g.capacity) * 100);
        const status = percent === 0 ? '❌ Full' : percent < 50 ? '⚠️ Medium' : '✅ High';
        const bgColor = percent === 0 ? '#FF6B6B' : percent < 50 ? '#FFA500' : '#2EC4B6';

        return (
          <View key={i} style={[styles.card, { backgroundColor: bgColor }]}>
            <Text style={styles.name}>{g.name}</Text>
            <Text style={styles.spots}>{g.available} / {g.capacity} spots</Text>
            <Text style={styles.percent}>{percent}% Full</Text>
            <Text style={styles.status}>Status: {status}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1C1C1E',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A259FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F7F7F7',
    marginBottom: 8,
  },
  spots: {
    fontSize: 16,
    color: '#F7F7F7',
  },
  percent: {
    fontSize: 16,
    color: '#F7F7F7',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#F7F7F7',
  },
});
