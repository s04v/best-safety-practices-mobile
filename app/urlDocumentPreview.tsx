
import BaseLayout from '@/components/BaseLayout';
import BestPracticeReviewItem from '@/components/best-practice/BestPracticeReviewItem';
import NavigationButton from '@/components/NavigationButton';
import Pagination from '@/components/ui/Pagination';
import StarRating from '@/components/ui/StarRating';
import UrlReviewItem from '@/components/url/UrlReviewItem';
import Backend from '@/services/Backend';
import { useDocumentStore } from '@/stores/useDocumentStore';
import { useUrlDocumentStore } from '@/stores/useUrlDocumentStore';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@ui-kitten/components';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, SafeAreaView, StatusBar, Pressable, Platform, Text, ActivityIndicator } from 'react-native';
import { Icon, TouchableRipple } from 'react-native-paper';

function Field({ name, value }: any) {
  return (
  <View>
    <Text className="text-base font-semibold mt-5">{name}</Text>
    <Text>{value}</Text>
  </View>
)
}

export default function UrlDocumentPreviewScreen() {
  const urlStore: any = useUrlDocumentStore();
  const [url, setUrl] = useState<any>({});
  const [reviews, setReviews] = useState<any>([]);
  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const id = urlStore.selectedUrlDocument.id;

    Backend.get(`url/${id}/review`)
      .then((data) => {
        setReviews(data);
        setRating(data.reduce((partialSum: number, r: any) => partialSum + r.rating, 0) / data.length);
      })
      .catch(err => {
        console.error(err);
      });
    console.log(id);
    Backend.get(`url/${id}`)
      .then((data) => {
        setUrl(data);
      })
      .catch(err => {
        console.error(err);
      })
      .then(res => setIsLoading(false));
  }, []);

  return (
    <BaseLayout>
      <Pressable className="m-4" onPress={() => { navigation.goBack(); }}>
        <Ionicons name="arrow-back" size={28}  />
      </Pressable>

      { isLoading ? <View className="h-screen flex-row flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View> 
      : <View className="px-4">
          <Text className="my-1 text-3xl font-bold">{ url.title }</Text>
          <StarRating value={rating} size={26} readonly />
      
          <Field name="Interest" value={ url.interest } />
          <Field name="Language" value={ url.language } />
          <Field name="Url" value={ url.url } />
          <Field name="Upload by Company" value={ url.uploadByCompany ? "Yes" : "No" } />
          <Field name="Description" value={ url.description } />

          <View className="flex-row justify-between items-center mt-4">
            <Text className="text-3xl">Reviews</Text>
            <Pressable onPress={() => router.navigate("/createUrlDocumentReview")}>
              <Text className="text-base font-extrabold">Write review</Text>
            </Pressable>
          </View>
          {reviews.map((item: any) => <UrlReviewItem data={item} />)}
          {reviews.length === 0 && <Text className="text-center mt-3">Not found</Text>}
        </View>}
    </BaseLayout>
  );
}

