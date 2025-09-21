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
  StatusBar,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function RecommendationScreen({ navigation }) {
  const [buildingQuery, setBuildingQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const buildingOptions = [
    // ... (rest of your buildingOptions array)
    '1Bowl',
    'Aspen Hall',
    'Aspire',
    'Bailey Hall',
    'Batten Hall',
    'Bechtel Innovation Design Center',
    'Beering Hall',
    'Birck Nanotechnology Center',
    'Boiler Bistro',
    'Brown Laboratory',
    'Cary Quadrangle',
    'Chick-fil-A',
    'CIVS Building',
    'Cochran Hall',
    'Dauch Alumni Center',
    'Discovery Learning Center',
    'Earhart Dining Court',
    'Earhart Hall',
    'Electrical Engineering Building',
    'Ford Dining Court',
    'Forney Hall of Chemical Engineering',
    'Freshens',
    'Frieda Parker Hall',
    'Grissom Hall',
    'Harrison Hall',
    'Hawkins Hall',
    'Hillenbrand Dining Court',
    'Hillenbrand Hall',
    'Hilltop Apartments',
    'Hovde Hall',
    'Johnson Hall',
    'Jersey Mike’s',
    'Krannert Building',
    'Lawson Computer Science',
    'Lyles-Porter Hall',
    'Materials and Electrical Engineering Building',
    'Matthews Hall',
    'McCutcheon Hall',
    'Meredith Hall',
    'Meredith South',
    'Neil Armstrong Hall of Engineering',
    'On-the-Go at Earhart',
    'On-the-Go at Ford',
    'On-the-Go at Hillenbrand',
    'On-the-Go at Meredith South',
    'On-the-Go at Wiley',
    'On-the-Go at Windsor',
    'Owen Hall',
    'Panera Bread',
    'Pappy’s Sweet Shop',
    'Pete’s Za',
    'Pfendler Hall',
    'Purdue Food Co. Market',
    'Purdue Memorial Union',
    'Qdoba',
    'Recitation Building',
    'Shreve Hall',
    'Stanley Coulter Hall',
    'Starbucks at PMU',
    'Starbucks at Third Street',
    'Stewart Center',
    'Tarkington Hall',
    'Third Street Suites',
    'Wetherill Laboratory',
    'Wiley Dining Court',
    'Winifred Parker Hall',
    'Windsor Dining Court',
    'Windsor Halls',
    'Young Hall',
  ];

  const filteredBuildings = buildingOptions.filter((b) =>
    b.toLowerCase().includes(buildingQuery.toLowerCase())
  );

  const [timeOpen, setTimeOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeItems, setTimeItems] = useState([
    { label: '7:00 AM', value: '7am' },
    { label: '8:00 AM', value: '8am' },
    { label: '9:00 AM', value: '9am' },
    { label: '10:00 AM', value: '10am' },
    { label: '11:00 AM', value: '11am' },
    { label: '12:00 PM', value: '12pm' },
    { label: '1:00 PM', value: '1pm' },
    { label: '2:00 PM', value: '2pm' },
    { label: '3:00 PM', value: '3pm' },
    { label: '4:00 PM', value: '4pm' },
    { label: '5:00 PM', value: '5pm' },
  ]);

  const handleRecommendation = () => {
    if (selectedBuilding && selectedTime) {
      // Navigate to the Garage Dashboard screen, passing the selected data
      navigation.navigate('Garage Dashboard', {
        selectedBuilding,
        selectedTime,
      });
    } else {
      Alert.alert('Missing Info', 'Please select both a building and time.');
    }
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, backgroundColor: '#000000' }}
      >
        <ScrollView
          contentContainerStyle={[styles.container, { backgroundColor: '#000000' }]}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Find Your Spot</Text>
          <Text style={styles.subtitle}>Where are you headed?</Text>

          <Text style={styles.label}>Destination Building</Text>
          <TextInput
            style={[styles.input, styles.glowEffect]}
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
            <View style={[styles.suggestionsContainer, styles.glowEffect]}>
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

          <Text style={styles.label}>Intended Arrival Time</Text>
          <View style={{ zIndex: 2000 }}>
            <DropDownPicker
              open={timeOpen}
              value={selectedTime}
              items={timeItems}
              setOpen={setTimeOpen}
              setValue={setSelectedTime}
              setItems={setTimeItems}
              placeholder="Select a time"
              style={[styles.dropdown, styles.glowEffect]}
              textStyle={styles.dropdownText}
              dropDownContainerStyle={[styles.dropdownContainer, styles.glowEffect]}
            />
          </View>

          <View style={{ height: timeOpen ? 200 : 0 }} />

          <TouchableOpacity style={[styles.button, styles.glowEffect]} onPress={handleRecommendation}>
            <Text style={styles.buttonText}>Find My Spot</Text>
          </TouchableOpacity>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 36,
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
  label: {
    color: '#f7e2ad',
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#f7e2ad',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    fontSize: 16,
    borderColor: '#bf8441',
    borderWidth: 1,
  },
  suggestionsContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderColor: '#bf8441',
    borderWidth: 1,
    maxHeight: 150,
    marginBottom: 16,
  },
  suggestionItem: {
    padding: 12,
    borderBottomColor: '#bf8441',
    borderBottomWidth: 1,
  },
  suggestionText: {
    color: '#f7e2ad',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#1a1a1a',
    borderColor: '#bf8441',
    borderRadius: 12,
  },
  dropdownText: {
    color: '#f7e2ad',
    fontSize: 16,
  },
  dropdownContainer: {
    backgroundColor: '#1a1a1a',
    borderColor: '#bf8441',
  },
  button: {
    backgroundColor: '#bf8441',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 2,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    marginTop: 30,
    color: '#dea663',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  glowEffect: {
    shadowColor: '#dea663',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
});
