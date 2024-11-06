import BaseLayout from "@/components/BaseLayout";
import Pagination from "@/components/ui/Pagination";
import UserListItem from "@/components/user/userListItem";
import Backend from "@/services/Backend";
import { useDocumentSearchStore } from "@/stores/useDocumentSearchStore";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { Icon, Text, TextInput } from "react-native-paper";

const PAGE_SIZE = 10;

export default function UsersListScreen() {
const isFocused = useIsFocused();
  const store: any = useDocumentSearchStore();
  
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  const fetchUsers = () => {
    setIsLoading(true);

    Backend.get('user')
      .then((data) => {
        setUsers(data.data);
        setTotalUsers(data.totalCount);
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
    fetchUsers();
  },[currentPage]);

  return (
    <BaseLayout>
      <Pressable className="m-4 mb-0"  onPress={() => { navigation.goBack(); }}>
        <Ionicons name="arrow-back" size={28}  />
      </Pressable>
      <View className="px-4">
        <Text className="text-center mb-2 text-2xl font-bold">Users</Text>
        <Text className="my-3">Found <Text className="font-bold">{totalUsers}</Text> users</Text>
        { isLoading ? <View className="h-[400px] flex-row flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View> 
        : <View>
          <View> 
            {users?.map((item: any) => <UserListItem data={item} />)}
          </View>
          <View className="flex-row justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </View>
        </View> }
      </View >
    </BaseLayout>
    )
}
