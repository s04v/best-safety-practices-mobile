import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import BaseLayout from '@/components/BaseLayout';
import { Link, router, useFocusEffect } from 'expo-router';
import NavigationButton from '@/components/NavigationButton';
import { isUserLoggedIn } from '@/utils/utils';
import * as SecureStore from 'expo-secure-store';

import { reloadAppAsync } from 'expo';
import ScreenLayout from '@/components/ScreenLayout';
import { useEffect, useState } from 'react';
import Backend, { userHasPermissions } from '@/services/Backend';
import { UserPermissions } from '@/constants/permisions';

export default function ProfileMenuScreen() {
  const [canSeeUploadedDocuments, setCanSeeUploadedDocuments] = useState();
  const [hasNewMessages, setHasNewMessages] = useState(false);

  useEffect(() => {
    userHasPermissions(UserPermissions.SeeUploadedDocuments)
      .then((res: any) => {
        setCanSeeUploadedDocuments(res);
      });
  }, []);

  useFocusEffect(() => {
    Backend.get('message/check-new')
    .then((res: any) => {
      setHasNewMessages(res.status);
    });
  });
  
  const logout = async (e: any) => {
    try {
      await SecureStore.deleteItemAsync("jwt");
      router.navigate("/")
    } catch(e: any) {
      console.error("Error", e);
    }
  };

  return (
    <BaseLayout >
      <NavigationButton text="Personal Information" iconName="person-outline" href="/updatePersonalInfo" />
      {canSeeUploadedDocuments && <NavigationButton text="Uploaded Documents" iconName="attach-outline" href="/ownedUploadedDocuments"  /> }
      <NavigationButton text="Subscription" iconName="file-tray-full-outline" href="/subscription"  />
      <NavigationButton text="Messages" indicator={hasNewMessages} iconName="pencil-outline" href="/messagesList"  />
    </BaseLayout>
  );
}