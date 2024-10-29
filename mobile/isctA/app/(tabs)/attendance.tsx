
import { Text, View, StyleSheet, Button, TouchableOpacity, Pressable } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';

export default function AttendanceScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null)


  const navigation = useNavigation()
  const focused = navigation.isFocused()

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  function handleBarcodeScanned({ type, data }: { type: string, data: string }) {
    if (scannedData !== data) {
      setScannedData(data);
      navigateToDetails(data);
    }
  }

  function navigateToDetails(data: string) {
    router.push(`/checkin?url=${data}` as any); // Pass data as parameter
  }




  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function resetData() {
    setScannedData(null)
  }

  return (
    <View style={styles.container}>
      {focused ? <CameraView style={styles.camera} facing={facing} onBarcodeScanned={scannedData ? undefined : handleBarcodeScanned}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
        : null}
      <Pressable style={styles.button} onPress={resetData}><Text style={styles.textButton}>Scan again</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    width: "50%",  // Set width to 50% of screen width
    height: "50%", // Set height to 50% of screen height
  },
  buttonContainer: {
    position: 'absolute', // Position buttons over the camera view
    bottom: 20,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
