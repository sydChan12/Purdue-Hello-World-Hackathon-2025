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
  const [newUpdateType, setNewUpdateType] = useState('open_spot');
  const [location, setLocation] = useState(null);
  const [userVotes, setUserVotes] = useState({});

  const dropPin = () => {
    Alert.alert(
      'Drop a Pin',
      'This feature would allow you to select a location on the map to report an issue. For this prototype, a mock location has been set.',
      [{ text: 'OK', onPress: () => setLocation({ latitude: 40.4287, longitude: -86.9137 }) }]
    );
  };

  const submitUpdate = () => {
    if (!newUpdateDescription || !location) {
      Alert.alert('Missing Info', 'Please provide a description and location.');
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
          if (userVotes[updateId] === voteType) {
            setUserVotes(prevVotes => ({ ...prevVotes, [updateId]: null }));
            return {
              ...update,
              upvotes: voteType === 'upvote' ? update.upvotes - 1 : update.upvotes,
              downvotes: voteType === 'downvote' ? update.downvotes - 1 : update.downvotes,
            };
          } else if (userVotes[updateId]) {
            setUserVotes(prevVotes => ({ ...prevVotes, [updateId]: voteType }));
            return {
              ...update,
              upvotes: voteType === 'upvote' ? update.upvotes + 1 : update.upvotes - 1,
              downvotes: voteType === 'downvote' ? update.downvotes + 1 : update.downvotes - 1,
            };
          } else {
            setUserVotes(prevVotes => ({ ...prevVotes, [updateId]: voteType }));
            return {
              ...update,
              upvotes: voteType === 'upvote' ? update.upvotes + 1 : update.upvotes,
              downvotes: voteType === 'downvote' ? update.downvotes + 1 : update.downvotes,
            };
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
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <Text style={styles.title}>🗣️ Community Updates</Text>

          <MapView />

          <FlatList
            data={updates.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))}
            keyExtractor={item => item.id}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 24,
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
    height: 200,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#bf8441',
    borderWidth: 1,
  },
  mapDisclaimer: {
    fontSize: 12,
    color: '#f7e2ad',
    textAlign: 'center',
    padding: 10,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderColor: '#bf8441',
    borderWidth: 1,
  },
  updateType: {
    fontSize: 18,
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
  dropPinButton: {
    backgroundColor: '#FF6B6B',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  dropPinButtonText: {
    color: '#000000',
    fontWeight: 'bold',
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
});
