import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type PaginationProps = {
    currentPage: number; 
    totalPages: number;
    onPageChange: (page: number) => void;  
  };

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const onNextPage = () => {
        if(currentPage + 1 <= totalPages) {
            onPageChange(currentPage + 1);
        }
    }

    const onPrevPage = () => {
        if(currentPage - 1 >= 1) {
            onPageChange(currentPage - 1);
        }
    }
    
    return <View className="flex-row items-center gap-3 h-[55px]">
        <Pressable className="border border-gray-300 py-2 pr-[8px] pl-[6px] rounded-sm" onPress={onPrevPage}>
            <Ionicons name="chevron-back-outline" size={24}  />
        </Pressable>
        <Text className="">{currentPage} of {totalPages}</Text>
        <Pressable className="border border-gray-300 py-2 pl-[8px] pr-[6px] rounded-sm" onPress={onNextPage}>
            <Ionicons name="chevron-forward-outline" size={24}  />
        </Pressable>
    </View>
}