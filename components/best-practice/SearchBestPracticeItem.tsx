import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import StarRating from "../ui/StarRating";
import { router } from "expo-router";
import { DocumentPreviewItem } from "@/contracts/entities";
import moment from "moment";
import { useDocumentStore } from "@/stores/useDocumentStore";

type Props = {
    data: DocumentPreviewItem,
};

export default function SearchBestPracticeItem({ data }: Props) {
    const documentStore: any = useDocumentStore();

    const onPress = () => {
        documentStore.setState({ selectedDocument: data });
        router.push('/documentPreview');
    }
    
    return (
        <Pressable onPress={onPress}>
            <View className="mb-5">
                <Text className="text-xl font-bold">{ data.title }</Text>
                <Text className="text-gray-400">by { data.publisher }</Text>
                <StarRating value={data.rating} size={25} readonly={true} />
                <View className="flex-row gap-x-3 items-center mt-3">
                    <Text className="self-start px-4 py-1 rounded-2xl bg-blue-500 text-white">{ data.interest }</Text>
                    <Text className="self-start px-4 py-1 rounded-2xl bg-purple-500 text-white mr-auto">{ data.language }</Text>
                    <Text className="self-start py-1 ml-auto">{ moment(data.uploadDate).local().format("YYYY-MM-DD") } </Text>
                </View>
            </View>
        </Pressable>
    );
}