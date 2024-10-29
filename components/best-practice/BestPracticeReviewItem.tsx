import { Text, View } from "react-native";
import StarRating from "../ui/StarRating";
import moment from "moment";


export default function BestPracticeReviewItem({ data }: any) {
    return (
        <View className="mt-3">
            <View className="flex-row justify-between mb-2">
                <StarRating value={data.rating} size={24} readonly />
                <Text>{moment(data.createdDate).local().format("YYYY-MM-DD")}</Text>
            </View>
            <Text>{data.text}</Text>
        </View>
    )
}