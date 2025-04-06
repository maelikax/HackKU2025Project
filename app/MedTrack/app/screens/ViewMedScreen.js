import React from 'react';

function ViewMedScreen(props) {
    return (
        <View style={styles.dashboardContainer}>
            {/* Dashboard where user can see their status and what medicines to take. */}
            <SafeAreaView style={styles.dashboard}>
                {/* Card shows user more details about their medication */}
                <View style={styles.medicineNameContainer}>
                    <Text>Levothyroxine</Text>
                </View>
                <View style={styles.medicineInfo}>
                    <Text>Dosage: 112 MCG</Text>
                    <Text>Instructions: Take 1 pill once a day on an empty stomach. Do not drink or eat after 30 minutes.</Text>
                    <Text>Daily, 8:00 AM</Text>
                </View>
            </SafeAreaView>

            {/* User presses button to take a picture. */}
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
      flex: 10,
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
    },
    
  });

export default ViewMedScreen;