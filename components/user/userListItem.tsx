import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { router } from "expo-router";
import { DocumentPreviewItem } from "@/contracts/entities";

type Props = {
    data: DocumentPreviewItem,
};

export default function UserListItem({ data }: any) {
    const onPress = () => {
        router.push(`/updateUsersPersonalInfo?userId=${data.id}`);
    }
    
    return (
        <Pressable onPress={onPress}>
            <View className="mb-5">
                <Text className="text-xl font-bold">{ data.firstName } { data.lastName }</Text>
                <Text className="text-gray-600">{ data.email }</Text>
                <View className="flex-row gap-x-3 items-center mt-3">
                    <Text className="self-start px-4 py-1 rounded-2xl bg-blue-500 text-white">{ data.interest }</Text>
                    <Text className="self-start px-4 py-1 rounded-2xl bg-purple-500 text-white mr-auto">{ data.language }</Text>
                </View>
            </View>
        </Pressable>
    );
}