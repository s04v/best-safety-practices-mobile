import BaseLayout from "@/components/BaseLayout";
import SearchBestPracticeItem from "@/components/best-practice/SearchBestPracticeItem";
import ScreenLayout from "@/components/ScreenLayout";
import Pagination from "@/components/ui/Pagination";
import { DocumentPreviewItem } from "@/contracts/entities";
import Backend from "@/services/Backend";
import { useDocumentSearchStore } from "@/stores/useDocumentSearchStore";
import { useDocumentStore } from "@/stores/useDocumentStore";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "@ui-kitten/components";
import { router, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { Icon, Text, TextInput } from "react-native-paper";

const PAGE_SIZE = 10;

export default function UploadedDocumentsScreen() {
  const store: any = useDocumentSearchStore();
  
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<DocumentPreviewItem[]>([]);
  const [totalDocuments, setTotalDocuments] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  const fetchDocuments = () => {
    setIsLoading(true);

    Backend.get(`document?page=${currentPage - 1}&owner=true`)
      .then((data) => {
        console.log(data);
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

  console.log(documents)
  return (
    <BaseLayout >
      <View className="px-4">
        <Text className="mb-3">Found <Text className="font-bold">{totalDocuments}</Text> uploaded documents</Text>
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