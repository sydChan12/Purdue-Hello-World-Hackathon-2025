import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroScreen from './screens/IntroScreen';
import RecommendationScreen from './screens/RecommendationScreen';
import TheftReportScreen from './screens/TheftReportScreen';
import GarageDashboardScreen from './screens/GarageMapScreen';
import EventsScreen from './screens/EventsScreen';
import HomeScreen from './screens/HomeScreen';
import CommunityUpdates from './screens/CommunityUpdates';
import SavedGaragesScreen from './screens/SavedGaragesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000000', // Matches your black background
          },
          headerTintColor: '#dea663', // A gold color for the back button and text
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Intro"
          component={IntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Get a Recommendation" component={RecommendationScreen} />
        <Stack.Screen name="Community Updates" component={CommunityUpdates} />
        <Stack.Screen name="Upcoming Events" component={EventsScreen} />
        <Stack.Screen name="Report Theft" component={TheftReportScreen} />
        <Stack.Screen name="Saved Garages" component={SavedGaragesScreen} />
        <Stack.Screen name="Garage Dashboard" component={GarageDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
