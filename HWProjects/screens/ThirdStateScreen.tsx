import React, { useEffect, useState } from 'react';
import { View, Text, AppState, AppStateStatus, StyleSheet } from 'react-native';

const ThirdStateScreen = () => {
  // State variable to store the app's current state
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  const [lastActiveTimestamp, setLastActiveTimestamp] = useState<Date | null>(null);

  // Update the app state when it changes
  useEffect(() => {
    // Define a callback for app state changes
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        // Going to background
        console.log('App is going to background');
        setLastActiveTimestamp(new Date());
      }
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // Returning to the foreground
        console.log('App has returned to the foreground');
      }
      
      // Update the app state variable
      setAppState(nextAppState);
    };

    // Add the event listener for app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Cleanup the listener when the component unmounts
    return () => {
      subscription.remove();
    };
  }, [appState]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App State Management</Text>
      <Text style={styles.stateText}>Current App State: {appState}</Text>
      {lastActiveTimestamp && appState === 'active' && (
        <Text style={styles.resumeText}>
          Welcome back! You were last here at {lastActiveTimestamp.toLocaleTimeString()}
        </Text>
      )}
      {appState !== 'active' && (
        <Text style={styles.awayText}>
          You are currently away from the app
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stateText: {
    fontSize: 18,
    color: '#333',
  },
  resumeText: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 10,
  },
  awayText: {
    fontSize: 16,
    color: '#FF5722',
    marginTop: 10,
  },
});

export default ThirdStateScreen;
