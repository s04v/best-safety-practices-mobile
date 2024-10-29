import React, { useState, useCallback, useReducer } from 'react';
import { View } from 'react-native';
import { Button, Icon, IndexPath, Input, Layout, Select, SelectItem } from '@ui-kitten/components';
import ScreenLayout from '@/components/ScreenLayout';
import { useDocumentSearchStore } from '@/stores/useDocumentSearchStore';
import { useNavigation } from 'expo-router';

const languages = ["English", "Dutch", "German", "Spanish", "French", "Chinese"];
const interests = ["Transport safety", "Industrial safety", "Chemical warehousing", "Tank storage"];

export default function SubmitDocumentScreen() {
  const navigator = useNavigation();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [interest, setInterest] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [uploadByCompany, setUploadByCompany] = useState(false);
  const [pages, setPages] = useState("");
  const [file, setFile] = useState(null);
  
  const getInterestByIndex = (index: number): string => interests.at(index)!;
  const getLanguageByIndex = (index: number): string => languages.at(index)!;

  return (
    <ScreenLayout>
      <View className="px-5 flex-col flex-1">
        <View className="flex-col gap-y-4 flex-1">
          <Input 
            label='Title'
            placeholder='Title'
            value={title}
            onChangeText={(value: string) => setTitle(value)}
            />
          <Input 
            label='Short description'
            placeholder='Short description'
            value={shortDescription}
            onChangeText={(value: string) => setShortDescription(value)}
            />
          <Select
            label="Interest"
            value={interest}
            onSelect={(index: any) =>  setInterest(getInterestByIndex(index.row))}
            >
              { interests.map((item: string) => <SelectItem title={item} /> ) }
          </Select>
          <Select
            label="Language"
            value={language}
            onSelect={(index: any) => setLanguage(getLanguageByIndex(index.row))}
          >
            { languages.map((item: string) => <SelectItem title={item} /> ) }
          </Select>
          <Input 
            label='Country'
            placeholder='Country'
            value={country}
            onChangeText={(value: string) => setCountry(value)}
          />
          <Input 
            label='Publication year'
            placeholder='Publication year'
            value={publicationYear}
            onChangeText={(value: string) => setPublicationYear(value)}
          />
          <Input 
            label='Publisher'
            placeholder='Publisher'
            value={publisher}
            onChangeText={(value: string) => setPublisher(value)}
            />
          <Input 
            label='Pages'
            placeholder='Pages'
            value={pages}
            onChangeText={(value: string) => setPages(value)}
            />
          {/* <Input 
            label='Pages'
            placeholder='Pages'
            value={pages}
            onChangeText={(value: string) => setPages(value)}
            /> */}
        </View>
        <View className="flex-row self-stretch gap-x-2">
          <Button status="basic" style={{ flex: 1 }} onPress={() => {}}>Submit</Button>
        </View>
      </View>
    </ScreenLayout>
  );
}

