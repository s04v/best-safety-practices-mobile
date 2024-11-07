
import BaseLayout from '@/components/BaseLayout';
import ScreenLayout from '@/components/ScreenLayout';
import { Alert } from '@/components/ui/Alert';
import StarRating from '@/components/ui/StarRating';
import Backend from '@/services/Backend';
import { useUrlDocumentStore } from '@/stores/useUrlDocumentStore';
import { Button, Input } from '@ui-kitten/components';
import { router, useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, SafeAreaView, StatusBar, Pressable, Platform, Text } from 'react-native';

export default function CreateUrlDocumentReviewScreen() {
  const navigation = useNavigation();

  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState<string>();
  const [error, setError] = useState<string>();
 
  const urlStore: any = useUrlDocumentStore();
  const urlId = urlStore.selectedUrlDocument.id;

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

    Backend.post(`url/${urlId}/review`, { text, rating })
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
        { error && <Alert>{error}</Alert> }
        <StarRating value={rating} size={44} onChange={(value) => setRating(value)} />
        <View className="my-1 flex-col flex-1">
        <Input
          multiline={true}
          placeholder="Review"
          label={"Review"}
          value={text}
          onChangeText={(value) => setText(value)}
          />
        </View>
        <Button status="info" style={{ marginTop: 8 }} onPress={sendReview}>Send</Button>
      </View>
    </BaseLayout>
  );
}

