import BaseLayout from "@/components/BaseLayout";
import SearchBestPracticeItem from "@/components/best-practice/SearchBestPracticeItem";
import Pagination from "@/components/ui/Pagination";
import { DocumentPreviewItem } from "@/contracts/entities";
import Backend from "@/services/Backend";
import { useDocumentSearchStore } from "@/stores/useDocumentSearchStore";
import { useDocumentStore } from "@/stores/useDocumentStore";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "@ui-kitten/components";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { Icon, Text, TextInput } from "react-native-paper";

const PAGE_SIZE = 10;

export default function SearchDocuments() {
    const store: any = useDocumentSearchStore();
    const isFiltersApplied = store.publisher || store.interest || store.language;

    const [isLoading, setIsLoading] = useState(true);
    const [documents, setDocuments] = useState<DocumentPreviewItem[]>([]);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }

    const fetchDocuments = () => {
        setIsLoading(true);

        const body = {
            interest: store.interest,
            language: store.language,
            publisher: store.publisher,
            page: currentPage - 1,
            title: searchQuery,
            sortBy: "rating_desc"
        };

        Backend.post('document/search', body)
            .then((data) => {
                setDocuments(data.data as DocumentPreviewItem[]);
                setTotalDocuments(data.totalCount);
                setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE))
            })
            .catch(err => {
                console.error(err);
            })
            .then(res => setIsLoading(false));
    }

    useEffect(() => {
        setCurrentPage(1);
    },[store]);

    useEffect(() => {
        fetchDocuments();
    },[currentPage]);

    const openFilters = () => {
        router.push('/searchDocumentsFilter');
    }

    const search = () => {
        fetchDocuments();
    }

    return (
        <BaseLayout withHeader>
            <View className="px-4">
                <Text className="text-center my-2 text-2xl font-bold">Search best practices</Text>
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
                { isLoading ? <View className="h-[400px] flex-row flex-1 justify-center items-center">
                    <ActivityIndicator size="large" />
                </View> 
                : <View>
                    <View> 
                        {documents?.map(item => <SearchBestPracticeItem data={item} />)}
                    </View>
                    <View className="flex-row justify-center">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                    </View>
                </View> }
            </View >
        </BaseLayout>
    )
}