import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import BaseLayout from '@/components/BaseLayout';
import { Link, router } from 'expo-router';
import NavigationButton from '@/components/NavigationButton';
import { isUserLoggedIn } from '@/utils/utils';
import * as SecureStore from 'expo-secure-store';

import { reloadAppAsync } from 'expo';

export default function SearchScreen() {
  const logout = async (e: any) => {
    try {
      await SecureStore.deleteItemAsync("jwt");
      router.navigate("/")
    } catch(e: any) {
      console.error("Error", e);
    }
  };

  return (
    <BaseLayout>
    { isUserLoggedIn() ? <>
      <NavigationButton text="Profile" iconName="person-outline" href="/home" />
      <NavigationButton text="Submit Best Practice" iconName="document-outline" href="/submitDocument"  />
      <NavigationButton text="Submit Url" iconName="link-outline" href="/home"  />
      <Pressable onPress={logout}>
        <Text className="py-3 px-4 border border-black">Logout</Text>
        {/* <NavigationButton text="Logout" iconName="exit-outline" href=""  /> */}
      </Pressable>
    </>
    : <>
      <NavigationButton text="Login" iconName="enter-outline" href="/login" />
      <NavigationButton text="Register" iconName="person-outline" href="/register" />
    </>}
    </BaseLayout>
  );
}