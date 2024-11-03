import { ReactNode } from "react"
import { Text, View } from "react-native"

type Props = {
    children: ReactNode | string,
}
export function Alert(props: Props) {
    return <View className="py-2 px-3 bg-red-100 rounded-sm  border border-red-300">
        <Text className="text-slate-600">{ props.children }</Text>
    </View>
}