
import BaseLayout from '@/components/BaseLayout';
import BestPracticeReviewItem from '@/components/best-practice/BestPracticeReviewItem';
import NavigationButton from '@/components/NavigationButton';
import Pagination from '@/components/ui/Pagination';
import StarRating from '@/components/ui/StarRating';
import Backend from '@/services/Backend';
import { useDocumentStore } from '@/stores/useDocumentStore';
import { useNewsStore } from '@/stores/useNewsStore';
import { htmlCss } from '@/utils/css';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@ui-kitten/components';
import { router, useNavigation } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { View, SafeAreaView, StatusBar, Pressable, Platform, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import { Icon, TouchableRipple } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
function Field({ name, value }: any) {
  return (
  <View>
    <Text className="text-base font-semibold mt-5">{name}</Text>
    <Text>{value}</Text>
  </View>
)
}

export default function NewsPreviewScreen() {
  const newsStore: any = useNewsStore();
  const [news, setNews] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const id = newsStore.selectedNews.id;

    Backend.get(`news/${id}`)
      .then((data) => {
        console.log(data);
        setNews(data);
      })
      .catch(err => {
        console.error(err);
      })
      .then(res => setIsLoading(false));
  }, []);


  const html = `
    ${news.description}
  `
  return (
    <BaseLayout>
      
      { isLoading ? <View className="h-screen flex-row flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View> 
      : <View className="px-4">
          <Text className="my-1 text-3xl font-bold">{ news.title }</Text>
          <Text className="text-sm text-gray-700 my-1">{ moment(news.uploadDate).local().format("YYYY-MM-DD")  }</Text>
          <RenderHtml 
            contentWidth={width}
            source={{html: html }} />
        </View>}
    </BaseLayout>
  );
}

