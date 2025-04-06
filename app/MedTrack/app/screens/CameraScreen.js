import React from 'react';
import { StyleSheet, View, Text, Button, Alert, Image } from 'react-native';
import { useCameraPermissions, CameraView } from 'expo-camera';

function CameraScreen(props) {
    console.log("Viewing camera screen now");

    const cameraRef = React.useRef(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = React.useState(null);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photoData = await cameraRef.current.takePictureAsync();
                setPhoto(photoData.uri); // Save the photo URI
                console.log("Photo taken:", photoData.uri);
            } catch (error) {
                console.log("Error taking photo:", error);
                Alert.alert("Error", "Failed to take photo");
            }
        }
    };

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
            <View style={styles.controls}>
                <Button title="Take Photo" onPress={takePicture} />
            </View>
            {photo && (
                <Image source={{ uri: photo }} style={styles.preview} />
            )}
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
    controls: {
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
    },
    preview: {
        width: 100,
        height: 150,
        position: "absolute",
        top: 50,
        right: 20,
        borderColor: "white",
        borderWidth: 2,
    }
});

export default CameraScreen;
