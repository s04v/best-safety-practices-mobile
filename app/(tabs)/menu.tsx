import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import BaseLayout from '@/components/BaseLayout';
import { Link } from 'expo-router';
import NavigationButton from '@/components/NavigationButton';

export default function SearchScreen() {

  const MenuItem = ({ children }: any) =>  <Pressable className="text-[24px] py-4"><Text>{ children }</Text></Pressable>

  return (
    <BaseLayout>
      <NavigationButton text="Profile" iconName="person-outline" href="/home" />
      <NavigationButton text="Submit Best Practice" iconName="document-outline" href="/home"  />
      <NavigationButton text="Search Best Practice" iconName="search-outline" href="/home"  />
      <NavigationButton text="Submit Url" iconName="link-outline" href="/home"  />
      <NavigationButton text="Search Url" iconName="search-outline" href="/home"  />
      <NavigationButton text="Logout" iconName="exit-outline" href="/home"  />
    </BaseLayout>
  );
}