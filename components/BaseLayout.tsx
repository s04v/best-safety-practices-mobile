import { PropsWithChildren, ReactElement } from "react";
import { StatusBar, View } from "react-native";
import Animated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";

type Props = PropsWithChildren;

export default function BaseLayout({ children } : Props) {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();

    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff');
    return (
        <Animated.ScrollView className={`mt-[35px]`} ref={scrollRef} scrollEventThrottle={16}>
            <Animated.View>
                { children }
            </Animated.View>
        </Animated.ScrollView>
    )
}