import BaseLayout from "@/components/BaseLayout";
import MessageItem from "@/components/messages/MessageItem";
import { Alert as ErrorAlert } from "@/components/ui/Alert";
import Backend from "@/services/Backend";
import { Button, Input } from "@ui-kitten/components";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function AddMessage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const addMessage = () => {
    if (message === "") {
      setError("Message is required");
      return;
    }
    
    Backend.post('message', { text: message })
    .then(res => {
      Alert.alert("Success", "Message added successfully, close the window and you will be redirected to the messages list.", [
        {
          text: "Ok",
          onPress: () => router.navigate("/adminMessagesList")
        }
      ]);
    })
    .catch(e => {
      console.log(e.message);
      setError(e.message);
    });
  }

  return (
    <BaseLayout>
      <View className="px-4 flex-col flex-1 gap-y-2">
        {error && <View className="mb-2 mt-3"><ErrorAlert>{error}</ErrorAlert></View>}
        <Input 
          label='Message'
          placeholder='Message'
          value={message}
          onChangeText={(value: string) => setMessage(value)}
          multiline={true}
         />
        <Button onPress={addMessage}>Add Message</Button>
      </View>
    </BaseLayout>
  );
}