import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function TheftReportScreen() {
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const submitReport = () => {
    console.log({ type, date, location, description, image });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report a Theft</Text>
      <TextInput style={styles.input} placeholder="Select item type" value={type} onChangeText={setType} />
      <TextInput style={styles.input} placeholder="mm/dd/yyyy" value={date} onChangeText={setDate} />
      <TextInput style={styles.input} placeholder="e.g., In front of Armstrong Hall" value={location} onChangeText={setLocation} />
      <TextInput style={styles.input} placeholder="e.g., Red Schwinn bicycle with a basket" value={description} onChangeText={setDescription} />
      <Button title="Choose File" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginTop: 10 }} />}
      <Button title="Submit Report" onPress={submitReport} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15 }
});
