import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function TheftReportScreen() {
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const submitReport = () => {
    console.log({ type, date, location, description, image });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕵️‍♀️ Report a Theft</Text>

      <TextInput
        style={styles.input}
        placeholder="🛵 Item type (e.g., bike, car)"
        placeholderTextColor="#888"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="📅 Date (mm/dd/yyyy)"
        placeholderTextColor="#888"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="📍 Location (e.g., Armstrong Hall)"
        placeholderTextColor="#888"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="📝 Description"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>📸 Upload Photo</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={submitReport}>
        <Text style={styles.buttonText}>🚨 Submit Report</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: '#1C1C1E',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
