
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { View, Text, SafeAreaView, StatusBar, Pressable, Platform } from 'react-native';
import { Icon } from 'react-native-paper';
import Animated, { useAnimatedRef } from 'react-native-reanimated';

export default function ScreenLayout({ children }: any) {
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }} className="flex-1 pb-4">
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View className="pb-3">
          <Pressable className="m-5" onPress={() => { navigation.goBack(); }}>
            <Ionicons name="arrow-back" size={28}  />
          </Pressable>
          {children}
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}