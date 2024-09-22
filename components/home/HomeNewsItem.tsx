import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import Moment from 'moment';

function getTextFromFirstTag(htmlString: string) {
    const match = htmlString.match(/<[^>]+>([^<]*)<\/[^>]+>/);
    
    return match ? match[1] : null;
}
  
export default function HomeNewsItem(props: any) {
    return (
        <View {...props}>
            {/* require("@/assets/images/HomeBanner.jpg") */}
            <Image src={`https://bsp-backend-xqdx.onrender.com/api/attachment/${props.data?.photo}`} className="w-[100%] object-contain h-[200px] rounded-md" resizeMode='cover'/>
            <Text className="text-2xl font-bold">{ props.data?.title }</Text>
            <Text className="text-sm text-gray-700 my-1">{ Moment(props.data?.uploadDate).local().format("YYYY-MM-DD")  }</Text>
            <Text className="text-sm">{ getTextFromFirstTag(props?.data?.description)?.split('. ')[0] }.</Text>
        </View>
    )
}