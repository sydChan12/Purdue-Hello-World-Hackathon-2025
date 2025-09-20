import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function RecommendationScreen({ navigation }) {
  const [buildingQuery, setBuildingQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const buildingOptions = [
    'Armstrong Hall',
    'Lawson Computer Science',
    'Hillenbrand Hall',
    'Purdue Memorial Union',
    'Lyles-Porter Hall',
    'Beering Hall',
    'Wetherill Laboratory',
    'Neil Armstrong Hall of Engineering',
    'Stanley Coulter Hall',
    'Krannert Building',
  ];

  const filteredBuildings = buildingOptions.filter((b) =>
    b.toLowerCase().includes(buildingQuery.toLowerCase())
  );

  const [timeOpen, setTimeOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeItems, setTimeItems] = useState([
    { label: '8:00 AM', value: '8am' },
    { label: '9:00 AM', value: '9am' },
    { label: '10:00 AM', value: '10am' },
    { label: '12:00 PM', value: '12pm' },
    { label: '3:00 PM', value: '3pm' },
    { label: '5:00 PM', value: '5pm' },
  ]);

  const handleRecommendation = () => {
    if (selectedBuilding && selectedTime) {
      navigation.navigate('Garage Dashboard', {
        selectedBuilding,
        selectedTime,
      });
    } else {
      Alert.alert('Missing Info', 'Please select both a building and time.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>🔍 Find Your Spot</Text>
        <Text style={styles.subtitle}>Where are you headed?</Text>

        <Text style={styles.label}>🏫 Destination Building</Text>
        <TextInput
          style={styles.input}
          placeholder="Start typing..."
          placeholderTextColor="#888"
          value={buildingQuery}
          onChangeText={(text) => {
            setBuildingQuery(text);
            setShowSuggestions(true);
            setSelectedBuilding(null);
          }}
          onFocus={() => setShowSuggestions(true)}
        />

        {showSuggestions && filteredBuildings.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={filteredBuildings}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => {
                    setBuildingQuery(item);
                    setSelectedBuilding(item);
                    setShowSuggestions(false);
                  }}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        <Text style={styles.label}>⏰ Intended Arrival Time</Text>
        <View style={{ zIndex: 2000 }}>
          <DropDownPicker
            open={timeOpen}
            value={selectedTime}
            items={timeItems}
            setOpen={setTimeOpen}
            setValue={setSelectedTime}
            setItems={setTimeItems}
            placeholder="Select a time"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>

        <View style={{ height: timeOpen ? 200 : 0 }} />

        <TouchableOpacity style={styles.button} onPress={handleRecommendation}>
          <Text style={styles.buttonText}>🚗 Find My Spot</Text>
        </TouchableOpacity>

        <Text style={styles.link} onPress={() => navigation.navigate('Upcoming Events')}>
          🗓️ Upcoming Events
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#1C1C1E',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
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
  label: {
    color: '#F7F7F7',
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#2C2C2E',
    color: '#F7F7F7',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  suggestionsContainer: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    borderColor: '#444',
    borderWidth: 1,
    maxHeight: 150,
    marginBottom: 16,
  },
  suggestionItem: {
    padding: 12,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  suggestionText: {
    color: '#F7F7F7',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#2C2C2E',
    borderColor: '#444',
    marginBottom: 16,
    borderRadius: 12,
  },
  dropdownText: {
    color: '#F7F7F7',
    fontSize: 16,
  },
  dropdownContainer: {
    backgroundColor: '#2C2C2E',
    borderColor: '#444',
  },
  button: {
    backgroundColor: '#2EC4B6',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#1C1C1E',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 30,
    color: '#FF6B6B',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
