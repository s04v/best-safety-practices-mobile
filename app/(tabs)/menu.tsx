import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import BaseLayout from '@/components/BaseLayout';
import { Link, router } from 'expo-router';
import NavigationButton from '@/components/NavigationButton';
import { isUserLoggedIn } from '@/utils/utils';
import * as SecureStore from 'expo-secure-store';

import { reloadAppAsync } from 'expo';

export default function SearchScreen() {
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("jwt");
      router.navigate("/")
    } catch(e: any) {
      console.error("Error", e);
    }
  };

  return (
    <BaseLayout withHeader>
    { isUserLoggedIn() ? <>
      <NavigationButton text="Profile" iconName="person-outline" href="/profileMenu" />
      <NavigationButton text="Dashboard" iconName="person-outline" href="/dashboardMenu" />
      <NavigationButton text="Submit Best Practice" iconName="document-outline" href="/submitDocument"  />
      <NavigationButton text="Submit Url" iconName="link-outline" href="/submitUrl"  />
      <NavigationButton text="Logout" iconName="link-outline" onClick={logout}  />
    </>
    : <>
      <NavigationButton text="Login" iconName="enter-outline" href="/login" />
      <NavigationButton text="Register" iconName="person-outline" href="/register" />
    </>}
    </BaseLayout>
  );
}