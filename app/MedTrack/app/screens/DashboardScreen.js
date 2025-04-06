import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, Image, SafeAreaView, Button, Alert, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { useEffect, useState } from 'react';

export const DashboardScreen = (props) => {
  console.log("🟢 Component rendered");
  const navigation = useNavigation();  // Use the hook to access the navigation object
  const [name, setName] = useState("");
  const [patientMeds, setpatientMeds] = useState();
  const patientId="30470578-572f-48fd-a696-0db0be84e9ec";
  useEffect(() => {
    console.log("Fetching patient info...");
    const fetchPatientInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patient/${patientId}/info`);
        console.log("Response Status:", response.status);
  
        // Only parse the response once
        const data = await response.json();
        console.log("Parsed Data:", data); // Log the parsed JSON
        
        // Assuming response has a 'first_name' field
        if (data.patientinfo && data.patientinfo[0] && data.patientinfo[0].first_name) {
          setName(data.patientinfo[0].first_name); // Use the name from the array
        } else {
          console.error("No 'first_name' found in the response data");
        }
      } catch (error) {
        console.error("Failed to fetch patient info:", error);
      }
    };
  
    fetchPatientInfo();
  }, []);
  useEffect(() => {
    console.log("Fetching patient info...");
    const fetchPatientMedicines = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patient/${patientId}/medications`);
        console.log("Response Status:", response.status);
  
        // Only parse the response once
        const data = await response.json();
        console.log("Parsed Data:", data); // Log the parsed JSON
        
        // Assuming response has a 'first_name' field
        if (data.patient_medications) {
          setpatientMeds(data.patient_medications); // Use the name from the array
          console.log(patientMeds);
        } else {
          console.error("No data found in the response data");
        }
      } catch (error) {
        console.error("Failed to fetch patient info:", error);
      }
    };
  
    fetchPatientMedicines();
  }, []);
  
  

  return (
    <View style={styles.dashboardContainer}>
      <SafeAreaView style={styles.dashboard}>
        <View style={styles.dashboardIntro}>
          <Text style={{
            fontSize: 50,
            fontWeight: "bold"
          }}>Hello, {name}!</Text>
          <Text style={{
            fontSize: 36,
            color: "#5AA9E6"
          }}>It's time to take your medicine today.</Text>
        </View>

        {/* Generate a medicine card for each medication */}
        {patientMeds && patientMeds.length > 0 ? (
          patientMeds.map((med, index) => (
            <TouchableHighlight 
              key={index} 
              style={styles.medicineCard} 
              onPress={() => navigation.navigate('ViewMed', { med: med })}
              underlayColor="#D4D4D4"
            >
              <View>
                <View style={styles.medicineNameContainer}>
                  <Text style={{
                    left: 20,
                    fontSize: 26,
                    fontWeight: "600",
                  }}>{med.medication_name}</Text>
                </View>
                <View style={styles.medicineInfo}>
                  <Text style={{
                    fontSize: 30,
                    padding: 10,
                    color: "#4A4A4A"
                  }}>Dosage: {med.medication_dosage}</Text>
                </View>
              </View>
            </TouchableHighlight>
          ))
        ) : (
          <Text>No medications today</Text>
        )}
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

export default DashboardScreen;
 