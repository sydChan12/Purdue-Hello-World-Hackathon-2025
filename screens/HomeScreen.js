import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚗 Campus Parking App</Text>
      <Text style={styles.subtitle}>Your one-stop guide to parking at Purdue University.</Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={[styles.card, styles.recommendationCard]}
          onPress={() => navigation.navigate('Get a Recommendation')}
        >
          <Text style={styles.cardEmoji}>🔍</Text>
          <Text style={styles.cardTitle}>Find a Spot</Text>
          <Text style={styles.cardSubtitle}>Get personalized parking garage recommendations.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.savedCard]}
          onPress={() => navigation.navigate('My Saved Garages')}
        >
          <Text style={styles.cardEmoji}>⭐</Text>
          <Text style={styles.cardTitle}>My Saved Garages</Text>
          <Text style={styles.cardSubtitle}>View availability for your favorite spots.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.communityCard]}
          onPress={() => navigation.navigate('Community Updates')}
        >
          <Text style={styles.cardEmoji}>🗣️</Text>
          <Text style={styles.cardTitle}>Community Updates</Text>
          <Text style={styles.cardSubtitle}>See and report real-time parking information.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.eventsCard]}
          onPress={() => navigation.navigate('Upcoming Events')}
        >
          <Text style={styles.cardEmoji}>🗓️</Text>
          <Text style={styles.cardTitle}>Upcoming Events</Text>
          <Text style={styles.cardSubtitle}>Check events that could affect parking.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#1C1C1E',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A259FF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#F7F7F7',
    marginBottom: 40,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#2C2C2E',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    width: '48%',
    minHeight: 180,
    justifyContent: 'space-between',
  },
  cardEmoji: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F7F7F7',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  recommendationCard: {
    backgroundColor: '#3A3A3C',
  },
  savedCard: {
    backgroundColor: '#58585A',
  },
  communityCard: {
    backgroundColor: '#4E4E4E',
  },
  eventsCard: {
    backgroundColor: '#6C6C6E',
  },
});
