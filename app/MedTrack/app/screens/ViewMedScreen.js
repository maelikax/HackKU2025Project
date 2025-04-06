import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, Image, SafeAreaView, Button, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

function ViewMedScreen(props) {
    console.log("Viewing med screen now");  // Checks if app navigated from dashboard to view med screen successfully

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
                        Take thhis medication at least 4 hours before taking antacids, iron, or vitamin/mineral supplements.
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
                    <Button title="Take Medicine"></Button>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default ViewMedScreen;