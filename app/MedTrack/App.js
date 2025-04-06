import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, Image, SafeAreaView, Button, Alert, Dimensions } from 'react-native';
import DashboardScreen from './app/screens/DashboardScreen';

export default function App() {
  console.log("App executed");  // checks if app ran successfully

  console.log(Dimensions.get("screen"));  // this will give me the screen as an object: fontscale, height, scale, width, helpful to get dimensions of screen

  return (
    <DashboardScreen />
  );
}
