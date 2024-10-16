import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen, Changed Text to create new pull request lol</Text>
      <Button 
        title="Go to Second Screen" 
        onPress={() => navigation.navigate('SecondTest')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
