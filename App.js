import React, { useEffect } from 'react';
import StackRoute from './routes/stack.routes';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded, error] = useFonts({
    'NewYork': require('./assets/fonts/NewYork.otf'),
    'NewYorkMedium-Bold': require("./assets/fonts/NewYorkMedium-Bold.otf"),
    'NewYorkMedium-Semibold': require("./assets/fonts/NewYorkMedium-Semibold.otf"),
    'NewYorkSmall-Bold': require("./assets/fonts/NewYorkSmall-Bold.otf")
  });

  useEffect(()=>{
    if(fontsLoaded || error){
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error])

  if(!fontsLoaded && !error) return null;  

  return <StackRoute/>;
}
