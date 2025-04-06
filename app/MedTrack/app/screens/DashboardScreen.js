import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, Image, SafeAreaView, Button, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
 
export const DashboardScreen = (props) => {
  const navigation = useNavigation();  // Use the hook to access the navigation object

  return (
    <View style={styles.dashboardContainer}>
      {/* Dashboard where user can see their status and what medicines to take. */}
      <SafeAreaView style={styles.dashboard}>
        {/* Text to greet user and to let them know if they are on time or late to take their medicine. Will additionally let user know if they took the wrong medication. */}
        <Text>Hello, Mikaela!</Text>
        <Text>It's time to take your medicine today.</Text>

        {/* Card that shows the user their medicines, will only show they medication they haven't taken yet. Includes the dosage, instructions, and the schedule */}
        <TouchableHighlight 
          style={styles.medicineCard}
          onPress={() => navigation.navigate('ViewMed')}
          underlayColor="#D4D4D4"
        >
          <View>
            <View style={styles.medicineNameContainer}>
              <Text>Levothyroxine</Text>
            </View>
            <View style={styles.medicineInfo}>
                <Text>Dosage: 112 MCG</Text>
                <Text>Instructions: Take 1 pill once a day on an empty stomach. Do not drink or eat after 30 minutes.</Text>
                <Text>Daily, 8:00 AM</Text>
            </View>
          </View>
        </TouchableHighlight>
      </SafeAreaView>

      {/* Navigation bar for user to easily see their home screen, profile, contact their providers, and easy way to sign out. Will additionally have user login. */}
      <View style={styles.navBarContainer}>
        {/* User can navigate to home, profile, contacts/call, and sign out. */}
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
  },
  medicineCard: {
    backgroundColor: "#FFFFFF",
    width: "70%",
    height: "30%",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#4FE778",
  },
  medicineNameContainer: {
    backgroundColor: "#4FE778",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "30%",
  },
  medicineInfo: {

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
 