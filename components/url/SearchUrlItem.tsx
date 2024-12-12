import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Alert, Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import StarRating from "../ui/StarRating";
import { router, usePathname } from "expo-router";
import { DocumentPreviewItem, UrlDocument } from "@/contracts/entities";
import moment from "moment";
import { useDocumentStore } from "@/stores/useDocumentStore";
import { useUrlDocumentStore } from "@/stores/useUrlDocumentStore";
import { isUserAdmin } from "@/utils/utils";
import Backend from "@/services/Backend";

type Props = {
    data: UrlDocument,
    refreshAfterDelete: () => void;
};

export default function SearchUrlItem({ data, refreshAfterDelete }: Props) {
    const urlStore: any = useUrlDocumentStore();

    const onPress = () => {
        urlStore.setState({ selectedUrlDocument: data });
        router.push('/urlDocumentPreview');
    }

    const pathName = usePathname();
    
    const onDelete = () => {
        const deleteDocument = async () => {
            console.log(data.id);
            Backend.delete(`url/${data.id}`)
            .then(res => {
                console.log(res);
                console.log('Success');
                refreshAfterDelete();
            })
            .catch(err => {
                console.log('Error');
                console.log(err);
            })
        }
        Alert.alert('Delete', 'Are you sure you want to delete this url?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: () => deleteDocument() }
        ]);
    }

    return (
        <Pressable onPress={onPress}>
            <View className="mb-5">
                <View className="flex-row justify-between gap-5 shrink-0 min-h-0 h-auto items-start">
                    <Text className="text-xl font-bold flex-1">{ data.title }</Text>
                    { isUserAdmin() && pathName === '/uploadedDocuments' && <View style={{ backgroundColor: '#ff3333', borderRadius: 4, padding: 7 }}>
                        <Ionicons name="trash" size={24} color="white" onPress={onDelete} />
                    </View> }
                </View>
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