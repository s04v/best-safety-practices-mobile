import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import BaseLayout from '@/components/BaseLayout';
import { Text } from 'react-native-paper';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <BaseLayout>
        <Text>Not found</Text>
      </BaseLayout>
    </>
  );
}