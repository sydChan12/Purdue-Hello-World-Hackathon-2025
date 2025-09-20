import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';

export default function SavedGaragesScreen() {
  // Using local state to manage saved garages
  const [savedGarages, setSavedGarages] = useState([
    'Grant Street Garage',
    'University Street Garage',
    'Wood Street Garage',
    'Northwestern Garage',
  ]);

  const removeGarage = (garageName) => {
    // Filter the savedGarages array to remove the specified garage
    const updatedGarages = savedGarages.filter(
      (name) => name !== garageName
    );
    setSavedGarages(updatedGarages);
    Alert.alert("Removed", `${garageName} has been removed from your saved list.`);
  };

  const renderGarageCard = (item) => {
    // This is a placeholder for real-time data
    const garages = [
      { name: 'Grant Street Garage', occupiedSpots: 480, totalSpots: 620 },
      { name: 'University Street Garage', occupiedSpots: 500, totalSpots: 500 },
      { name: 'Wood Street Garage', occupiedSpots: 300, totalSpots: 400 },
      { name: 'Northwestern Garage', occupiedSpots: 300, totalSpots: 300 },
    ];
    const garage = garages.find((g) => g.name === item) || { occupiedSpots: 0, totalSpots: 0 };
    const availableSpots = garage.totalSpots - garage.occupiedSpots;
    const isFull = availableSpots <= 0;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.garageName}>{garage.name}</Text>
          <TouchableOpacity onPress={() => removeGarage(garage.name)}>
            <Text style={styles.removeButton}>- Remove</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.detail}>
          🅿️ {garage.occupiedSpots}/{garage.totalSpots} occupied
        </Text>
        <Text style={[styles.status, { color: isFull ? '#FF6B6B' : '#2EC4B6' }]}>
          {isFull ? '❌ Full' : `✅ ${availableSpots} spots open`}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ My Saved Garages</Text>
      <Text style={styles.subtitle}>
        Real-time availability for your preferred parking locations.
      </Text>
      {savedGarages.length > 0 ? (
        <FlatList
          data={savedGarages}
          keyExtractor={(item) => item}
          renderItem={({ item }) => renderGarageCard(item)}
        />
      ) : (
        <Text style={styles.noSavedText}>You have no saved garages yet.</Text>
      )}
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#A259FF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#F7F7F7',
    marginBottom: 20,
    textAlign: 'center',
  },
  noSavedText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#2C2C2E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  garageName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F7F7F7',
    marginBottom: 6,
  },
  removeButton: {
    color: '#FF6B6B',
    fontWeight: 'bold',
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
});
