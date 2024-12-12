
import BaseLayout from '@/components/BaseLayout';
import BestPracticeReviewItem from '@/components/best-practice/BestPracticeReviewItem';
import NavigationButton from '@/components/NavigationButton';
import Pagination from '@/components/ui/Pagination';
import StarRating from '@/components/ui/StarRating';
import Backend, { userHasPermissions } from '@/services/Backend';
import { useDocumentStore } from '@/stores/useDocumentStore';
import { isUserLoggedIn } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@ui-kitten/components';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, SafeAreaView, StatusBar, Pressable, Platform, Text, ActivityIndicator, Alert } from 'react-native';
import { Icon, TouchableRipple } from 'react-native-paper';

import * as FileSystem from 'expo-file-system';
import { UserPermissions } from '@/constants/permisions';

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
  const [hasPermissionToDownload, setPermissionToDownload] = useState(false);

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

      userHasPermissions(UserPermissions.DownloadDocument)
      .then((res: any) => {
        setPermissionToDownload(res);
      })
  }, []);

  const downloadFile = async (fileUuid: string, fileName: string, fileType: string) => {
    console.log('Attempting to Download file: ', fileUuid);
    Backend.download(`attachment/${fileUuid}`).then(async(res)=>{
      const reader = new FileReader();
      const pdfData = await new Promise((resolve) => {
        reader.onloadend = () => {
          const base64data = reader.result?.toString().split(',')[1];
          resolve(base64data);
        };
        reader.readAsDataURL(res);
      });
      
      const hasPermissions = await requestFileWritePermission();
      if (hasPermissions.access) {
        saveReportFile(pdfData, hasPermissions.directoryUri, fileName, fileType);
      }
    })
    .catch((err)=>{
      console.log(err);
      Alert.alert('Error','Error Downloading File!!');
    });
  }

  const requestFileWritePermission = async () => {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    console.log(permissions.granted);
    if (!permissions.granted) {
      console.log('File write Permissions Denied!!');
      return {
        access: false,
        directoryUri: null
      };
    }
    return {
      access: true,
      directoryUri: permissions.directoryUri
    };
  }

  const saveReportFile = async (pdfData: any, directoryUri: string | null, fileName: string, fileType: string) => {
    try {
      await FileSystem.StorageAccessFramework.createFileAsync(directoryUri!, fileName, fileType)
        .then(async(uri) => {
          await FileSystem.writeAsStringAsync(uri, pdfData, { encoding: FileSystem.EncodingType.Base64 }); // Removed JSON.stringify since we want raw file data
        })
        .then(res => {
          console.log(res);
          Alert.alert('Success', 'File downloaded successfully');
        })
        .catch((e) => {
          console.log(e);
          Alert.alert('Error', 'Failed to save file');
        });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to save file');
    }
  }


  return (
    <BaseLayout>
      { isLoading ? <View className="h-screen flex-row flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View> 
      : <View className="px-4">
          <Text className="my-1 text-3xl font-bold">{ document.title }</Text>
          <Text className="text-gray-500 mb-2">by { document.publisher }</Text>
          <StarRating value={rating} size={26} readonly />
      
          <Field name="Interest" value={ document.interest } />
          <Field name="Language" value={ document.language } />
          <Field name="Disciplinary context" value={ document.disciplinaryContext } />
          <Field name="Publication Year" value={ document.publicationYear } />
          <Field name="Upload by Company" value={ document.uploadByCompany ? "Yes" : "No" } />
          <Field name="Format" value={ document.format }/>
          <Field name="Short description" value={ document.shortDescription } />
          {  hasPermissionToDownload && <>
            <View className="my-4">
              <Button onPress={() => downloadFile(document.attachment.guid, document.attachment.fileName, document.attachment.contentType)} appearance='outline' >
                Download file
              </Button>
            </View>
          </> }
          <View className="flex-row justify-between items-center mt-4">
            <Text className="text-3xl">Reviews</Text>
            { isUserLoggedIn() &&   <Pressable onPress={() => router.navigate("/createDocumentReview")}>
              <Text className="text-base font-extrabold">Write review</Text>
            </Pressable>}
          </View>
          {reviews.map((item: any) => <BestPracticeReviewItem data={item} />)}
          {reviews.length === 0 && <Text className="text-center mt-3">Not found</Text>}
        </View>}
    </BaseLayout>
  );
} 