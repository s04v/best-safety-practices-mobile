
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { View, Text, SafeAreaView, StatusBar, Pressable, Platform } from 'react-native';
import { Icon } from 'react-native-paper';

export default function ScreenLayout({ children }: any) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }} className="flex-1 pb-4">
        <Pressable className="m-5" onPress={() => { navigation.goBack(); }}>
          <Ionicons name="arrow-back" size={28}  />
        </Pressable>
        {children}
    </SafeAreaView>
  );
}
