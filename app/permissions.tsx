import BaseLayout from "@/components/BaseLayout";
import { EditPermissionItem } from "@/components/permissions/EditPermissionIitem";
import ScreenLayout from "@/components/ScreenLayout";
import Backend from "@/services/Backend";
import { Ionicons } from "@expo/vector-icons";
import { Select, SelectItem } from "@ui-kitten/components";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";


const plans = ["Free", "Basic", "Premium"];

export default function PermissionsScreen() {
  const navigation = useNavigation();
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    Backend.get("subscription")
      .then(res => preparePermissionData(res));
  }, []);

  const preparePermissionData = (data: any) => {
    const tmpPermissions: any = [];

    data.forEach((item: any) => {
      const subPermissions = item.permissions.map((permission: any) => 
        ({ id: permission.id, description: permission.description, subscriptionId: item.id}));

      tmpPermissions.push(...subPermissions);
    });

    setPermissions(tmpPermissions);
  };

  console.log(JSON.stringify(permissions));
  return (
    <BaseLayout>
      <Pressable className="m-4" onPress={() => { navigation.goBack(); }}>
        <Ionicons name="arrow-back" size={28}  />
      </Pressable>

      <View className="px-4 flex-col flex-1 gap-y-2">
        {permissions.map(item => (
          <View >
            <EditPermissionItem permission={item} />
          </View>
        ))}
      </View>
    </BaseLayout>
  );
}