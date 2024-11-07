import { PropsWithChildren, ReactElement } from "react";
import { StatusBar, View } from "react-native";
import Animated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";

export default function BaseLayout({ children, withHeader = false } : any) {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();

    StatusBar.setBarStyle('dark-content');
    //StatusBar.setBackgroundColor('#fff');
    return (
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} >
            <Animated.View className="pb-3" style={{ paddingTop: withHeader ? StatusBar.currentHeight : 10 }}>
                { children }
            </Animated.View>
        </Animated.ScrollView>
    )
}