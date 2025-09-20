import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function GarageMapScreen({ route }) {
  const selectedBuilding = route?.params?.selectedBuilding ?? null;
  const selectedTime = route?.params?.selectedTime ?? null;

  // Fix: Initialize recommendedGarages state
  const [recommendedGarages, setRecommendedGarages] = useState([]);

  const garages = [
    {
      name: 'Grant Street Garage',
      totalSpots: 620,
      occupiedSpots: 480,
      distanceMeters: 300,
      buildingMatch: ['Purdue Memorial Union', 'Armstrong Hall', 'Stanley Coulter Hall', 'Wetherill Laboratory'],
    },
    {
      name: 'University Street Garage',
      totalSpots: 500,
      occupiedSpots: 500,
      distanceMeters: 150,
      buildingMatch: ['Lawson Computer Science', 'Beering Hall', 'Krannert Building', 'Purdue Memorial Union'],
    },
    {
      name: 'Wood Street Garage',
      totalSpots: 400,
      occupiedSpots: 300,
      distanceMeters: 250,
      buildingMatch: ['Hillenbrand Hall', 'Lyles-Porter Hall', 'Neil Armstrong Hall of Engineering'],
    },
    {
      name: 'Northwestern Garage',
      totalSpots: 300,
      occupiedSpots: 300,
      distanceMeters: 100,
      buildingMatch: ['Lawson Computer Science', 'Krannert Building', 'Hillenbrand Hall'],
    },
  ];

  useEffect(() => {
    if (selectedBuilding && selectedTime) {
      const allGarages = garages.map(garage => ({
        ...garage,
        isFull: (garage.totalSpots - garage.occupiedSpots) <= 0,
      }));

      const availableGarages = allGarages.filter(g => !g.isFull);
      const fullGarages = allGarages.filter(g => g.isFull);

      availableGarages.sort((a, b) => a.distanceMeters - b.distanceMeters);

      setRecommendedGarages([...availableGarages, ...fullGarages]);
    }
  }, [selectedBuilding, selectedTime]);

  const renderGarageCard = (garage) => {
    const availableSpots = garage.totalSpots - garage.occupiedSpots;

    return (
      <View key={garage.name} style={styles.card}>
        <Text style={styles.garageName}>{garage.name}</Text>
        <Text style={styles.detail}>📍 {garage.distanceMeters}m from {selectedBuilding}</Text>
        <Text style={styles.detail}>
          🅿️ {garage.occupiedSpots}/{garage.totalSpots} occupied
        </Text>
        <Text style={[styles.status, { color: garage.isFull ? '#FF6B6B' : '#2EC4B6' }]}>
          {garage.isFull ? '❌ Full' : `✅ ${availableSpots} spots open`}
        </Text>
      </View>
    );
  };

  if (!selectedBuilding || !selectedTime) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🚗 Garage Dashboard</Text>
        <Text style={styles.noMatch}>Please select a building and time first.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚗 Recommended Garages</Text>
      <Text style={styles.subtitle}>
        Based on your destination: <Text style={styles.highlight}>{selectedBuilding}</Text> at <Text style={styles.highlight}>{selectedTime}</Text>
      </Text>

      {recommendedGarages.length > 0 ? (
        recommendedGarages.map(renderGarageCard)
      ) : (
        <Text style={styles.noMatch}>No garages matched your selection.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#1C1C1E',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#A259FF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#F7F7F7',
    marginBottom: 20,
    textAlign: 'center',
  },
  highlight: {
    color: '#2EC4B6',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#2C2C2E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  garageName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F7F7F7',
    marginBottom: 6,
  },
  detail: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  noMatch: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 40,
  },
  saveButton: {
    backgroundColor: '#A259FF',
    paddingVertical: 8,
    borderRadius: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#F7F7F7',
    fontWeight: 'bold',
  },
});

