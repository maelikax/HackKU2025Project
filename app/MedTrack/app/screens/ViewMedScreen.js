import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, Image, SafeAreaView, Button, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import {usePermissions} from 'expo-media-library';
import {useCameraPermissions, useMicrophonePermissions} from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ViewMedScreen(props) {
    console.log("Viewing med screen now");  // Checks if app navigated from dashboard to view med screen successfully

    {/* Need to ask for permission from user, and keep track of status for camera */}
    const [cameraPermissions, requestCameraPermission] = useCameraPermissions();
    const [microphonePermissions, requestMicrophonePermission] = useMicrophonePermissions();
    const [mediaLibraryPermissions, requestMediaLibraryPermission] = usePermissions();

    async function handleContinue() {
        const allPermissions = await requestAllPermissions();
        if(allPermissions) {
            router.replace("/(tabs)")
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
        const mediaLibraryStatus = await requestMediaLiibraryPermission();
        if(!mediaLibraryStatus.granted) {
            Alert.alert("Error", "Camera permissions is required")
            return false;
        }
        return true;
    }

    return (
        <View>
            {/* Dashboard where user can see their status and what medicines to take. */}
            <SafeAreaView>
                {/* Card shows user more details about their medication */}
                <View>
                    <Text>Levothyroxine</Text>
                </View>

                <View>
                    <Text>Dosage: 112 MCG</Text>
                    <Text>
                        Instructions: Take 1 pill once a day on an empty stomach. Preferably 1/2 to 1 hour before breakfast. You make take this medicine with water. Do not drink or eat after 30 minutes of taking the medicine.
                    </Text>
                    <Text>
                        Take this medication at least 4 hours before taking antacids, iron, or vitamin/mineral supplements.
                    </Text>
                    <Text>
                        Take or use this medicine exactly as directed. Do not skip doses or discontinue unless directed by doctor.
                    </Text>
                    <Text>
                        Check with your doctor before including grapefruit or grapefruit juice in your diet.
                    </Text>
                    <Text>Daily, 8:00 AM</Text>
                </View>

                {/* User presses button to take a picture. */}
                <View>
                    <Button title="Take Medicine" onPress={handleContinue}></Button>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default ViewMedScreen;