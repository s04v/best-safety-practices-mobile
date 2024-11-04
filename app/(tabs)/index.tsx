import { Image, StyleSheet, Platform, Text, View } from 'react-native';

import BaseLayout from '@/components/BaseLayout';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import Backend from '@/services/Backend';
import SearchNewsItem from '@/components/news/SearchNewsItem';

export default function HomeScreen() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    Backend.get('news/last')
      .then(data => {
        setNews(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <BaseLayout>
      <Image source={require("@/assets/images/HomeBanner.jpg")} className="w-[100%] object-contain h-[200px]" resizeMode='cover'/>
      <View className="px-4">
        <TextInput mode='outlined' placeholder='Search documents' className="mt-6 mb-7" left={<TextInput.Icon icon="magnify" />} onSubmitEditing={() => alert("Test")}  />
        <View className="space-y-5">
          {news?.map(item => <SearchNewsItem data={item} />)}
          
        </View>
      </View>
    </BaseLayout>
  );
}