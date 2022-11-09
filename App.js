import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationString from './src/constants/NotificationString';
import {Details, HomeScreen, SearchCities} from './src/Screen';
import Citites from './src/Screen/Cities/Citites';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NotificationString.HOME}>
        <Stack.Screen name={NotificationString.HOME} component={HomeScreen} />
        <Stack.Screen name={NotificationString.DETAILS} component={Details} />
        <Stack.Screen name={NotificationString.CITIES} component={Citites} />
        <Stack.Screen
          name={NotificationString.SEARCHCITIES}
          component={SearchCities}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
