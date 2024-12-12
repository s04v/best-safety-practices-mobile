import React, { useState, useCallback, useReducer } from 'react';
import { Alert, Linking, Pressable, Text, View } from 'react-native';
import { Button, CheckBox, Icon, IndexPath, Input, Layout, Select, SelectItem } from '@ui-kitten/components';
import ScreenLayout from '@/components/ScreenLayout';
import { useDocumentSearchStore } from '@/stores/useDocumentSearchStore';
import { router, useNavigation } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import Backend from '@/services/Backend';
import { Alert as ErrorAlert } from '@/components/ui/Alert';
import * as Yup from 'yup';
import BaseLayout from '@/components/BaseLayout';
import { Ionicons } from '@expo/vector-icons';
import UploadedDocumentsScreen from './uploadedDocuments';
import { Link } from '@react-navigation/native';

const languages = ["English", "Dutch", "German", "Spanish", "French", "Chinese"];
const interests = ["Transport safety", "Industrial safety", "Chemical warehousing", "Tank storage"];
const disciplinaryContexts = ["Normative","Scientific", "Research", "Legislative"];

const validationSchema = Yup.object({
  file: Yup.mixed()
    .required("File is required"),
  pages: Yup.number()
    .required("Pages field is required")
    .positive("Pages must be a positive number")
    .integer("Pages must be an integer"),
  uploadByCompany: Yup.boolean()
    .required("Upload by company flag is required")
    .oneOf([true, false], "Upload by company must be true or false"),
  publisher: Yup.string()
    .trim()
    .required("Publisher is required")
    .min(3, "Publisher name must be at least 3 characters long"),
  publicationYear: Yup.string()
    .trim()
    .matches(/^\d{4}$/, "Publication year must be a 4-digit number")
    .required("Publication year is required"),
  country: Yup.string()
    .trim()
    .required("Country is required"),
  disciplinaryContext: Yup.string()
    .trim()
    .required("Disciplinary context is required"),
  language: Yup.string()
    .trim()
    .required("Language is required"),
  interest: Yup.string()
    .trim()
    .required("Interest field is required"),
  shortDescription: Yup.string()
    .trim()
    .required("Short description is required")
    .max(500, "Description cannot exceed 500 characters"),
  title: Yup.string()
    .trim()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
});

export default function SubmitDocumentScreen() {
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [interest, setInterest] = useState("");
  const [language, setLanguage] = useState("");
  const [disciplinaryContext, setDisciplinaryContext] = useState("");
  const [country, setCountry] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [uploadByCompany, setUploadByCompany] = useState<any>(false);
  const [pages, setPages] = useState("");
  const [file, setFile] = useState<any>({});
  const [agree, setAgree] = useState(false);
  const getInterestByIndex = (index: number): string => interests.at(index)!;
  const getLanguageByIndex = (index: number): string => languages.at(index)!;
  const getDisciplinaryContextByIndex = (index: number): string => disciplinaryContexts.at(index)!;

  const uploadFile = async () => {
    const result: any = await DocumentPicker.getDocumentAsync();
    setFile(result.assets[0]);
  }

  const sendForm = () => {
    const jsonBody = {
      title,
      shortDescription,
      interest,
      language,
      disciplinaryContext,
      country,
      publicationYear,
      publisher,
      uploadByCompany,
      pages,
      file,
    };
    
    try {
      validationSchema.validateSync(jsonBody, { abortEarly: true });
    } catch (error: any) {
      setError(error?.errors?.length >= 1 && error?.errors.slice(-1));
      return;
    }

    const body = new FormData();

    body.append("title", title);
    body.append("shortDescription", shortDescription);
    body.append("interest", interest);
    body.append("language", language);
    body.append("disciplinaryContext", disciplinaryContext);
    body.append("country", country);
    body.append("uploadByCompany", uploadByCompany);
    body.append("publicationYear", publicationYear);
    body.append("publisher", publisher);
    body.append("pages", pages);

    const f: any = {
      uri: file.uri,
      name: file.name,
      type: file.mimeType
    };

    body.append("file", f);

    Backend.postFormData('document', body)
    .then(res => {
      router.navigate('/menu');
      Alert.alert("Success", "Document submitted successfully", [
        {
          text: "Ok",
        }
      ]);
    })
    .catch(err => console.error(err));
  }

  return (
    <BaseLayout>
      <View className="px-5 flex-col flex-1 mt-2">
        {error && <View className="mb-2"><ErrorAlert>{error}</ErrorAlert></View> }
        <View className="flex-col gap-y-4 flex-1 ">
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
          <Select
            label="Disciplinary context"
            value={disciplinaryContext}
            onSelect={(index: any) => setDisciplinaryContext(getDisciplinaryContextByIndex(index.row))}
          >
            { disciplinaryContexts.map((item: string) => <SelectItem title={item} /> ) }
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
            {file.name && <Text>{file.name}</Text>}
          <Button status="info" style={{ flex: 1 }} onPress={uploadFile}>Upload file</Button>
        </View>
        <View style={{ marginTop: 20, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox 
            checked={agree} 
            onChange={() => setAgree(!agree)}
          />
          <Text style={{ marginLeft: 8 }}>
            I agree with the{' '}
            <Text className="text-blue-500" onPress={() => Linking.openURL('https://bestsafetypractices.org/conditions')}>
              terms and conditions
            </Text>
          </Text>
        </View>
        <View className="flex-row self-stretch gap-x-2 mt-2">
          <Button status="info" style={{ flex: 1 }} onPress={sendForm} disabled={!agree}>Submit</Button>
        </View>
      </View>
    </BaseLayout>
  );
}

