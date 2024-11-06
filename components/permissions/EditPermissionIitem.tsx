import Backend from "@/services/Backend";
import { Select, SelectItem } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { View } from "react-native";

const plans = ["Free", "Basic", "Premium"];

export function EditPermissionItem(props: any) {
  const [permission, setPermission] = useState<any>({});

  useEffect(() => {
    setPermission(props.permission);
  },[]);

  const onSubscriptionChange = (newSubcription: string) => {
    Backend.post(`subscription/${newSubcription}/permission/${permission.id}`, {});
    setPermission({...props.permission, subscriptionId: newSubcription});
    console.log('done');
  }

  const getPlanByIndex = (index: number): string => plans.at(index)!;

  if(permission === null)
    return;

  return <View>
    <Select
      label={permission.description}
      value={getPlanByIndex(permission.subscriptionId - 1)}
      onSelect={(index: any) =>  onSubscriptionChange(index.row + 1)}
      >
        { plans.map((item: string) => <SelectItem title={item} /> ) }
    </Select>
  </View>
}