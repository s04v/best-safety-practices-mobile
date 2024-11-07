import { Ionicons } from "@expo/vector-icons";
import { Href, Link, router } from "expo-router";
import { Pressable, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

type Props = {
    iconName: React.ComponentProps<typeof Ionicons>["name"],
    text: string,
    href?: string,
    onClick?: () => void,
};

export default function NavigationButton({ iconName, text, href, onClick }: Props) {
    const onPress = () => {
        if (href) {
            router.push(href as Href);
        } else if (onClick) {
            onClick();
        }
    }

    return  (
    <Pressable>
        <TouchableRipple  
            className="py-4 px-4 border-b-1 border-b border-b-gray-300"
            onPress={onPress}
            rippleColor="rgba(0, 0, 0, .10)"
        >
            <View className="flex-row items-center gap-3 w-[100%]">
                <Ionicons name={iconName} size={24} />
                <Text className="text-xl mr-auto">{ text }</Text>
                <Ionicons name="chevron-forward" size={24} />
            </View>
        </TouchableRipple>
    </Pressable>
    );
}