import { PropsWithChildren, ReactElement } from "react";
import { StatusBar, View } from "react-native";
import Animated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";

type Props = PropsWithChildren;

export default function BaseLayout({ children } : Props) {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();

    StatusBar.setBarStyle('dark-content');
    //StatusBar.setBackgroundColor('#fff');
    return (
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} style={{ marginTop: StatusBar.currentHeight}}>
            <Animated.View className="pb-3">
                { children }
            </Animated.View>
        </Animated.ScrollView>
    )
}