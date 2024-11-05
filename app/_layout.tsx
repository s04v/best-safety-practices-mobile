import { DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { PaperProvider } from 'react-native-paper';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [active, setActive] = useState('');

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <PaperProvider theme={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'slide_from_right', }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="home" options={{ headerShown: false, animation: 'ios' }} /> 

          <Stack.Screen name="newsPreview" options={{ headerShown: false, animation: 'ios' }} />

          <Stack.Screen name="documentPreview" options={{ headerShown: false, animation: 'ios' }} />
          <Stack.Screen name="createDocumentReview" options={{ headerShown: false, animation: 'ios' }} />
          <Stack.Screen name="searchDocumentsFilter" options={{ headerShown: false, animation: 'ios' }} />
          <Stack.Screen name="submitDocument" options={{ headerShown: false, animation: 'ios' }} />

          <Stack.Screen name="urlDocumentPreview" options={{ headerShown: false, animation: 'ios' }} />
          <Stack.Screen name="createUrlDocumentReview" options={{ headerShown: false, animation: 'ios' }} />
          <Stack.Screen name="searchUrlDocumentsFilter" options={{ headerShown: false, animation: 'ios' }} />

          <Stack.Screen name="login" options={{ headerShown: false, animation: 'ios' }} />
          <Stack.Screen name="register" options={{ headerShown: false, animation: 'ios' }} />

          <Stack.Screen name="profileMenu" options={{ headerShown: false, animation: 'ios' }} />
          <Stack.Screen name="updatePersonalInfo" options={{ headerShown: false, animation: 'ios' }} />
        </Stack>
      </PaperProvider>
    </ApplicationProvider> 
  );
}
