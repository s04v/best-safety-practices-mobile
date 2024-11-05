import { Image, StyleSheet, Platform, Text, View } from 'react-native';

import BaseLayout from '@/components/BaseLayout';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import Backend from '@/services/Backend';
import SearchNewsItem from '@/components/news/SearchNewsItem';
import { Input } from '@ui-kitten/components';
import { useNewsStore } from '@/stores/useNewsStore';
import { router } from 'expo-router';

export default function HomeScreen() {
  const newsStore: any = useNewsStore();
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Backend.get('news/last')
      .then(data => {
        setNews(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const search = () => {
    router.navigate(`/searchNews?searchQuery=${searchQuery}`);
    setSearchQuery("");
  }

  return (
    <BaseLayout>
      <Image source={require("@/assets/images/HomeBanner.jpg")} className="w-[100%] object-contain h-[200px]" resizeMode='cover'/>
      <View className="px-4">
        <Input 
          placeholder='Search news'
          style={{ flex: 1, marginVertical: 20 }}
          textStyle={{ paddingLeft: 20}}
          value={searchQuery}
          onChangeText={(value) => setSearchQuery(value)}
          onSubmitEditing={search}
          accessoryLeft={() => <TextInput.Icon icon="magnify" className="pl-4 " />}
          />
        <View className="space-y-5">
          {news?.map(item => <SearchNewsItem data={item} />)}
          
        </View>
      </View>
    </BaseLayout>
  );
}