import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';

export default function SavedGaragesScreen() {
  const [savedGarages, setSavedGarages] = useState([
    'Grant Street Garage',
    'University Street Garage',
    'Wood Street Garage',
    'Northwestern Garage',
  ]);

  const allGarages = [
    { name: 'Grant Street Garage', occupiedSpots: 480, totalSpots: 620 },
    { name: 'University Street Garage', occupiedSpots: 500, totalSpots: 500 },
    { name: 'Wood Street Garage', occupiedSpots: 300, totalSpots: 400 },
    { name: 'Northwestern Garage', occupiedSpots: 300, totalSpots: 300 },
    { name: 'Union Club Parking Garage', occupiedSpots: 300, totalSpots: 300 },
    { name: 'McCutcheon Lot', occupiedSpots: 85, totalSpots: 200 },
    { name: 'Harrison Street Garage', occupiedSpots: 300, totalSpots: 450 },
    { name: 'Wiley Lot', occupiedSpots: 70, totalSpots: 180 },
    { name: 'Civic Garage', occupiedSpots: 40, totalSpots: 150 },
    { name: 'Discovery Park Garage', occupiedSpots: 215, totalSpots: 300 },
    { name: 'Third Street Garage', occupiedSpots: 255, totalSpots: 300 },
    { name: 'Purdue West Lot', occupiedSpots: 165, totalSpots: 250 },
    { name: 'PMU Surface Lots (A/B/C zones)', occupiedSpots: 75, totalSpots: 100 },
  ];

  const removeGarage = (garageName) => {
    const updatedGarages = savedGarages.filter((name) => name !== garageName);
    setSavedGarages(updatedGarages);
    Alert.alert('Removed', `${garageName} has been removed from your saved list.`);
  };

  const addGarage = (garageName) => {
    if (!savedGarages.includes(garageName)) {
      setSavedGarages([...savedGarages, garageName]);
      Alert.alert('Added', `${garageName} has been added to your saved list.`);
    }
  };

  const renderGarageCard = (garage, isSaved) => {
    const availableSpots = garage.totalSpots - garage.occupiedSpots;
    const isFull = availableSpots <= 0;

    return (
      <View key={garage.name} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.garageName}>{garage.name}</Text>
          {isSaved ? (
            <TouchableOpacity onPress={() => removeGarage(garage.name)}>
              <Text style={styles.removeButton}>− Remove</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => addGarage(garage.name)}>
              <Text style={styles.addButtonText}>➕ Add</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.detail}>
          <Text style={styles.cardEmoji}>🅿</Text> {garage.occupiedSpots}/{garage.totalSpots} occupied
        </Text>
        <Text style={[styles.status, { color: isFull ? '#FF6B6B' : '#2EC4B6' }]}>
          {isFull ? 'Full' : `${availableSpots} spots open`}
        </Text>
      </View>
    );
  };

  const saved = allGarages.filter((g) => savedGarages.includes(g.name));
  const unsaved = allGarages.filter((g) => !savedGarages.includes(g.name));

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>My Saved Garages</Text>
        <Text style={styles.subtitle}>
          Real-time availability for your preferred parking locations.
        </Text>

        {saved.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}><Text style={styles.cardEmoji}>★</Text>Saved Garages</Text>
            {saved.map((garage) => renderGarageCard(garage, true))}
          </>
        ) : (
          <Text style={styles.noSavedText}>You have no saved garages yet.</Text>
        )}

        {unsaved.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>📍 Other Garages</Text>
            {unsaved.map((garage) => renderGarageCard(garage, false))}
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    padding: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#dea663',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#bf8441',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f7e2ad',
    marginBottom: 10,
    marginTop: 20,
  },
  noSavedText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20, // Increased for a more distinct separation
    borderColor: '#bf8441',
    borderWidth: 1,
    // Add the shadow effect here
    shadowColor: '#dea663',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  garageName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f7e2ad',
    marginBottom: 6,
  },
  removeButton: {
    color: '#FF6B6B',
    fontWeight: 'bold',
    fontSize: 14,
  },
  addButtonText: {
    color: '#2EC4B6',
    fontWeight: 'bold',
    fontSize: 14,
  },
  detail: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardEmoji: {
    fontSize: 27,
    color: '#dea663', // Gold tone
  },
});
