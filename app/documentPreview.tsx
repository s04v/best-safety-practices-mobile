
import BaseLayout from '@/components/BaseLayout';
import BestPracticeReviewItem from '@/components/best-practice/BestPracticeReviewItem';
import NavigationButton from '@/components/NavigationButton';
import Pagination from '@/components/ui/Pagination';
import StarRating from '@/components/ui/StarRating';
import Backend from '@/services/Backend';
import { useDocumentStore } from '@/stores/useDocumentStore';
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

export default function DocumentPreviewScreen() {
  const documentStore: any = useDocumentStore();
  const [document, setDocument] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const id = documentStore.selectedDocument.id;

    Backend.get(`document/${id}/review`)
      .then((data) => {
        setReviews(data);
        setRating(data.reduce((partialSum: number, r: any) => partialSum + r.rating, 0) / data.length);
        console.log(data.reduce((partialSum: number, r: any) => partialSum + r.rating, 0) / data.length)

      })
      .catch(err => {
        console.error(err);
      });

    Backend.get(`document/${id}`)
      .then((data) => {
        setDocument(data);
       
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
          <Text className="my-1 text-3xl font-bold">{ document.title }</Text>
          <Text className="text-gray-500 mb-2">by { document.publisher }</Text>
          <StarRating value={rating} size={26} readonly />
      
          <Field name="Interest" value={ document.interest } />
          <Field name="Language" value={ document.language } />
          <Field name="Publication Year" value={ document.publicationYear } />
          <Field name="Upload by Company" value={ document.uploadByCompany ? "Yes" : "No" } />
          <Field name="Format" value={ document.format }/>
          <Field name="Short description" value={ document.shortDescription } />

          <View className="flex-row justify-between items-center mt-4">
            <Text className="text-3xl">Reviews</Text>
            <Pressable onPress={() => router.navigate("/createDocumentReview")}>
              <Text className="text-base font-extrabold">Write review</Text>
            </Pressable>
          </View>
          {reviews.map((item: any) => <BestPracticeReviewItem data={item} />)}
          {reviews.length === 0 && <Text className="text-center mt-3">Not found</Text>}
        </View>}
    </BaseLayout>
  );
}

