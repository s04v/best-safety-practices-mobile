
import BaseLayout from '@/components/BaseLayout';
import ScreenLayout from '@/components/ScreenLayout';
import StarRating from '@/components/ui/StarRating';
import Backend from '@/services/Backend';
import { useDocumentStore } from '@/stores/useDocumentStore';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input } from '@ui-kitten/components';
import { router, useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, SafeAreaView, StatusBar, Pressable, Platform, Text } from 'react-native';
import { Icon, TouchableRipple } from 'react-native-paper';

export default function CreateDocumentReviewScreen() {
  const navigation = useNavigation();

  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState<string>();
  const [error, setError] = useState<string>();
 
  const documentStore: any = useDocumentStore();
  const documentId = documentStore.selectedDocument.id;

  const sendReview = () => {
    setError("");
     
    if (rating === 0) {
        setError("Rating is required");
        return;
    } 

    if (text === "") {
        setError("Review is required");
        return;
    }

    console.log(text, documentId);

    Backend.post(`document/${documentId}/review`, { text, rating })
      .then(res => {
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
}

  return (
    <BaseLayout>
      <View className="px-4 flex-col flex-1">
        {error && <Text>{error}</Text> }
        <StarRating value={rating} size={44} onChange={(value) => setRating(value)} />
        <View className="my-2 flex-col flex-1">
        <Input
          multiline={true}
          placeholder="Review"
          label={"Review"}
          value={text}
          onChangeText={(value) => setText(value)}
          />
        </View>
        <Button status="info" className="" onPress={sendReview}>Send</Button>
      </View>
    </BaseLayout>
  );
}

