import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker, Callout } from 'react-native-maps';

// Hardcoded data for Purdue parking locations
const parkingLocations = [
  {
    id: '1',
    name: 'Grant Street Garage',
    coordinate: { latitude: 40.4258, longitude: -86.9118 },
    totalSpots: 620,
    occupiedSpots: 480,
  },
  {
    id: '2',
    name: 'University Street Garage',
    coordinate: { latitude: 40.4248, longitude: -86.9126 },
    totalSpots: 500,
    occupiedSpots: 500,
  },
  {
    id: '3',
    name: 'Wood Street Garage',
    coordinate: { latitude: 40.4285, longitude: -86.9201 },
    totalSpots: 400,
    occupiedSpots: 300,
  },
  {
    id: '4',
    name: 'Northwestern Garage',
    coordinate: { latitude: 40.4299, longitude: -86.9189 },
    totalSpots: 300,
    occupiedSpots: 300,
  },
  {
    id: '5',
    name: 'Union Club Parking Garage',
    coordinate: { latitude: 40.4245, longitude: -86.9112 },
    totalSpots: 300,
    occupiedSpots: 300,
  },
  {
    id: '6',
    name: 'McCutcheon Lot',
    coordinate: { latitude: 40.4225, longitude: -86.9185 },
    totalSpots: 200,
    occupiedSpots: 85,
  },
  {
    id: '7',
    name: 'Harrison Street Garage',
    coordinate: { latitude: 40.4223, longitude: -86.9215 },
    totalSpots: 450,
    occupiedSpots: 300,
  },
  {
    id: '8',
    name: 'Wiley Lot',
    coordinate: { latitude: 40.4278, longitude: -86.9255 },
    totalSpots: 180,
    occupiedSpots: 70,
  },
  {
    id: '9',
    name: 'Civic Garage',
    coordinate: { latitude: 40.4293, longitude: -86.9157 },
    totalSpots: 150,
    occupiedSpots: 40,
  },
  {
    id: '10',
    name: 'Discovery Park District Garage',
    coordinate: { latitude: 40.4265, longitude: -86.9304 },
    totalSpots: 300,
    occupiedSpots: 215,
  },
  {
    id: '11',
    name: 'Third Street Garage',
    coordinate: { latitude: 40.4290, longitude: -86.9230 },
    totalSpots: 300,
    occupiedSpots: 255,
  },
  {
    id: '12',
    name: 'Purdue West Lot',
    coordinate: { latitude: 40.4300, longitude: -86.9250 },
    totalSpots: 250,
    occupiedSpots: 165,
  },
  {
    id: '13',
    name: 'PMU Surface Lots',
    coordinate: { latitude: 40.4240, longitude: -86.9120 },
    totalSpots: 100,
    occupiedSpots: 75,
  },
];

