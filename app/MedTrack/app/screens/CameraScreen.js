import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useCameraPermissions, CameraView } from 'expo-camera';

function CameraScreen(props) {
    console.log("Viewing camera screen now");

    const cameraRef = React.useRef(null);
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Permission request is still loading
        return <View><Text>Requesting permissions...</Text></View>;
    }

    if (!permission.granted) {
        return (
            <View style={styles.mainContainer}>
                <Text>No access to camera</Text>
                <Button title="Allow Camera" onPress={requestPermission} />
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <CameraView ref={cameraRef} style={styles.camera} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
});

export default CameraScreen;
