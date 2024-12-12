import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FlatListComponent } from 'react-native';
import { isUserLoggedIn } from '@/utils/utils';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isAuth = isUserLoggedIn();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="searchDocuments"
        options={{
          unmountOnBlur: true,
          title: 'Best practices',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'document' : 'document-outline'} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="searchUrls"
        options={{
          unmountOnBlur: true,
          title: 'Urls',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
          ),
          href: !isAuth ? null : undefined, 
        }}
      /> */}
      <Tabs.Screen
        name="searchNews"
        options={{
          unmountOnBlur: true,
          title: 'News',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'newspaper' : 'newspaper-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          unmountOnBlur: true,
          title: 'Menu',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'menu' : 'menu-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
