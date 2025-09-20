import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function RecommendationScreen({ navigation }) {
  const [building, setBuilding] = useState('');
  const [time, setTime] = useState('');

  const handleRecommendation = () => {
    navigation.navigate('Garage Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Find Your Spot</Text>
      <Text style={styles.subtitle}>Where are you headed?</Text>

      <TextInput
        style={styles.input}
        placeholder="🏫 e.g., Armstrong Hall"
        placeholderTextColor="#888"
        value={building}
        onChangeText={setBuilding}
      />

      <TextInput
        style={styles.input}
        placeholder="⏰ e.g., 8:00 AM"
        placeholderTextColor="#888"
        value={time}
        onChangeText={setTime}
      />

      <TouchableOpacity style={styles.button} onPress={handleRecommendation}>
        <Text style={styles.buttonText}>🚗 Find My Spot</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('Report Theft')}>
        🕵️‍♂️ Report Theft
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#1C1C1E',
    flex: 1,
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
  input: {
    backgroundColor: '#2C2C2E',
    color: '#F7F7F7',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2EC4B6',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
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
