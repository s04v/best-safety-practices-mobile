import BaseLayout from "@/components/BaseLayout";
import SearchBestPracticeItem from "@/components/best-practice/SearchBestPracticeItem";
import ScreenLayout from "@/components/ScreenLayout";
import Pagination from "@/components/ui/Pagination";
import { DocumentPreviewItem } from "@/contracts/entities";
import Backend from "@/services/Backend";
import { useDocumentSearchStore } from "@/stores/useDocumentSearchStore";
import { useDocumentStore } from "@/stores/useDocumentStore";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input } from "@ui-kitten/components";
import { router, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Linking, Pressable, ScrollView, View } from "react-native";
import { Icon, Text, TextInput } from "react-native-paper";

const PAGE_SIZE = 10;

export default function SubscriptionScreen() {
  const navigation = useNavigation();

  const [currentPlan, setCurrentPlan] = useState("Free trial");
    
  useEffect(() => {
    Backend.get('user/me/subscription')
      .then(res=> {
          setCurrentPlan(res.name);
      });
  }, []);

  const openPortal = async () => {
    await Linking.openURL("https://billing.stripe.com/p/login/test_7sI28O4mbg9A8qA288");
  }

  return (
    <BaseLayout>
      <Pressable className="m-4 mb-0" onPress={() => { navigation.goBack(); }}>
        <Ionicons name="arrow-back" size={28}  />
      </Pressable>
      <View className="px-4">
        <Text className="text-center mb-2 text-2xl font-bold">Subscription</Text>
        <Text className="my-2 text-xl font-bold">Current plan</Text>
        <Text className="text-lg mb-3">{currentPlan}</Text>
        <Button status="info" onPress={openPortal}>Open customer portal</Button>
      </View >
    </BaseLayout>
    )
}