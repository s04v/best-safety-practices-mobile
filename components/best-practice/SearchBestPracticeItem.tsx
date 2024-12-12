import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Alert, Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import StarRating from "../ui/StarRating";
import { router, useNavigation, usePathname, useRootNavigationState, useRouter } from "expo-router";
import { DocumentPreviewItem } from "@/contracts/entities";
import moment from "moment";
import { useDocumentStore } from "@/stores/useDocumentStore";
import { Button } from "@ui-kitten/components";
import Backend from "@/services/Backend";
import { isUserAdmin } from "@/utils/utils";

type Props = {
    data: DocumentPreviewItem,
    refreshAfterDelete?: () => void;
};

export default function SearchBestPracticeItem({ data, refreshAfterDelete }: Props) {
    const documentStore: any = useDocumentStore();

    const onPress = () => {
        documentStore.setState({ selectedDocument: data });
        router.push('/documentPreview');
    }
    
    const onDelete = () => {
        const deleteDocument = async () => {
            console.log(data.id);
            Backend.delete(`document/${data.id}`)
            .then(res => {
                console.log(res);
                console.log('Success');
                refreshAfterDelete && refreshAfterDelete();
            })
            .catch(err => {
                console.log('Error');
                console.log(err);
            })
        }
        Alert.alert('Delete', 'Are you sure you want to delete this document?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: () => deleteDocument() }
        ]);
    }

    const pathName = usePathname();

    return (
        <Pressable onPress={onPress}>
            <View className="mb-5">
                <View className="flex-row justify-between gap-5 shrink-0 min-h-0 h-auto items-start">
                    <Text className="text-xl font-bold flex-1">{ data.title }</Text>
                    { isUserAdmin() && pathName === '/uploadedDocuments' && <View style={{ backgroundColor: 'red', borderRadius: 4, padding: 7,  }}>
                        <Ionicons name="trash" size={24} color="white" onPress={onDelete} />
                    </View> }
                </View>
                <Text className="text-gray-400">by { data.publisher }</Text>
                <StarRating value={data.rating} size={25} readonly={true} />
                <Text className="self-start px-4 py-1 mt-1 rounded-2xl bg-blue-500 text-white">{ data.publisher ? "Best practice" : "URL" }</Text>
                <View className="flex-row gap-x-3 items-center mt-3">
                    <Text className="self-start px-4 py-1 rounded-2xl bg-blue-500 text-white">{ data.interest }</Text>
                    <Text className="self-start px-4 py-1 rounded-2xl bg-purple-500 text-white mr-auto">{ data.language }</Text>
                    <Text className="self-start py-1 ml-auto">{ moment(data.uploadDate).local().format("YYYY-MM-DD") } </Text>
                </View>
            </View>
        </Pressable>
    );
}