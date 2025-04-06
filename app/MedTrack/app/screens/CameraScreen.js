import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, Image, SafeAreaView, Button, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import {usePermissions} from 'expo-media-library';
import {useCameraPermissions, useMicrophonePermissions} from 'expo-camera';

function CameraScreen(props) {
    console.log("Viewing camera screen now");

    return (
        <View>
            <Text>Camera</Text>
        </View>
    );
}

export default CameraScreen;