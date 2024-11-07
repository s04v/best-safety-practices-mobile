import BaseLayout from "@/components/BaseLayout";
import SearchUrlItem from "@/components/url/SearchUrlItem";
import Pagination from "@/components/ui/Pagination";
import { UrlDocument } from "@/contracts/entities"; 
import Backend from "@/services/Backend";
import { useDocumentSearchStore } from "@/stores/useDocumentSearchStore";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "@ui-kitten/components";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Text } from "react-native-paper";
import { useUrlDocumentSearchStore } from "@/stores/useUrlDocumentSearchStore";

const PAGE_SIZE = 10;

export default function SearchUrlDocuments() {
    const store: any = useUrlDocumentSearchStore();
    const isFiltersApplied = store.interest || store.language;

    const [isLoading, setIsLoading] = useState(true);
    const [urlDocuments, setUrlDocuments] = useState<UrlDocument[]>([]);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const fetchUrlDocuments = () => {
        setIsLoading(true);

        const body = {
            interest: store.interest,
            language: store.language,
            page: currentPage - 1,
            title: searchQuery,
            sortBy: "rating_desc"
        };

        Backend.post('url/search', body)
            .then((data) => {
                console.log(data);
                setUrlDocuments(data.data as UrlDocument[]);
                setTotalDocuments(data.totalCount);
                setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE));
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchUrlDocuments();
    }, [currentPage, isFiltersApplied]);

    const openFilters = () => {
        router.push('/searchUrlDocumentsFilter');
    };

    const search = () => {
        fetchUrlDocuments();
    };
    console.log(urlDocuments);
    return (
        <BaseLayout withHeader>
            <View className="px-4">
                <Text className="text-center my-2 text-2xl font-bold">Search URL documents</Text>
                <View className="flex-row self-stretch items-center gap-x-3 w-full">
                    <Input 
                        placeholder='Search'
                        style={{ flex: 1 }}
                        value={searchQuery}
                        onChangeText={(value) => setSearchQuery(value)}
                        onSubmitEditing={search}
                    />
                    <Pressable onPress={openFilters} className="mt-0">
                        { isFiltersApplied && <View className="bg-red-700 w-3 h-3 rounded-full absolute right-0 z-10"></View> }
                        <Ionicons name="options-outline" size={33}/>
                    </Pressable>
                </View>
                <Text className="my-3">Found <Text className="font-bold">{totalDocuments}</Text> documents</Text>
                { isLoading ? (
                    <View className="h-[400px] flex-row flex-1 justify-center items-center">
                        <ActivityIndicator size="large" />
                    </View> 
                ) : (
                    <View>
                        <View> 
                            {urlDocuments?.map(item => (
                                <SearchUrlItem key={item.id} data={item} />
                            ))}
                        </View>
                        <View className="flex-row justify-center">
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                        </View>
                    </View>
                )}
            </View >
        </BaseLayout>
    );
}
