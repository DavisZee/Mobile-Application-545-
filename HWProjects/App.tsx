import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; 
import SecondTestScreen from './screens/SecondTestScreen';
import ThirdStateScreen from './screens/ThirdStateScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SecondTest" component={SecondTestScreen} />
        <Stack.Screen name="ThirdStateScreen" component={ThirdStateScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
