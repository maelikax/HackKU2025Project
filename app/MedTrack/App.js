import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, Image, SafeAreaView, Button, Alert, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './app/screens/DashboardScreen';
import ViewMedScreen from './app/screens/ViewMedScreen';
import CameraScreen from './app/screens/CameraScreen';
import ResultScreen from './app/screens/ResultScreen';

const Stack = createStackNavigator();

export default function App() {
  console.log("App executed");  // Checks if app ran successfully

  console.log(Dimensions.get("screen"));  // This will give me the screen as an object: fontscale, height, scale, width, helpful to get dimensions of screen

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="ViewMed" component={ViewMedScreen} />
        <Stack.Screen name="CamScreen" component={CameraScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
