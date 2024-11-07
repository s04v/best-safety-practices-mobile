import React, { useState, useCallback, useReducer } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button, Icon, IndexPath, Input, Layout, Select, SelectItem } from '@ui-kitten/components';
import ScreenLayout from '@/components/ScreenLayout';
import { useDocumentSearchStore } from '@/stores/useDocumentSearchStore';
import { router, useNavigation } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import Backend from '@/services/Backend';
import { Alert } from '@/components/ui/Alert';
import * as Yup from 'yup';
import BaseLayout from '@/components/BaseLayout';
import { Ionicons } from '@expo/vector-icons';
import UploadedDocumentsScreen from './uploadedDocuments';

const languages = ["English", "Dutch", "German", "Spanish", "French", "Chinese"];
const interests = ["Transport safety", "Industrial safety", "Chemical warehousing", "Tank storage"];

const validationSchema = Yup.object({
  description: Yup.string()
    .trim()
    .required("Description is required"),
  url: Yup.string()
    .trim()
    .required("Url is required"),
  publicationYear: Yup.string()
    .trim()
    .matches(/^\d{4}$/, "Publication year must be a 4-digit number")
    .required("Publication year is required"),
  publicationMonth: Yup.string()
    .trim()
    .required("Publication month is required"),
  uploadByCompany: Yup.boolean()
    .required("Upload by company flag is required")
    .oneOf([true, false], "Upload by company must be true or false"),
  language: Yup.string()
    .trim()
    .required("Language is required"),
  interest: Yup.string()
    .trim()
    .required("Interest field is required"),
  title: Yup.string()
    .trim()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
});

export default function SubmitDocumentScreen() {
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [interest, setInterest] = useState("");
  const [language, setLanguage] = useState("");
  const [uploadByCompany, setUploadByCompany] = useState<any>(false);
  const [publicationYear, setPublicationYear] = useState("");
  const [publicationMonth, setPublicationMonth] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  
  const getInterestByIndex = (index: number): string => interests.at(index)!;
  const getLanguageByIndex = (index: number): string => languages.at(index)!;

  const sendForm = () => {
    const body = {
      title,
      interest,
      language,
      publicationYear,
      publicationMonth,
      uploadByCompany,
      url,
      description,
    };
    
    try {
      validationSchema.validateSync(body, { abortEarly: true });
    } catch (error: any) {
      setError(error?.errors?.length >= 1 && error?.errors.slice(-1));
      return;
    }

    Backend.post('url', body)
    .then(res => {
      router.navigate('/searchUrls');
    })
    .catch(err => console.error(err));
  }

  return (
    <BaseLayout>
      <View className="px-5 flex-col flex-1 mt-2">
        {error && <View className="mb-2"><Alert>{error}</Alert></View> }
        <View className="flex-col gap-y-4 flex-1 ">
          <Input 
            label='Title'
            placeholder='Title'
            value={title}
            onChangeText={(value: string) => setTitle(value)}
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
          <Select
            label="Uploaded by company"
            value={uploadByCompany  ? "Yes" : "No"}
            onSelect={(index: any) => setUploadByCompany(index.row === 0 ? true : false)}
          >
            <SelectItem title="Yes" />
            <SelectItem title="No" />
          </Select>
          <Input 
            label='Publication month'
            placeholder='Publication month'
            value={publicationMonth}
            onChangeText={(value: string) => setPublicationMonth(value)}
          />
          <Input 
            label='Publication year'
            placeholder='Publication year'
            value={publicationYear}
            onChangeText={(value: string) => setPublicationYear(value)}
          />
          <Input 
            label='Url'
            placeholder='Url'
            value={url}
            onChangeText={(value: string) => setUrl(value)}
            multiline={true}
          />
          <Input 
            label='Description'
            placeholder='Description'
            value={description}
            onChangeText={(value: string) => setDescription(value)}
            multiline={true}
          />
        </View>
        <View className="flex-row self-stretch gap-x-2 mt-2">
          <Button status="info" style={{ flex: 1 }} onPress={sendForm}>Submit</Button>
        </View>
      </View>
    </BaseLayout>
  );
}

