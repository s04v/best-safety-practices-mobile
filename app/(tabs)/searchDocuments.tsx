import BaseLayout from "@/components/BaseLayout";
import SearchBestPracticeItem from "@/components/best-practice/SearchBestPracticeItem";
import Pagination from "@/components/ui/Pagination";
import SearchUrlItem from "@/components/url/SearchUrlItem";
import { UserPermissions } from "@/constants/permisions";
import { DocumentPreviewItem, UrlDocument } from "@/contracts/entities";
import Backend, { userHasPermissions } from "@/services/Backend";
import { useDocumentSearchStore } from "@/stores/useDocumentSearchStore";
import { useDocumentStore } from "@/stores/useDocumentStore";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "@ui-kitten/components";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { Icon, Text, TextInput } from "react-native-paper";

const PAGE_SIZE = 10;

export default function SearchDocuments() {
    const params = useLocalSearchParams();
    const store: any = useDocumentSearchStore();
    const isFiltersApplied = store.publisher || store.interest || store.language || store.disciplinaryContext;

    const [isLoading, setIsLoading] = useState(true);
    const [documents, setDocuments] = useState<DocumentPreviewItem[]>([]);
    const [urls, setUrls] = useState<UrlDocument[]>([]);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [searchQuery, setSearchQuery] = useState(params.searchQuery as string || "");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [hasPermissionsToFilters, setHasPermissionsToFilters] = useState();

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }

    const fetchDocuments = () => {
        setIsLoading(true);

        const body = {
            interest: store.interest,
            language: store.language,
            publisher: store.publisher,
            disciplinaryContext: store.disciplinaryContext,
            page: currentPage - 1,
            title: searchQuery,
            sortBy: "rating_desc"
        };

        Backend.post('document/search/with-url', body)
            .then((data) => {
                console.log(data);
                const documents: DocumentPreviewItem[] = []; 
                const urls: UrlDocument[] = []; 

                data.data.forEach((item: any) => item.publisher ? documents.push(item) : urls.push(item));
                setDocuments(documents);
                setUrls(urls);

                setTotalDocuments(data.totalCount);
                setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE))
            })
            .catch(err => {
                console.log('ERROR');
                console.error(err);
            })
            .then(res => setIsLoading(false));
    }

    useEffect(() => {
        userHasPermissions(UserPermissions.SearchWithCriteria)
            .then((res: any) => {
                setHasPermissionsToFilters(res)
            });
    }, []);

    useEffect(() => {
        fetchDocuments();
    },[currentPage]);

    useEffect(() => {
        if (currentPage > 1) {
            setCurrentPage(1);
        } else {
            fetchDocuments();
        }
    },[isFiltersApplied]);


    useEffect(() => {
        if (params.searchQuery) {
            setSearchQuery(params.searchQuery as string);
            router.setParams({ searchQuery: "" });
            search();
        }
    }, []);

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
                    {hasPermissionsToFilters &&   <Pressable onPress={openFilters} className="mt-0">
                        { isFiltersApplied && <View className="bg-red-700 w-3 h-3 rounded-full absolute right-0 z-10"></View> }
                        <Ionicons name="options-outline" size={33}/>
                    </Pressable>}
                </View>
                <Text className="my-3">Found <Text className="font-bold">{totalDocuments}</Text> documents</Text>
                { isLoading ? <View className="h-[400px] flex-row flex-1 justify-center items-center">
                    <ActivityIndicator size="large" />
                </View> 
                : <View>
                    <View> 
                        {documents?.map(item => <SearchBestPracticeItem key={item.id} data={item} />)}
                        {urls?.map(item => <SearchUrlItem key={item.id} data={item} />)}
                    </View>
                    <View className="flex-row justify-center">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                    </View>
                </View> }
            </View >
        </BaseLayout>
    )
}