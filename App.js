import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecommendationScreen from './screens/RecommendationScreen';
import TheftReportScreen from './screens/TheftReportScreen';
import GarageDashboardScreen from './screens/GarageMapScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Get a Recommendation">
        <Stack.Screen name="Get a Recommendation" component={RecommendationScreen} />
        <Stack.Screen name="Report Theft" component={TheftReportScreen} />
        <Stack.Screen name="Garage Dashboard" component={GarageDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
