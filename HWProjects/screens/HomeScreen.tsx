import { Button, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av'; // Import Audio from expo-av

const HomeScreen = ({ navigation }) => {
  const [volume, setVolume] = useState(0.5);
  const [audioUri, setAudioUri] = useState(null);
  const [sound, setSound] = useState(); // State to hold sound object

  useEffect(() => {
    // Load the saved volume from AsyncStorage
    const loadVolume = async () => {
      const savedVolume = await AsyncStorage.getItem('volume');
      if (savedVolume) setVolume(parseFloat(savedVolume));
    };
    loadVolume();
  }, []);

  const saveVolume = async (value) => {
    setVolume(value);
    await AsyncStorage.setItem('volume', value.toString());
  };

  const pickAudioFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });
      console.log('Document Picker Result:', result); // Log the entire result object
  
      // Check if the picker was canceled
      if (result.canceled) {
        console.log('File selection was canceled.');
        return; // Exit if canceled
      }
  
      // Check if there's an asset and get the URI from the assets array
      if (result.assets && result.assets.length > 0) {
        const { uri } = result.assets[0]; // Get the URI from the first asset
        setAudioUri(uri);
        console.log('Picked audio file URI:', uri); // Log the URI of the picked audio file
  
        // Optionally store the audio file URI for later use
        await AsyncStorage.setItem('audioUri', uri);
        console.log('Audio file saved to AsyncStorage'); // Confirm the save action
  
        // Retrieve and log the saved URI to confirm it was saved
        const savedUri = await AsyncStorage.getItem('audioUri');
        console.log('Retrieved audio URI from AsyncStorage:', savedUri);
      } else {
        console.log('No audio file selected or assets are empty.');
      }
    } catch (error) {
      console.error('Error picking audio file:', error);
    }
  };

  const loadAudioFile = async () => {
    const storedAudioUri = await AsyncStorage.getItem('audioUri');
    if (storedAudioUri) {
      setAudioUri(storedAudioUri);
      playSound(storedAudioUri); // Call playSound with the loaded URI
    } else {
      console.log('No audio file saved');
    }
  };

  // Function to play sound
  const playSound = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
    await sound.playAsync(); // Play the sound
    console.log('Playing audio from URI:', uri);
  };

  // Function to stop sound
  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync(); // Stop the sound
      console.log('Audio stopped');
    }
  };

  // Cleanup sound on unmount
  useEffect(() => {
    return sound ? () => {
      sound.unloadAsync(); // Unload sound when component unmounts
    } : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen, Changed Text to create new pull request lol</Text>
      <Button 
        title="Go to Second Screen" 
        onPress={() => navigation.navigate('SecondTest')} 
      />
      
      <Text>Adjust Volume:</Text>
      <Slider
        minimumValue={0}
        maximumValue={1}
        step={0.1}
        value={volume}
        onValueChange={saveVolume}
        style={styles.slider}
      />
      <Text>Current Volume: {volume}</Text>

      <Button 
        title="Pick Audio File" 
        onPress={pickAudioFile} 
      />
      <Button 
        title="Load Audio File" 
        onPress={loadAudioFile} 
      />
      <Button 
        title="Stop Audio File" 
        onPress={stopSound} // Call stopSound when button is pressed
      />

      {audioUri && <Text>Audio File URI: {audioUri}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: 200,
    height: 40,
  },
});

export default HomeScreen;
