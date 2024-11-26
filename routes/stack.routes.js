import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Teste from '../screens/Teste';
import Home from '../screens/Home';
import Days from '../screens/Days';
import { HeaderTitle } from '@react-navigation/elements';

const Stack = createStackNavigator();

export default function StackRoute() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home" >

        <Stack.Screen 
        name="Home" 
        component={Home}
        options={{headerShown: false}}
        />

        <Stack.Screen 
        name="Days" 
        component={Days}
        options={{headerShown: false}}
        />

        <Stack.Screen 
        name="Teste" 
        component={Teste}
         options={{
          title: false,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#f5f5f5",
          }
           }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
