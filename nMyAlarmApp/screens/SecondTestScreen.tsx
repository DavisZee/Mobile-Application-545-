import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SecondTestScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is the Second Screen</Text>
      <Button 
        title="Go Back to Home" 
        onPress={() => navigation.goBack()} 
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

export default SecondTestScreen;
