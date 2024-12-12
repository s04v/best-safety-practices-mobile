import BaseLayout from "@/components/BaseLayout";
import MessageItem from "@/components/messages/MessageItem";
import Pagination from "@/components/ui/Pagination";
import Backend from "@/services/Backend";
import { Button } from "@ui-kitten/components";
import { router, useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";


const PAGE_SIZE = 10;

export default function AdminMessagesList() {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const fetchMessages = () => {
    Backend.get('message')
    .then((res: any) => {
      setMessages(res.data);
      setTotalPages(Math.ceil(res.totalCount / PAGE_SIZE));
    });
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  useFocusEffect(() => {
    fetchMessages();
  });
  
  const onDelete = (id: string) => {
    Backend.delete(`message/${id}`)
    .then(() => {
      Alert.alert("Success", "Message deleted successfully");
      fetchMessages();
    });
  }

  return (
    <BaseLayout>
      <View className="px-4 flex-col flex-1 gap-y-2">
        <Button onPress={() => router.navigate('/addMessage')}>Add Message</Button>
        {messages.map((message: any) => (
          <MessageItem key={message.id} date={message.date} message={message.text} onDelete={() => onDelete(message.id)} />
        ))}
      </View>

      <View className="px-4 mt-2">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page: number) => setCurrentPage(page)} />
      </View>
    </BaseLayout>
  );
}