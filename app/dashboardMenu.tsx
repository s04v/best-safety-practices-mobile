import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import BaseLayout from '@/components/BaseLayout';
import { Link, router } from 'expo-router';
import NavigationButton from '@/components/NavigationButton';
import { isUserLoggedIn } from '@/utils/utils';
import * as SecureStore from 'expo-secure-store';

import { reloadAppAsync } from 'expo';
import ScreenLayout from '@/components/ScreenLayout';

export default function DashboardMenuScreen() {

  return (
    <BaseLayout>
      <NavigationButton text="Users" iconName="person-outline" href="/usersList" />
      <NavigationButton text="Best Practices" iconName="attach-outline" href="/uploadedDocuments"  />
      <NavigationButton text="Permissions" iconName="file-tray-full-outline" href="/permissions"  />
      <NavigationButton text="Messages" iconName="file-tray-full-outline" href="/adminMessagesList"  />
    </BaseLayout>
  );
}