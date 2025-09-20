import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function RecommendationScreen({ navigation }) {
  const [building, setBuilding] = useState('');
  const [time, setTime] = useState('');

  const handleRecommendation = () => {
    // Mock recommendation logic
    navigation.navigate('Garage Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get a Recommendation</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Armstrong Hall"
        value={building}
        onChangeText={setBuilding}
      />
      <TextInput
        style={styles.input}
        placeholder="Select a time (e.g., 8am)"
        value={time}
        onChangeText={setTime}
      />
      <Button title="Find My Spot" onPress={handleRecommendation} />
      <Text style={styles.link} onPress={() => navigation.navigate('Report Theft')}>
        Report Theft
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15 },
  link: { marginTop: 20, color: 'blue', textDecorationLine: 'underline' }
});
