import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';

// distances and addresses for garages
const distanceLookup = {
  '1Bowl': { 'McCutcheon Lot': 0.2, 'Harrison Street Garage': 0.25, 'Union Club Parking Garage': 0.3 },
  'Aspen Hall': { 'Wiley Lot': 0.1, 'Civic Garage': 0.25, 'Purdue West Lot': 0.3 },
  'Aspire': { 'Discovery Park District Garage': 0.1, 'Harrison Street Garage': 0.2, 'McCutcheon Lot': 0.3 },
  'Bailey Hall': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Batten Hall': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Bechtel Innovation Design Center': { 'Civic Garage': 0.2, 'Discovery Park District Garage': 0.25, 'Northwestern Garage': 0.3 },
  'Beering Hall': { 'University Street Garage': 0.1, 'Grant Street Garage': 0.2, 'Civic Garage': 0.3 },
  'Birck Nanotechnology Center': { 'Civic Garage': 0.2, 'Discovery Park District Garage': 0.25, 'Wood Street Garage': 0.3 },
  'Boiler Bistro': { 'Grant Street Garage': 0.1, 'Union Club Parking Garage': 0.1, 'PMU Surface Lots': 0.1 },
  'Brown Laboratory': { 'Grant Street Garage': 0.2, 'University Street Garage': 0.2, 'PMU Surface Lots': 0.25 },
  'Cary Quadrangle': { 'Wood Street Garage': 0.2, 'Third Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Chick-fil-A': { 'Purdue West Lot': 0.1, 'Wiley Lot': 0.2, 'Wood Street Garage': 0.3 },
  'CIVS Building': { 'Harrison Street Garage': 0.1, 'Discovery Park District Garage': 0.2, 'McCutcheon Lot': 0.3 },
  'Cochran Hall': { 'Grant Street Garage': 0.2, 'University Street Garage': 0.2, 'PMU Surface Lots': 0.25 },
  'Dauch Alumni Center': { 'Harrison Street Garage': 0.1, 'Discovery Park District Garage': 0.2, 'McCutcheon Lot': 0.3 },
  'Discovery Learning Center': { 'Civic Garage': 0.2, 'Discovery Park District Garage': 0.25, 'Wood Street Garage': 0.3 },
  'Earhart Dining Court': { 'Wood Street Garage': 0.2, 'Third Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Earhart Hall': { 'Wood Street Garage': 0.2, 'Third Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Electrical Engineering Building': { 'University Street Garage': 0.1, 'Grant Street Garage': 0.2, 'Civic Garage': 0.3 },
  'Ford Dining Court': { 'Wood Street Garage': 0.2, 'Third Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Forney Hall of Chemical Engineering': { 'University Street Garage': 0.1, 'Grant Street Garage': 0.2, 'Civic Garage': 0.3 },
  'Freshens': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Frieda Parker Hall': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Grissom Hall': { 'University Street Garage': 0.1, 'Grant Street Garage': 0.2, 'Civic Garage': 0.3 },
  'Harrison Hall': { 'Harrison Street Garage': 0.1, 'McCutcheon Lot': 0.2, 'Discovery Park District Garage': 0.3 },
  'Hawkins Hall': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Hillenbrand Dining Court': { 'Wood Street Garage': 0.2, 'Civic Garage': 0.25, 'Northwestern Garage': 0.3 },
  'Hillenbrand Hall': { 'Wood Street Garage': 0.2, 'Civic Garage': 0.25, 'Northwestern Garage': 0.3 },
  'Hilltop Apartments': { 'Third Street Garage': 0.2, 'Purdue West Lot': 0.25, 'Wiley Lot': 0.3 },
  'Hovde Hall': { 'Grant Street Garage': 0.1, 'Union Club Parking Garage': 0.1, 'PMU Surface Lots': 0.1 },
  'Johnson Hall': { 'Grant Street Garage': 0.2, 'University Street Garage': 0.2, 'PMU Surface Lots': 0.25 },
  'Jersey Mike’s': { 'Grant Street Garage': 0.1, 'Union Club Parking Garage': 0.1, 'PMU Surface Lots': 0.1 },
  'Krannert Building': { 'University Street Garage': 0.1, 'Northwestern Garage': 0.15, 'Civic Garage': 0.25 },
  'Lawson Computer Science': { 'University Street Garage': 0.1, 'Northwestern Garage': 0.15, 'Civic Garage': 0.25 },
  'Lyles-Porter Hall': { 'Civic Garage': 0.2, 'Wood Street Garage': 0.25, 'Discovery Park District Garage': 0.3 },
  'Materials and Electrical Engineering Building': { 'University Street Garage': 0.1, 'Grant Street Garage': 0.2, 'Civic Garage': 0.3 },
  'Matthews Hall': { 'Grant Street Garage': 0.2, 'University Street Garage': 0.2, 'PMU Surface Lots': 0.25 },
  'McCutcheon Hall': { 'McCutcheon Lot': 0.1, 'Harrison Street Garage': 0.2, 'Discovery Park District Garage': 0.3 },
  'Meredith Hall': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Meredith South': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Neil Armstrong Hall of Engineering': { 'Civic Garage': 0.2, 'Discovery Park District Garage': 0.25, 'Wood Street Garage': 0.3 },
  'On-the-Go at Earhart': { 'Wood Street Garage': 0.2, 'Third Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'On-the-Go at Ford': { 'Wood Street Garage': 0.2, 'Third Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'On-the-Go at Hillenbrand': { 'Wood Street Garage': 0.2, 'Civic Garage': 0.25, 'Northwestern Garage': 0.3 },
  'On-the-Go at Meredith South': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'On-the-Go at Wiley': { 'Wiley Lot': 0.1, 'Third Street Garage': 0.2, 'Wood Street Garage': 0.3 },
  'On-the-Go at Windsor': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Owen Hall': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Panera Bread': { 'Grant Street Garage': 0.1, 'Union Club Parking Garage': 0.1, 'PMU Surface Lots': 0.1 },
  'Pappy’s Sweet Shop': { 'Grant Street Garage': 0.1, 'Union Club Parking Garage': 0.1, 'PMU Surface Lots': 0.1 },
  'Pete’s Za': { 'Grant Street Garage': 0.1, 'Union Club Parking Garage': 0.1, 'PMU Surface Lots': 0.1 },
  'Pfendler Hall': { 'Grant Street Garage': 0.2, 'University Street Garage': 0.2, 'PMU Surface Lots': 0.25 },
  'Purdue Food Co. Market': { 'Grant Street Garage': 0.1, 'Union Club Parking Garage': 0.1, 'PMU Surface Lots': 0.1 },
  'Purdue Memorial Union': { 'Grant Street Garage': 0.1, 'Union Club Parking Garage': 0.05, 'PMU Surface Lots': 0.05 },
  'Qdoba': { 'Grant Street Garage': 0.1, 'Union Club Parking Garage': 0.1, 'PMU Surface Lots': 0.1 },
  'Recitation Building': { 'Grant Street Garage': 0.1, 'Union Club Parking Garage': 0.1, 'PMU Surface Lots': 0.1 },
  'Shreve Hall': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Stanley Coulter Hall': { 'Grant Street Garage': 0.1, 'University Street Garage': 0.1, 'PMU Surface Lots': 0.1 },
  'Starbucks at PMU': { 'Grant Street Garage': 0.1, 'Union Club Parking Garage': 0.05, 'PMU Surface Lots': 0.05 },
  'Starbucks at Third Street': { 'Third Street Garage': 0.1, 'Wood Street Garage': 0.2, 'Wiley Lot': 0.25 },
  'Stewart Center': { 'Grant Street Garage': 0.1, 'Union Club Parking Garage': 0.1, 'PMU Surface Lots': 0.1 },
  'Tarkington Hall': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Third Street Suites': { 'Third Street Garage': 0.1, 'Wood Street Garage': 0.2, 'Wiley Lot': 0.25 },
  'Wetherill Laboratory': { 'Grant Street Garage': 0.1, 'University Street Garage': 0.1, 'PMU Surface Lots': 0.1 },
  'Wiley Dining Court': { 'Wiley Lot': 0.1, 'Third Street Garage': 0.2, 'Wood Street Garage': 0.3 },
  'Winifred Parker Hall': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Windsor Dining Court': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Windsor Halls': { 'Third Street Garage': 0.2, 'Wood Street Garage': 0.25, 'Wiley Lot': 0.3 },
  'Young Hall': { 'Grant Street Garage': 0.1, 'Union Club Parking Garage': 0.1, 'PMU Surface Lots': 0.1 },
};

// garage coordinates
const garageLocations = {
  'Grant Street Garage': { address: '101 N Grant St, West Lafayette, IN 47906', lat: 40.4258, lng: -86.9118 },
  'University Street Garage': { address: '201 S University St, West Lafayette, IN 47906', lat: 40.4248, lng: -86.9126 },
  'Wood Street Garage': { address: '100 Wood St, West Lafayette, IN 47906', lat: 40.4285, lng: -86.9201 },
  'Northwestern Garage': { address: '1317 N Northwestern Ave, West Lafayette, IN 47906', lat: 40.4299, lng: -86.9189 },
  'Union Club Parking Garage': { address: '101 N Grant St, West Lafayette, IN 47906', lat: 40.4245, lng: -86.9112 },
  'McCutcheon Lot': { address: '350 N Harrison St, West Lafayette, IN 47906', lat: 40.4225, lng: -86.9185 },
  'Harrison Street Garage': { address: '719 W Harrison St, West Lafayette, IN 47906', lat: 40.4223, lng: -86.9215 },
  'Wiley Lot': { address: '200 N Russell St, West Lafayette, IN 47906', lat: 40.4278, lng: -86.9255 },
  'Civic Garage': { address: '108 Civic Pl, West Lafayette, IN 47906', lat: 40.4293, lng: -86.9157 },
  'Discovery Park District Garage': { address: '1326 W State St, West Lafayette, IN 47906', lat: 40.4265, lng: -86.9304 },
  'Third Street Garage': { address: '100 N Third St, West Lafayette, IN 47906', lat: 40.4290, lng: -86.9230 },
  'Purdue West Lot': { address: '1500 W State St, West Lafayette, IN 47906', lat: 40.4300, lng: -86.9250 },
  'PMU Surface Lots': { address: '101 N Grant St, West Lafayette, IN 47906', lat: 40.4240, lng: -86.9120 },
};

// building coordinates
const buildingLocations = {
  '1Bowl': { lat: 40.4295, lng: -86.9205 },
  'Aspen Hall': { lat: 40.4228, lng: -86.9143 },
  'Aspire': { lat: 40.4259, lng: -86.9311 },
  'Bailey Hall': { lat: 40.4257, lng: -86.9220 },
  'Batten Hall': { lat: 40.4250, lng: -86.9222 },
  'Bechtel Innovation Design Center': { lat: 40.4277, lng: -86.9174 },
  'Beering Hall': { lat: 40.4256, lng: -86.9123 },
  'Birck Nanotechnology Center': { lat: 40.4283, lng: -86.9268 },
  'Boiler Bistro': { lat: 40.4246, lng: -86.9123 },
  'Brown Laboratory': { lat: 40.4259, lng: -86.9109 },
  'Cary Quadrangle': { lat: 40.4266, lng: -86.9215 },
  'Chick-fil-A': { lat: 40.4297, lng: -86.9253 },
  'CIVS Building': { lat: 40.4220, lng: -86.9203 },
  'Cochran Hall': { lat: 40.4242, lng: -86.9145 },
  'Dauch Alumni Center': { lat: 40.4229, lng: -86.9155 },
  'Discovery Learning Center': { lat: 40.4276, lng: -86.9272 },
  'Earhart Dining Court': { lat: 40.4243, lng: -86.9225 },
  'Earhart Hall': { lat: 40.4243, lng: -86.9225 },
  'Electrical Engineering Building': { lat: 40.4258, lng: -86.9130 },
  'Ford Dining Court': { lat: 40.4240, lng: -86.9231 },
  'Forney Hall of Chemical Engineering': { lat: 40.4254, lng: -86.9122 },
  'Freshens': { lat: 40.4283, lng: -86.9198 },
  'Frieda Parker Hall': { lat: 40.4265, lng: -86.9238 },
  'Grissom Hall': { lat: 40.4255, lng: -86.9135 },
  'Harrison Hall': { lat: 40.4218, lng: -86.9205 },
  'Hawkins Hall': { lat: 40.4239, lng: -86.9133 },
  'Hillenbrand Dining Court': { lat: 40.4272, lng: -86.9218 },
  'Hillenbrand Hall': { lat: 40.4272, lng: -86.9218 },
  'Hilltop Apartments': { lat: 40.4285, lng: -86.9248 },
  'Hovde Hall': { lat: 40.4241, lng: -86.9138 },
  'Johnson Hall': { lat: 40.4261, lng: -86.9113 },
  'Jersey Mike’s': { lat: 40.4252, lng: -86.9123 },
  'Krannert Building': { lat: 40.4249, lng: -86.9130 },
  'Lawson Computer Science': { lat: 40.4273, lng: -86.9145 },
  'Lyles-Porter Hall': { lat: 40.4260, lng: -86.9224 },
  'Materials and Electrical Engineering Building': { lat: 40.4262, lng: -86.9132 },
  'Matthews Hall': { lat: 40.4255, lng: -86.9139 },
  'McCutcheon Hall': { lat: 40.4215, lng: -86.9179 },
  'Meredith Hall': { lat: 40.4234, lng: -86.9189 },
  'Meredith South': { lat: 40.4228, lng: -86.9185 },
  'Neil Armstrong Hall of Engineering': { lat: 40.4284, lng: -86.9150 },
  'On-the-Go at Earhart': { lat: 40.4243, lng: -86.9225 },
  'On-the-Go at Ford': { lat: 40.4240, lng: -86.9231 },
  'On-the-Go at Hillenbrand': { lat: 40.4272, lng: -86.9218 },
  'On-the-Go at Meredith South': { lat: 40.4228, lng: -86.9185 },
  'On-the-Go at Wiley': { lat: 40.4281, lng: -86.9257 },
  'On-the-Go at Windsor': { lat: 40.4237, lng: -86.9180 },
  'Owen Hall': { lat: 40.4260, lng: -86.9221 },
  'Panera Bread': { lat: 40.4252, lng: -86.9123 },
  'Pappy’s Sweet Shop': { lat: 40.4245, lng: -86.9121 },
  'Pete’s Za': { lat: 40.4247, lng: -86.9124 },
  'Pfendler Hall': { lat: 40.4262, lng: -86.9117 },
  'Purdue Food Co. Market': { lat: 40.4249, lng: -86.9123 },
  'Purdue Memorial Union': { lat: 40.4248, lng: -86.9121 },
  'Qdoba': { lat: 40.4250, lng: -86.9123 },
  'Recitation Building': { lat: 40.4262, lng: -86.9138 },
  'Shreve Hall': { lat: 40.4269, lng: -86.9238 },
  'Stanley Coulter Hall': { lat: 40.4260, lng: -86.9135 },
  'Starbucks at PMU': { lat: 40.4248, lng: -86.9121 },
  'Starbucks at Third Street': { lat: 40.4281, lng: -86.9198 },
  'Stewart Center': { lat: 40.4260, lng: -86.9126 },
  'Tarkington Hall': { lat: 40.4266, lng: -86.9215 },
  'Third Street Suites': { lat: 40.4284, lng: -86.9215 },
  'Wetherill Laboratory': { lat: 40.4259, lng: -86.9128 },
  'Wiley Dining Court': { lat: 40.4281, lng: -86.9257 },
  'Winifred Parker Hall': { lat: 40.4265, lng: -86.9238 },
  'Windsor Dining Court': { lat: 40.4237, lng: -86.9180 },
  'Windsor Halls': { lat: 40.4237, lng: -86.9180 },
  'Young Hall': { lat: 40.4262, lng: -86.9117 },
};

export default function GarageMapScreen({ route, navigation }) {
  const selectedBuilding = route?.params?.selectedBuilding ?? null;
  const selectedTime = route?.params?.selectedTime ?? null;

  const [recommendedGarages, setRecommendedGarages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [mapData, setMapData] = useState(null);

  const garages = [
    { name: 'Grant Street Garage', totalSpots: 620, occupiedSpots: 480, id: '1', coordinate: { latitude: 40.4258, longitude: -86.9118 } },
    { name: 'University Street Garage', totalSpots: 500, occupiedSpots: 500, id: '2', coordinate: { latitude: 40.4248, longitude: -86.9126 } },
    { name: 'Wood Street Garage', totalSpots: 400, occupiedSpots: 300, id: '3', coordinate: { latitude: 40.4285, longitude: -86.9201 } },
    { name: 'Northwestern Garage', totalSpots: 300, occupiedSpots: 300, id: '4', coordinate: { latitude: 40.4299, longitude: -86.9189 } },
    { name: 'Union Club Parking Garage', totalSpots: 300, occupiedSpots: 300, id: '5', coordinate: { latitude: 40.4245, longitude: -86.9112 } },
    { name: 'McCutcheon Lot', totalSpots: 200, occupiedSpots: 85, id: '6', coordinate: { latitude: 40.4225, longitude: -86.9185 } },
    { name: 'Harrison Street Garage', totalSpots: 450, occupiedSpots: 300, id: '7', coordinate: { latitude: 40.4223, longitude: -86.9215 } },
    { name: 'Wiley Lot', totalSpots: 180, occupiedSpots: 70, id: '8', coordinate: { latitude: 40.4278, longitude: -86.9255 } },
    { name: 'Civic Garage', totalSpots: 150, occupiedSpots: 40, id: '9', coordinate: { latitude: 40.4293, longitude: -86.9157 } },
    { name: 'Discovery Park District Garage', totalSpots: 300, occupiedSpots: 215, id: '10', coordinate: { latitude: 40.4265, longitude: -86.9304 } },
    { name: 'Third Street Garage', totalSpots: 300, occupiedSpots: 255, id: '11', coordinate: { latitude: 40.4290, longitude: -86.9230 } },
    { name: 'Purdue West Lot', totalSpots: 250, occupiedSpots: 165, id: '12', coordinate: { latitude: 40.4300, longitude: -86.9250 } },
    { name: 'PMU Surface Lots', totalSpots: 100, occupiedSpots: 75, id: '13', coordinate: { latitude: 40.4240, longitude: -86.9120 } },
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
        .slice(0, 5);

      const fullGarages = allGarages
        .filter((g) => g.isFull && g.distanceMiles !== 'N/A')
        .sort((a, b) => parseFloat(a.distanceMiles) - parseFloat(b.distanceMiles))
        .slice(0, 3);

      setRecommendedGarages([...availableGarages, ...fullGarages]);
    }
  }, [selectedBuilding, selectedTime]);

  const handleDisplayOnMap = (garageName) => {
    const garageCoords = garageLocations[garageName];
    const buildingCoords = buildingLocations[selectedBuilding];

    if (garageCoords && buildingCoords) {
      setMapData({
        origin: { latitude: garageCoords.lat, longitude: garageCoords.lng },
        destination: { latitude: buildingCoords.lat, longitude: buildingCoords.lng },
        originName: garageName,
        destinationName: selectedBuilding,
      });
      setModalVisible(true);
    } else {
      Alert.alert('Error', 'Could not find map coordinates for this location.');
    }
  };

  const renderGarageCard = (garage) => {
    const availableSpots = garage.totalSpots - garage.occupiedSpots;

    return (
      <View key={garage.name} style={styles.card}>
        <Text style={styles.garageName}>{garage.name}</Text>
        <Text style={styles.detail}>
          {garage.distanceMiles} mi from {selectedBuilding}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.cardEmoji}>🅿</Text>{garage.occupiedSpots}/{garage.totalSpots} occupied
        </Text>
        <Text style={[styles.status, { color: garage.isFull ? '#FF6B6B' : '#2EC4B6' }]}>
          {garage.isFull ? 'Full' : `${availableSpots} spots open`}
        </Text>
        <TouchableOpacity style={styles.mapButton} onPress={() => handleDisplayOnMap(garage.name)}>
          <Text style={styles.mapButtonText}>Display on Map</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const MapModal = () => {
    if (!mapData) return null;

    const { origin, destination, originName, destinationName } = mapData;
    const initialRegion = {
      latitude: (origin.latitude + destination.latitude) / 2,
      longitude: (origin.longitude + destination.longitude) / 2,
      latitudeDelta: Math.abs(origin.latitude - destination.latitude) * 1.5 || 0.02,
      longitudeDelta: Math.abs(origin.longitude - destination.longitude) * 1.5 || 0.02,
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Route to Your Destination</Text>
            <Text style={styles.modalSubtitle}>From <Text style={{fontWeight: 'bold'}}>{originName}</Text> to <Text style={{fontWeight: 'bold'}}>{destinationName}</Text></Text>
            <MapView
              style={styles.map}
              initialRegion={initialRegion}
            >
              <Marker
                coordinate={origin}
                pinColor="#dea663"
              >
                <Callout tooltip>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{originName}</Text>
                    <Text style={[styles.calloutText, { fontWeight: 'bold' }]}>Your Garage</Text>
                  </View>
                </Callout>
              </Marker>
              <Marker
                coordinate={destination}
                pinColor="#2EC4B6"
              >
                <Callout tooltip>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{destinationName}</Text>
                    <Text style={[styles.calloutText, { fontWeight: 'bold' }]}>Your Destination</Text>
                  </View>
                </Callout>
              </Marker>
              <Polyline
                coordinates={[origin, destination]}
                strokeColor="#bf8441"
                strokeWidth={4}
              />
            </MapView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
      <MapModal />
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
    shadowColor: '#dea663',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
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
    marginBottom: 5,
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
  cardEmoji: {
    fontSize: 25,
    marginRight: 5,
    color: '#dea663',
  },
  mapButton: {
    backgroundColor: '#bf8441',
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderColor: '#bf8441',
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f7e2ad',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 15,
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    borderColor: '#bf8441',
    borderWidth: 1,
  },
  closeButton: {
    backgroundColor: '#bf8441',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calloutContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 10,
    borderColor: '#bf8441',
    borderWidth: 1,
    shadowColor: '#dea663',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f7e2ad',
    marginBottom: 5,
  },
  calloutText: {
    fontSize: 12,
    color: '#cccccc',
  },
});
