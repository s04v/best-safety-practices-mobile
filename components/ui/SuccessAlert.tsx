import { ReactNode } from "react"
import { Text, View } from "react-native"

type Props = {
    children: ReactNode | string,
}
export function SuccessAlert(props: Props) {
    return <View className="py-2 px-3 bg-green-200 rounded-sm  border border-green-300">
        <Text className="text-slate-600">{ props.children }</Text>
    </View>
}