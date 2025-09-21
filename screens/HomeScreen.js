import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>BoilerRoute</Text>
        <Text style={styles.subtitle}>Your one-stop guide to parking at Purdue University.</Text>

        <View style={styles.grid}>
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('Get a Recommendation')}
  >
    <Text style={styles.cardEmoji}>🅿</Text>
    <Text style={styles.cardTitle}>Find a Spot</Text>
    <Text style={styles.cardSubtitle}>Get personalized parking garage recommendations.</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('Saved Garages')}
  >
    <Text style={styles.cardEmoji}>★</Text>
    <Text style={styles.cardTitle}>My Saved Garages</Text>
    <Text style={styles.cardSubtitle}>View availability for your favorite spots.</Text>
  </TouchableOpacity>

    <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('Community Updates')}
  >
    <Text style={styles.cardEmoji}>🗨</Text>
    <Text style={styles.cardTitle}>Community Updates</Text>
    <Text style={styles.cardSubtitle}>See and report real-time parking information.</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('Upcoming Events')}
  >
    <Text style={styles.cardEmoji}>☑</Text>
    <Text style={styles.cardTitle}>Upcoming Events</Text>
    <Text style={styles.cardSubtitle}>Check events that could affect parking.</Text>
  </TouchableOpacity>
</View>

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#000000',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#dea663',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#bf8441',
    marginBottom: 40,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    width: '48%',
    minHeight: 180,
    justifyContent: 'space-between',
    borderColor: '#bf8441',
    borderWidth: 1,
  },
  cardEmoji: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
    color: '#dea663',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f7e2ad',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardEmoji: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
    color: '#dea663', // Gold tone
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
  },
});
