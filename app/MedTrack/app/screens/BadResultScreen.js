import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, Image, SafeAreaView, Button, Alert, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { useEffect, useState } from 'react';

function BadResultScreen(props) {
    return (
        <View style={styles.dashboardContainer}>
          <SafeAreaView style={styles.dashboard}>
            <View style={styles.dashboardIntro}>
              <Text style={{
                fontSize: 50,
                fontWeight: "bold"
              }}>Sorry</Text>
              <Text style={{
                fontSize: 36,
                color: "#5AA9E6"
              }}>You did not take the right medication. The medicine needed at this time was Acetaminophen. Your provider will call you shortly.</Text>
            </View>
          </SafeAreaView>
    
          <View style={styles.navBarContainer}>
            <View style={styles.navBarButtons}>
              <TouchableHighlight>
                <Image source={require("../assets/homeIcon.png")} />
              </TouchableHighlight>
              <TouchableHighlight>
                <Image source={require("../assets/profileIcon.png")} />
              </TouchableHighlight>
              <TouchableHighlight>
                <Image source={require("../assets/phoneIcon.png")} />
              </TouchableHighlight>
              <TouchableHighlight>
                <Image source={require("../assets/signoutIcon.png")} />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    };

    const styles = StyleSheet.create({
        dashboardContainer: {
          flex: 1
        },
        dashboard: {
          flex: 8,
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        },
        dashboardIntro: {
          padding: 10,
          gap: 10,
        },
        medicineCard: {
          backgroundColor: "#FFFFFF",
          width: "70%",
          height: 120,
          borderWidth: 2,
          borderRadius: 15,
          borderColor: "#4FE778",
        },
        medicineNameContainer: {
          backgroundColor: "#4FE778",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: 60,
          justifyContent: "center",
        },
        medicineInfo: {
          alignItems: "center",
        },
        navBarContainer: {
          backgroundColor: "#E1F3FF",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        },
        navBarButtons: {
          flexDirection: "row",
          gap: "10%",
        },
        
      });

export default BadResultScreen;