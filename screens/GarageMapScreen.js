import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Hardcoded distances in miles between buildings and garages
const distanceLookup = {
  '1Bowl': {
    'McCutcheon Lot': 0.2,
    'Harrison Street Garage': 0.25,
    'Union Club Parking Garage': 0.3,
  },
  'Aspire': {
    'Discovery Park Garage': 0.1,
    'Harrison Street Garage': 0.2,
    'McCutcheon Lot': 0.3,
  },
  'Bailey Hall': {
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Bechtel Innovation Design Center': {
    'Civic Garage': 0.2,
    'Discovery Park Garage': 0.25,
    'Northwestern Garage': 0.3,
  },
  'Beering Hall': {
    'University Street Garage': 0.1,
    'Grant Street Garage': 0.2,
    'Civic Garage': 0.3,
  },
  'Birck Nanotechnology Center': {
    'Civic Garage': 0.2,
    'Discovery Park Garage': 0.25,
    'Wood Street Garage': 0.3,
  },
  'Boiler Bistro': {
    'Grant Street Garage': 0.1,
    'Union Club Parking Garage': 0.1,
    'PMU Surface Lots (A/B/C zones)': 0.1,
  },
  'Brown Laboratory': {
    'Grant Street Garage': 0.2,
    'University Street Garage': 0.2,
    'PMU Surface Lots (A/B/C zones)': 0.25,
  },
  'Cary Quadrangle': {
    'Wood Street Garage': 0.2,
    'Third Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Chick-fil-A': {
    'Purdue West Lot': 0.1,
    'Wiley Lot': 0.2,
    'Wood Street Garage': 0.3,
  },
  'CIVS Building': {
    'Harrison Street Garage': 0.1,
    'Discovery Park Garage': 0.2,
    'McCutcheon Lot': 0.3,
  },
  'Cochran Hall': {
    'Grant Street Garage': 0.2,
    'University Street Garage': 0.2,
    'PMU Surface Lots (A/B/C zones)': 0.25,
  },
  'Dauch Alumni Center': {
    'Harrison Street Garage': 0.1,
    'Discovery Park Garage': 0.2,
    'McCutcheon Lot': 0.3,
  },
  'Discovery Learning Center': {
    'Civic Garage': 0.2,
    'Discovery Park Garage': 0.25,
    'Wood Street Garage': 0.3,
  },
  'Earhart Dining Court': {
    'Wood Street Garage': 0.2,
    'Third Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Earhart Hall': {
    'Wood Street Garage': 0.2,
    'Third Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Electrical Engineering Building': {
    'University Street Garage': 0.1,
    'Grant Street Garage': 0.2,
    'Civic Garage': 0.3,
  },
  'Ford Dining Court': {
    'Wood Street Garage': 0.2,
    'Third Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Forney Hall of Chemical Engineering': {
    'University Street Garage': 0.1,
    'Grant Street Garage': 0.2,
    'Civic Garage': 0.3,
  },
  'Freshens': {
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Frieda Parker Hall': {
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Grissom Hall': {
    'University Street Garage': 0.1,
    'Grant Street Garage': 0.2,
    'Civic Garage': 0.3,
  },
  'Harrison Hall': {
    'Harrison Street Garage': 0.1,
    'McCutcheon Lot': 0.2,
    'Discovery Park Garage': 0.3,
  },
  'Hawkins Hall': {
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Hillenbrand Dining Court': {
    'Wood Street Garage': 0.2,
    'Civic Garage': 0.25,
    'Northwestern Garage': 0.3,
  },
  'Hillenbrand Hall': {
    'Wood Street Garage': 0.2,
    'Civic Garage': 0.25,
    'Northwestern Garage': 0.3,
  },
  'Hilltop Apartments': {
    'Third Street Garage': 0.2,
    'Purdue West Lot': 0.25,
    'Wiley Lot': 0.3,
  },
  'Hovde Hall': {
    'Grant Street Garage': 0.1,
    'Union Club Parking Garage': 0.1,
    'PMU Surface Lots (A/B/C zones)': 0.1,
  },
  'Johnson Hall': {
    'Grant Street Garage': 0.2,
    'University Street Garage': 0.2,
    'PMU Surface Lots (A/B/C zones)': 0.25,
  },
  'Jersey Mike’s': {
    'Grant Street Garage': 0.1,
    'Union Club Parking Garage': 0.1,
    'PMU Surface Lots (A/B/C zones)': 0.1,
  },
  'Krannert Building': {
    'University Street Garage': 0.1,
    'Northwestern Garage': 0.15,
    'Civic Garage': 0.25,
  },
  'Lawson Computer Science': {
    'University Street Garage': 0.1,
    'Northwestern Garage': 0.15,
    'Civic Garage': 0.25,
  },
  'Lyles-Porter Hall': {
    'Civic Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Discovery Park Garage': 0.3,
  },
  'Materials and Electrical Engineering Building': {
    'University Street Garage': 0.1,
    'Grant Street Garage': 0.2,
    'Civic Garage': 0.3,
  },
  'Matthews Hall': {
    'Grant Street Garage': 0.2,
    'University Street Garage': 0.2,
    'PMU Surface Lots (A/B/C zones)': 0.25,
  },
  'McCutcheon Hall': {
    'McCutcheon Lot': 0.1,
    'Harrison Street Garage': 0.2,
    'Discovery Park Garage': 0.3,
  },
  'Meredith Hall': {
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Meredith South': {
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Neil Armstrong Hall of Engineering': {
    'Civic Garage': 0.2,
    'Discovery Park Garage': 0.25,
    'Wood Street Garage': 0.3,
  },
  'On-the-Go at Earhart': {
    'Wood Street Garage': 0.2,
    'Third Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
    'On-the-Go at Ford': {
    'Wood Street Garage': 0.2,
    'Third Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'On-the-Go at Hillenbrand': {
    'Wood Street Garage': 0.2,
    'Civic Garage': 0.25,
    'Northwestern Garage': 0.3,
  },
  'On-the-Go at Meredith South': {
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'On-the-Go at Wiley': {
    'Wiley Lot': 0.1,
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.3,
  },
  'On-the-Go at Windsor': {
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Owen Hall': {
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Panera Bread': {
    'Grant Street Garage': 0.1,
    'Union Club Parking Garage': 0.1,
    'PMU Surface Lots (A/B/C zones)': 0.1,
  },
  'Pappy’s Sweet Shop': {
    'Grant Street Garage': 0.1,
    'Union Club Parking Garage': 0.1,
    'PMU Surface Lots (A/B/C zones)': 0.1,
  },
  'Pete’s Za': {
    'Grant Street Garage': 0.1,
    'Union Club Parking Garage': 0.1,
    'PMU Surface Lots (A/B/C zones)': 0.1,
  },
  'Pfendler Hall': {
    'Grant Street Garage': 0.2,
    'University Street Garage': 0.2,
    'PMU Surface Lots (A/B/C zones)': 0.25,
  },
  'Purdue Food Co. Market': {
    'Grant Street Garage': 0.1,
    'Union Club Parking Garage': 0.1,
    'PMU Surface Lots (A/B/C zones)': 0.1,
  },
  'Purdue Memorial Union': {
    'Grant Street Garage': 0.1,
    'Union Club Parking Garage': 0.05,
    'PMU Surface Lots (A/B/C zones)': 0.05,
  },
  'Qdoba': {
    'Grant Street Garage': 0.1,
    'Union Club Parking Garage': 0.1,
    'PMU Surface Lots (A/B/C zones)': 0.1,
  },
  'Recitation Building': {
    'Grant Street Garage': 0.1,
    'Union Club Parking Garage': 0.1,
    'PMU Surface Lots (A/B/C zones)': 0.1,
  },
  'Shreve Hall': {
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Stanley Coulter Hall': {
    'Grant Street Garage': 0.1,
    'University Street Garage': 0.1,
    'PMU Surface Lots (A/B/C zones)': 0.1,
  },
  'Starbucks at PMU': {
    'Grant Street Garage': 0.1,
    'Union Club Parking Garage': 0.05,
    'PMU Surface Lots (A/B/C zones)': 0.05,
  },
  'Starbucks at Third Street': {
    'Third Street Garage': 0.1,
    'Wood Street Garage': 0.2,
    'Wiley Lot': 0.25,
  },
  'Stewart Center': {
    'Grant Street Garage': 0.1,
    'Union Club Parking Garage': 0.1,
    'PMU Surface Lots (A/B/C zones)': 0.1,
  },
  'Tarkington Hall': {
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Third Street Suites': {
    'Third Street Garage': 0.1,
    'Wood Street Garage': 0.2,
    'Wiley Lot': 0.25,
  },
  'Wetherill Laboratory': {
    'Grant Street Garage': 0.1,
    'University Street Garage': 0.1,
    'PMU Surface Lots (A/B/C zones)': 0.1,
  },
  'Wiley Dining Court': {
    'Wiley Lot': 0.1,
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.3,
  },
  'Winifred Parker Hall': {
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Windsor Dining Court': {
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Windsor Halls': {
    'Third Street Garage': 0.2,
    'Wood Street Garage': 0.25,
    'Wiley Lot': 0.3,
  },
  'Young Hall': {
    'Grant Street Garage': 0.1,
    'Union Club Parking Garage': 0.1,
    'PMU Surface Lots (A/B/C zones)': 0.1,
  },
};


export default function GarageMapScreen({ route }) {
  const selectedBuilding = route?.params?.selectedBuilding ?? null;
  const selectedTime = route?.params?.selectedTime ?? null;

  const [recommendedGarages, setRecommendedGarages] = useState([]);

  const garages = [
    { name: 'Grant Street Garage', totalSpots: 620, occupiedSpots: 480 },
    { name: 'University Street Garage', totalSpots: 500, occupiedSpots: 500 },
    { name: 'Wood Street Garage', totalSpots: 400, occupiedSpots: 300 },
    { name: 'Northwestern Garage', totalSpots: 300, occupiedSpots: 300 },
    { name: 'Union Club Parking Garage', totalSpots: 300, occupiedSpots: 300 },
    { name: 'McCutcheon Lot', totalSpots: 200, occupiedSpots: 85 },
    { name: 'Harrison Street Garage', totalSpots: 450, occupiedSpots: 300 },
    { name: 'Wiley Lot', totalSpots: 180, occupiedSpots: 70 },
    { name: 'Civic Garage', totalSpots: 150, occupiedSpots: 40 },
    { name: 'Discovery Park District Garage', totalSpots: 300, occupiedSpots: 215 },
    { name: 'Third Street Garage', totalSpots: 300, occupiedSpots: 255 },
    { name: 'Purdue West Lot', totalSpots: 250, occupiedSpots: 165 },
    { name: 'PMU Surface Lots (A/B/C zones)', totalSpots: 100, occupiedSpots: 75 },
  ];

  useEffect(() => {
  if (selectedBuilding && selectedTime) {
    const buildingDistances = distanceLookup[selectedBuilding] || {};

    const allGarages = garages.map((garage) => {
      const distanceMiles = buildingDistances[garage.name];
      return {
        ...garage,
        distanceMiles: distanceMiles !== undefined ? distanceMiles.toFixed(2) : 'N/A',
        isFull: garage.totalSpots - garage.occupiedSpots <= 0,
      };
    });

    const availableGarages = allGarages
      .filter((g) => !g.isFull && g.distanceMiles !== 'N/A')
      .sort((a, b) => parseFloat(a.distanceMiles) - parseFloat(b.distanceMiles))
      .slice(0, 5); // Top 5 closest available

    const fullGarages = allGarages
      .filter((g) => g.isFull && g.distanceMiles !== 'N/A')
      .sort((a, b) => parseFloat(a.distanceMiles) - parseFloat(b.distanceMiles))
      .slice(0, 3); // Optional: top 3 closest full garages

    setRecommendedGarages([...availableGarages, ...fullGarages]);
  }
}, [selectedBuilding, selectedTime]);


  const renderGarageCard = (garage) => {
    const availableSpots = garage.totalSpots - garage.occupiedSpots;

    return (
      <View key={garage.name} style={styles.card}>
        <Text style={styles.garageName}>{garage.name}</Text>
        <Text style={styles.detail}>
          {garage.distanceMiles} mi from {selectedBuilding}
        </Text>
        <Text style={styles.detail}>
          🅿️ {garage.occupiedSpots}/{garage.totalSpots} occupied
        </Text>
        <Text style={[styles.status, { color: garage.isFull ? '#FF6B6B' : '#2EC4B6' }]}>
          {garage.isFull ? 'Full' : `${availableSpots} spots open`}
        </Text>
      </View>
    );
  };

  if (!selectedBuilding || !selectedTime) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Garage Dashboard</Text>
        <Text style={styles.noMatch}>Please select a building and time first.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recommended Garages</Text>
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
    backgroundColor: '#000000',
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#dea663',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#bf8441',
    marginBottom: 20,
    textAlign: 'center',
  },
  highlight: {
    color: '#f7e2ad',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderColor: '#bf8441',
    borderWidth: 1,
  },
  garageName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f7e2ad',
    marginBottom: 6,
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
  noMatch: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 40,
  },
});
