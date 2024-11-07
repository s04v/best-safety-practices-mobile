import React, { useState, useCallback, useReducer } from 'react';
import { View } from 'react-native';
import { Button, Icon, IndexPath, Input, Layout, Select, SelectItem } from '@ui-kitten/components';
import ScreenLayout from '@/components/ScreenLayout';
import { useDocumentSearchStore } from '@/stores/useDocumentSearchStore';
import { useNavigation } from 'expo-router';
import BaseLayout from '@/components/BaseLayout';

const languages = ["English", "Dutch", "German", "Spanish", "French", "Chinese"];
const interests = ["Transport safety", "Industrial safety", "Chemical warehousing", "Tank storage"];

export default function SearchDocumentsFilterScreen() {
  const navigator = useNavigation();
  const store: any = useDocumentSearchStore();

  const [filters, setFilters] = useState({
    publisher: store.publisher,
    interest: store.interest,
    language: store.language,
  });

  const getInterestByIndex = (index: number): string => interests.at(index)!;
  const getLanguageByIndex = (index: number): string => languages.at(index)!;

  const applyFilters = () => {
    store.setState(filters);
    navigator.goBack();
  }

  const resetFilters = () => {
    setFilters({
      publisher: "",
      interest: "",
      language: "",
    })
    store.resetState();
  }

  return (
    <BaseLayout>
      <View className="px-5 flex-col flex-1">
        <View className="flex-col gap-y-4 flex-1">
          <Input 
            label='Publisher'
            placeholder='Publisher'
            value={filters.publisher}
            onChangeText={(value: string) =>  setFilters(prev => ({ ...prev, publisher: value }))}
            />
          <Select
            label="Interest"
            value={filters.interest}
            onSelect={(index: any) =>  setFilters(prev => ({ ...prev, interest: getInterestByIndex(index.row) }))}
            >
              { interests.map((item: string) => <SelectItem title={item} /> ) }
          </Select>
          <Select
            label="Language"
            value={filters.language}
            onSelect={(index: any) =>  setFilters(prev => ({ ...prev, language: getLanguageByIndex(index.row) }))}
          >
            { languages.map((item: string) => <SelectItem title={item} /> ) }
          </Select>
        </View>
        <View className="flex-row self-stretch gap-x-2 mt-4">
          <Button status='danger' style={{ flex: 1 }} onPress={resetFilters}>Reset</Button>
          <Button style={{ flex: 1 }} onPress={applyFilters}>Apply</Button>
        </View>
      </View>
    </BaseLayout>
  );
}

