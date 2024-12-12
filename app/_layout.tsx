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

          <Stack.Screen name="newsPreview" options={{ title: "News", animation: 'ios' }} />

          <Stack.Screen name="documentPreview" options={{ title: "Document", animation: 'ios' }} />
          <Stack.Screen name="createDocumentReview" options={{ title: "Review", animation: 'ios' }} />
          <Stack.Screen name="searchDocumentsFilter" options={{ title: "Filters", animation: 'ios' }} />
          <Stack.Screen name="submitDocument" options={{ title: "Submit document", animation: 'ios' }} />

          <Stack.Screen name="urlDocumentPreview" options={{ title: "Url", animation: 'ios' }} />
          <Stack.Screen name="createUrlDocumentReview" options={{ title: "Review", animation: 'ios' }} />
          <Stack.Screen name="searchUrlDocumentsFilter" options={{ title: "Filters", animation: 'ios' }} />
          <Stack.Screen name="submitUrl" options={{ title: "Submit url", animation: 'ios' }} />


          <Stack.Screen name="login" options={{ title: "Login", animation: 'ios' }} />
          <Stack.Screen name="register" options={{ title: "Register", animation: 'ios' }} />

          <Stack.Screen name="profileMenu" options={{ title: "Profile",  animation: 'ios' }} />
          <Stack.Screen name="updatePersonalInfo" options={{ title: "Personal info", animation: 'ios' }} />
          <Stack.Screen name="ownedUploadedDocuments" options={{ title: "Uploaded documents", animation: 'ios' }} />
          <Stack.Screen name="subscription" options={{ title: "Subscription", animation: 'ios' }} />
          <Stack.Screen name="messagesList" options={{ title: "Messages", animation: 'ios' }} />

          <Stack.Screen name="dashboardMenu" options={{ title: "Dashboard", animation: 'ios' }} />
          <Stack.Screen name="usersList" options={{ title: "Users", animation: 'ios' }} />
          <Stack.Screen name="updateUsersPersonalInfo" options={{ title: "Update user", animation: 'ios' }} />
          <Stack.Screen name="permissions" options={{ title: "Permissions", animation: 'ios' }} />
          <Stack.Screen name="adminMessagesList" options={{ title: "Messages", animation: 'ios' }} />
          <Stack.Screen name="addMessage" options={{ title: "New message", animation: 'ios' }} />
          <Stack.Screen name="uploadedDocuments" options={{ title: "Uploaded documents", animation: 'ios' }} />
        </Stack>
      </PaperProvider>
    </ApplicationProvider> 
  );
}
