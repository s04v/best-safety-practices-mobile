import BaseLayout from "@/components/BaseLayout";
import SearchBestPracticeItem from "@/components/best-practice/SearchBestPracticeItem";
import SearchNewsItem from "@/components/news/SearchNewsItem";
import Pagination from "@/components/ui/Pagination";
import { DocumentPreviewItem, News } from "@/contracts/entities";
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

export default function SearchNews() {
    const store: any = useDocumentSearchStore();

    const [isLoading, setIsLoading] = useState(true);
    const [news, setNews] = useState<News[]>([]);
    const [totalDocuments, setTotalDocuments] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }

    const fetchNews = () => {
        setIsLoading(true);

        Backend.get(`news?page=${currentPage - 1}&search=${searchQuery}`)
            .then((data) => {
                setNews(data.data as News[]);
                setTotalDocuments(data.totalCount);
                setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE));
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
        fetchNews();
    },[currentPage]);

    const search = () => {
        fetchNews();
    }

    return (
        <BaseLayout>
            <View className="px-4">
                <Text className="text-center my-2 text-2xl font-bold">Search news</Text>
                <View className="flex-row self-stretch items-center gap-x-3 w-full">
                <Input 
                    placeholder='Search'
                    style={{ flex: 1 }}
                    value={searchQuery}
                    onChangeText={(value) => setSearchQuery(value)}
                    onSubmitEditing={search}
                    />
                </View>
                <Text className="my-3">Found <Text className="font-bold">{totalDocuments}</Text> news</Text>
                { isLoading ? <View className="h-[400px] flex-row flex-1 justify-center items-center">
                    <ActivityIndicator size="large" />
                </View> 
                : <View>
                    <View className="flex-col gap-4"> 
                        {news?.map(item => <SearchNewsItem data={item} />)}
                    </View>
                    <View className="flex-row justify-center mt-3">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                    </View>
                </View> }
            </View >
        </BaseLayout>
    )
}