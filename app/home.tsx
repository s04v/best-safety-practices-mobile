
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { View, Text, SafeAreaView, StatusBar, Pressable, Platform } from 'react-native';
import { Icon } from 'react-native-paper';

export default function HomeScreen() {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
        <Pressable className="m-5" onPress={() => { navigation.goBack(); }}>
          <Ionicons name="arrow-back" size={28}  />
        </Pressable>
        <Text className="mx-10" >Menu</Text>
    </SafeAreaView>
  );
}

