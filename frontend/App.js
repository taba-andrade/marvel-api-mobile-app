import * as React from 'react';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackActions } from '@react-navigation/native';
import Icon from '@expo/vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SplashScreen from './screens/SplashScreen';


const Stack = createNativeStackNavigator();

function App({ navigation }) {

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{
        headerStyle: {
          backgroundColor: '#f0ad4e',
        },
        headerTintColor: '#000000',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({ 
          title: 'Home', 
          headerShown: true,
          headerLeft: () => (
            <Button
              onPress={() => navigation.dispatch(StackActions.push('Splash'))}
              icon={()=><Icon name="chevron-back-outline" size={30}/>}
              color="#000000"
              style={{ fontSize: 16, marginHorizontal: -10 }}                           
            />
          )
        })} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Comics', headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;