import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>BoilerRoute</Text>
                <Text style={styles.subtitle}>Your one-stop guide to parking at Purdue University.</Text>

                <View style={styles.grid}>
                    <View style={styles.cardWrapper}>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('Get a Recommendation')}
                        >
                            <Text style={styles.cardEmoji}>🅿</Text>
                            <Text style={styles.cardTitle}>Find a Spot</Text>
                            <Text style={styles.cardSubtitle}>Get personalized parking garage recommendations.</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardWrapper}>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('Saved Garages')}
                        >
                            <Text style={styles.cardEmoji}>★</Text>
                            <Text style={styles.cardTitle}>My Saved Garages</Text>
                            <Text style={styles.cardSubtitle}>View availability for your favorite spots.</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardWrapper}>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('Community Updates')}
                        >
                            <Image
                                source={require('../assets/talking_head_icon.png')}
                                style={styles.cardImage}
                            />
                            <Text style={styles.cardTitle}>Community Updates</Text>
                            <Text style={styles.cardSubtitle}>See and report real-time parking information.</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.cardWrapper}>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('Upcoming Events')}
                        >
                            <Text style={styles.cardEmoji}>☑</Text>
                            <Text style={styles.cardTitle}>Upcoming Events</Text>
                            <Text style={styles.cardSubtitle}>Check events that could affect parking.</Text>
                        </TouchableOpacity>
                    </View>
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
    cardWrapper: {
        width: '48%',
        marginBottom: 20,
        borderRadius: 14,
        shadowColor: '#dea663',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 14,
        padding: 20,
        height: 200, // <-- Increased the height
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
    cardImage: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        marginBottom: 10,
        resizeMode: 'contain',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#cccccc',
        textAlign: 'center',
    },
});
