import React, { useEffect } from 'react';
import StackRoute from './routes/stack.routes';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded, error] = useFonts({
    'New-york': require('./assets/fonts/NewYork.otf'),
  });

  useEffect(()=>{
    if(fontsLoaded || error){
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error])

  if(!fontsLoaded && !error) return null;  

  return <StackRoute/>;
}