export default function CommunityUpdatesScreen() {
  const [updates, setUpdates] = useState([
    {
      id: '1',
      description: 'Construction on State Street near the intersection with Grant. Avoid the area.',
      type: 'construction',
      upvotes: 15,
      downvotes: 2,
    },
    {
      id: '2',
      description: 'Just saw a few open spots on the 3rd floor of the Grant Street Garage.',
      type: 'open_spot',
      upvotes: 8,
      downvotes: 0,
    },
    {
      id: '3',
      description: 'Lane closure on Northwestern Avenue between Stadium and Third Street due to utility work.',
      type: 'closure',
      upvotes: 3,
      downvotes: 5,
    },
  ]);
  const [newUpdateDescription, setNewUpdateDescription] = useState('');
  const [newUpdateType, setNewUpdateType] = useState('open_spot');
  const [location, setLocation] = useState(null);
  const [userVotes, setUserVotes] = useState({});

  const handleMapPress = (e) => {
    setLocation(e.nativeEvent.coordinate);
    Alert.alert(
      'Pin Dropped!',
      'You have successfully marked a location. Please provide a description and submit your update.',
      [{ text: 'OK' }]
    );
  };

  const submitUpdate = () => {
    if (!newUpdateDescription || !location) {
      Alert.alert('Missing Info', 'Please provide a description and long-press the map to set a location.');
      return;
    }

    const newUpdate = {
      id: Date.now().toString(),
      description: newUpdateDescription,
      type: newUpdateType,
      location: location,
      upvotes: 0,
      downvotes: 0,
    };

    setUpdates(prev => [newUpdate, ...prev]);
    setNewUpdateDescription('');
    setLocation(null);
    Alert.alert('Success', 'Your update has been submitted!');
  };

  const handleVote = (updateId, voteType) => {
    setUpdates(prev =>
      prev.map(update => {
        if (update.id === updateId) {
          const hasVotedUp = userVotes[updateId] === 'upvote';
          const hasVotedDown = userVotes[updateId] === 'downvote';

          if (voteType === 'upvote') {
            if (hasVotedUp) {
              setUserVotes(prevVotes => ({ ...prevVotes, [updateId]: null }));
              return { ...update, upvotes: Math.max(0, update.upvotes - 1) };
            } else {
              setUserVotes(prevVotes => ({ ...prevVotes, [updateId]: 'upvote' }));
              return {
                ...update,
                upvotes: update.upvotes + 1,
                downvotes: hasVotedDown ? Math.max(0, update.downvotes - 1) : update.downvotes,
              };
            }
          }

          if (voteType === 'downvote') {
            if (hasVotedDown) {
              setUserVotes(prevVotes => ({ ...prevVotes, [updateId]: null }));
              return { ...update, downvotes: Math.max(0, update.downvotes - 1) };
            } else {
              setUserVotes(prevVotes => ({ ...prevVotes, [updateId]: 'downvote' }));
              return {
                ...update,
                upvotes: hasVotedUp ? Math.max(0, update.upvotes - 1) : update.upvotes,
                downvotes: update.downvotes + 1,
              };
            }
          }
        }
        return update;
      })
    );
  };

  const renderUpdateCard = ({ item }) => {
    const hasVotedUp = userVotes[item.id] === 'upvote';
    const hasVotedDown = userVotes[item.id] === 'downvote';

    return (
      <View style={styles.card}>
        <Text style={styles.updateType}>
          {item.type === 'open_spot' ? '🅿 Open Spot' : item.type === 'closure' ? '⊗ Closure' : '⚠︎ Construction'}
        </Text>
        <Text style={styles.updateDescription}>{item.description}</Text>
        <View style={styles.voteContainer}>
          <TouchableOpacity
            style={[styles.voteButton, hasVotedUp && styles.upvoted]}
            onPress={() => handleVote(item.id, 'upvote')}
          >
            <MaterialIcons name="arrow-circle-up" size={19} color={hasVotedUp ? '#2EC4B6' : '#f7e2ad'} />
            <Text style={[styles.voteText, hasVotedUp && { color: '#2EC4B6' }]}> {item.upvotes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.voteButton, hasVotedDown && styles.downvoted]}
            onPress={() => handleVote(item.id, 'downvote')}
          >
            <MaterialIcons name="arrow-circle-down" size={19} color={hasVotedDown ? '#FF6B6B' : '#f7e2ad'} />
            <Text style={[styles.voteText, hasVotedDown && { color: '#FF6B6B' }]}> {item.downvotes}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={true}>
          <Text style={styles.title}>Community Updates</Text>

          <MapView
            style={styles.mapContainer}
            initialRegion={{
              latitude: 40.4258,
              longitude: -86.9137,
              latitudeDelta: 0.025,
              longitudeDelta: 0.025,
            }}
            showsUserLocation={false}
            onLongPress={handleMapPress}
          >
            {parkingLocations.map((location) => (
              <Marker
                key={location.id}
                coordinate={location.coordinate}
              >
                <Callout tooltip>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{location.name}</Text>
                    <Text style={styles.calloutText}>
                      Occupied: {location.occupiedSpots}/{location.totalSpots}
                    </Text>
                    <Text style={[styles.calloutText, {
                      color: location.totalSpots - location.occupiedSpots > 0 ? '#2EC4B6' : '#FF6B6B',
                      fontWeight: 'bold',
                    }]}>
                      {location.totalSpots - location.occupiedSpots > 0
                        ? `${location.totalSpots - location.occupiedSpots} spots open`
                        : 'Full'}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            ))}

            {location && (
              <Marker
                coordinate={location}
                pinColor="#dea663" // Changed pin color
              />
            )}
          </MapView>
          
          <FlatList
            data={updates.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))}
            keyExtractor={item => item.id}
            renderItem={renderUpdateCard}
            scrollEnabled={false}
          />

          <View style={styles.submitForm}>
            <Text style={styles.formTitle}>Add a New Update</Text>
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[styles.typeButton, newUpdateType === 'open_spot' && styles.activeTypeButton]}
                onPress={() => setNewUpdateType('open_spot')}
              >
                <Text style={styles.typeButtonText}>Open Spot</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeButton, newUpdateType === 'closure' && styles.activeTypeButton]}
                onPress={() => setNewUpdateType('closure')}
              >
                <Text style={styles.typeButtonText}>Closure</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeButton, newUpdateType === 'construction' && styles.activeTypeButton]}
                onPress={() => setNewUpdateType('construction')}
              >
                <Text style={styles.typeButtonText}>Construction</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Describe the update..."
              placeholderTextColor="#888"
              value={newUpdateDescription}
              onChangeText={setNewUpdateDescription}
              multiline
            />

            <TouchableOpacity style={styles.submitButton} onPress={submitUpdate}>
              <Text style={styles.submitButtonText}>Submit Update</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollViewContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#dea663',
    marginBottom: 20,
    textAlign: 'center',
  },
  mapContainer: {
    backgroundColor: '#1a1a1a',
    height: 300,
    borderRadius: 14,
    marginBottom: 20,
    borderColor: '#bf8441',
    borderWidth: 1,
    shadowColor: '#dea663',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
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
  updateType: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#bf8441',
    marginBottom: 8,
  },
  updateDescription: {
    fontSize: 14,
    color: '#f7e2ad',
    marginBottom: 10,
  },
  voteContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  voteButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    borderColor: '#bf8441',
    borderWidth: 1,
    flexDirection: 'row',
  },
  upvoted: {
    borderColor: '#2EC4B6',
    borderWidth: 2,
  },
  downvoted: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  voteText: {
    color: '#f7e2ad',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitForm: {
    paddingTop: 20,
    borderTopColor: '#bf8441',
    borderTopWidth: 1,
    marginTop: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dea663',
    marginBottom: 10,
    textAlign: 'center',
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  typeButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    borderColor: '#bf8441',
    borderWidth: 1,
  },
  activeTypeButton: {
    backgroundColor: '#bf8441',
  },
  typeButtonText: {
    color: '#f7e2ad',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#f7e2ad',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    borderColor: '#bf8441',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#bf8441',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000000',
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
