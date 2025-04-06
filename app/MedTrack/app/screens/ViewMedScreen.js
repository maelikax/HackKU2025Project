import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, Image, SafeAreaView, Button, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import {useCameraPermissions, useMicrophonePermissions} from 'expo-camera';
import { useRoute } from '@react-navigation/native';

function ViewMedScreen(props) {
    console.log("Viewing med screen now");  // Checks if app navigated from dashboard to view med screen successfully
    const route = useRoute();
    const { med } = route.params;
    const med_name=med.medication_name;
    const dosage=med.medication_dosage;
    const instructions=med.instructions;
    const navigation = useNavigation();  // Use the hook to access the navigation object

    {/* Need to ask for permission from user, and keep track of status for camera */}
    const [cameraPermissions, requestCameraPermission] = useCameraPermissions();
    const [microphonePermissions, requestMicrophonePermission] = useMicrophonePermissions();

    async function handleContinue() {
        const allPermissions = await requestAllPermissions();
        if(allPermissions) {
            navigation.navigate('CamScreen')
        } else {
            Alert.alert("To continue please provide permissions in settings");
        }
    }

    async function requestAllPermissions() {
        {/* User needs to grant permissions */}
        const cameraStatus = await requestCameraPermission();
        if(!cameraStatus.granted) {
            Alert.alert("Error", "Camera permissions is required")
            return false;
        }
        const microphoneStatus = await requestMicrophonePermission();
        if(!microphoneStatus.granted) {
            Alert.alert("Error", "Camera permissions is required")
            return false;
        }
        return true;
    }

    return (
        <View style={styles.container}>
            {/* Dashboard where user can see their status and what medicines to take. */}
            <SafeAreaView style={styles.medInfo}>
                {/* Card shows user more details about their medication */}
                <View style={{
                    gap: 30,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text style={{
                        alignSelf: "center",
                        fontSize: 50,
                        fontWeight: "bold",
                    }}>{med_name}</Text>

                    <View style={{
                        gap: 10,
                        padding: 25,
                        backgroundColor: "#FFFFFF",
                        borderRadius: 15,
                        borderColor: "#7FC8F8",
                        borderWidth: 2,
                        width: "80%",
                    }}>
                        <Text style={{
                            fontSize: 30,
                            fontWeight: "500",
                        }}>Dosage: {dosage}</Text>
                        <Text style={{
                            fontSize: 20,
                        }}>
                            {instructions}
                        </Text>
                        <Text style={{
                            fontSize: 20,
                        }}>
                            Take or use this medicine exactly as directed. Do not skip doses or discontinue unless directed by doctor.
                        </Text>
                        <Text style={{
                            fontSize: 20,
                        }}>
                            Check with your doctor before including grapefruit or grapefruit juice in your diet.
                        </Text>
                        <Text style={{
                            fontSize: 30,
                            fontWeight: "500",
                        }}>Daily, 8:00 AM</Text>
                    </View>
                </View>

                {/* User presses button to take a picture. */}
                <View>
                    <Button title="Take Medicine" onPress={handleContinue}></Button>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E1F3FF"
    },
    medInfo: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
});

export default ViewMedScreen;