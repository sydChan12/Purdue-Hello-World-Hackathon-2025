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
  Platform
} from 'react-native';

// Map component placeholder
const MapView = () => (
  <View style={styles.mapContainer}>
    <Text style={styles.mapDisclaimer}>
      Note: This is a placeholder for a real map. For this feature to work, you would need to install a library like 'react-native-maps'.
    </Text>
  </View>
);

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
  const [newUpdateType, setNewUpdateType] = useState('open_spot'); // Default type
  const [location, setLocation] = useState(null);

  // New state to track user's votes and the type of vote
  const [userVotes, setUserVotes] = useState({});

  const dropPin = () => {
    Alert.alert(
      "Drop a Pin",
      "This feature would allow you to select a location on the map to report an issue. For this prototype, a mock location has been set.",
      [{ text: "OK", onPress: () => setLocation({ latitude: 40.4287, longitude: -86.9137 }) }]
    );
  };

  const submitUpdate = () => {
    if (!newUpdateDescription || !location) {
      Alert.alert("Missing Info", "Please provide a description and location.");
      return;
    }
    
    const newUpdate = {
      id: Date.now().toString(), // Simple unique ID
      description: newUpdateDescription,
      type: newUpdateType,
      location: location,
      upvotes: 0,
      downvotes: 0,
    };
    
    setUpdates(prevUpdates => [newUpdate, ...prevUpdates]);
    setNewUpdateDescription('');
    setLocation(null);
    Alert.alert("Success", "Your update has been submitted!");
  };

  const handleVote = (updateId, voteType) => {
    setUpdates(prevUpdates => 
      prevUpdates.map(update => {
        if (update.id === updateId) {
          // Check if user is removing their vote
          if (userVotes[updateId] === voteType) {
            setUserVotes(prevVotes => ({ ...prevVotes, [updateId]: null }));
            if (voteType === 'upvote') {
              return { ...update, upvotes: update.upvotes - 1 };
            } else {
              return { ...update, downvotes: update.downvotes - 1 };
            }
          }
          // Check if user is changing their vote
          else if (userVotes[updateId]) {
            setUserVotes(prevVotes => ({ ...prevVotes, [updateId]: voteType }));
            if (voteType === 'upvote') {
              return { ...update, upvotes: update.upvotes + 1, downvotes: update.downvotes - 1 };
            } else {
              return { ...update, downvotes: update.downvotes + 1, upvotes: update.upvotes - 1 };
            }
          }
          // User is casting their first vote
          else {
            setUserVotes(prevVotes => ({ ...prevVotes, [updateId]: voteType }));
            if (voteType === 'upvote') {
              return { ...update, upvotes: update.upvotes + 1 };
            } else {
              return { ...update, downvotes: update.downvotes + 1 };
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
          {item.type === 'open_spot' ? '🅿️ Open Spot' : item.type === 'closure' ? '🚧 Closure' : '⚠️ Construction'}
        </Text>
        <Text style={styles.updateDescription}>{item.description}</Text>
        <View style={styles.voteContainer}>
          <TouchableOpacity 
            style={[styles.voteButton, hasVotedUp && styles.upvoted]} 
            onPress={() => handleVote(item.id, 'upvote')}
          >
            <Text style={styles.voteText}>👍 {item.upvotes}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.voteButton, hasVotedDown && styles.downvoted]} 
            onPress={() => handleVote(item.id, 'downvote')}
          >
            <Text style={styles.voteText}>👎 {item.downvotes}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>🗣️ Community Updates</Text>
      
      <MapView />

      <FlatList
        data={updates.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))}
        keyExtractor={(item) => item.id}
        renderItem={renderUpdateCard}
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

        <TouchableOpacity style={styles.dropPinButton} onPress={dropPin}>
          <Text style={styles.dropPinButtonText}>Drop a Pin on the Map</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={submitUpdate}>
          <Text style={styles.submitButtonText}>Submit Update</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  mapContainer: {
    backgroundColor: '#3A3A3C',
    height: 200,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  mapDisclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    padding: 10,
  },
  updatesList: {
    flex: 1,
  },
  card: {
    backgroundColor: '#2C2C2E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  updateType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2EC4B6',
    marginBottom: 8,
  },
  updateDescription: {
    fontSize: 14,
    color: '#F7F7F7',
    marginBottom: 10,
  },
  voteContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  voteButton: {
    backgroundColor: '#3A3A3C',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
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
    color: '#F7F7F7',
    fontWeight: 'bold',
  },
  submitForm: {
    paddingTop: 20,
    borderTopColor: '#3A3A3C',
    borderTopWidth: 1,
    marginTop: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A259FF',
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
    backgroundColor: '#3A3A3C',
  },
  activeTypeButton: {
    backgroundColor: '#2EC4B6',
  },
  typeButtonText: {
    color: '#F7F7F7',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#2C2C2E',
    color: '#F7F7F7',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  dropPinButton: {
    backgroundColor: '#FF6B6B',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  dropPinButtonText: {
    color: '#1C1C1E',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#2EC4B6',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#1C1C1E',
    fontWeight: 'bold',
  },
});
