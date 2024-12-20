import BaseLayout from '@/components/BaseLayout';
import ScreenLayout from '@/components/ScreenLayout';
import { Alert as TextAlert } from '@/components/ui/Alert';
import Backend from '@/services/Backend';
import { Ionicons } from '@expo/vector-icons';
import { Button, CheckBox, Datepicker, Input, Select, SelectItem } from '@ui-kitten/components';
import { router, useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Pressable, Platform, Alert, Linking } from 'react-native';
import { Icon } from 'react-native-paper';
import * as Yup from 'yup';

const languages = ["English", "Dutch", "German", "Spanish", "French", "Chinese"];
const interests = ["Transport safety", "Industrial safety", "Chemical warehousing", "Tank storage"];


const validationSchema = Yup.object().shape({
  zipcode: Yup.string()
    .required('Zip code is required'),
  country: Yup.string()
    .required('Country is required'),
  state: Yup.string()
    .required('State is required'),
  address: Yup.string()
    .required('Address is required'),
  function: Yup.string()
    .required('Function is required'),
  dateOfBirth: Yup.date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future'),
  companyName: Yup.string()
    .required('Company name is required'),
  language: Yup.string()
    .required('Language is required'),
  interest: Yup.string()
    .required('Interest is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
});

export default function RegisterScreen() {
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interest, setInterest] = useState("");
  const [language, setLanguage] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [functionTitle, setFunctionTitle] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [agree, setAgree] = useState(false);
  const getInterestByIndex = (index: number): string => interests.at(index)!;
  const getLanguageByIndex = (index: number): string => languages.at(index)!;

  const sendForm = async () => {
    setError("");
    // Structure the form data into a body object
    const body = {
      firstName,
      lastName,
      email,
      password,
      interest,
      language,
      companyName,
      dateOfBirth,
      function: functionTitle,
      address,
      state,
      zipcode,
      country,
    };

    try {
      validationSchema.validateSync(body, { abortEarly: true });
    } catch (error: any) {
      console.error("Error registering user:", JSON.stringify(error, null, 2));
      setError(error?.errors?.length >= 1 && error?.errors.slice(-1));
      return;
    }

    Backend.post("auth/register", body)
      .then(res => {
        Alert.alert("Success", "You have been registered successfully, close the window and you will be redirected to the login page.", [
          {
            text: "Ok",
            onPress: () => router.navigate("/login")
          }
        ]);
      })
      .catch(err => setError(err.length >= 1 && err[0]));
  };

  return (
    <BaseLayout>
      <View className="px-5 flex-col flex-1">
        <View className="flex-col gap-y-4 flex-1">
          {error && <TextAlert>{error}</TextAlert> }
          <Input 
            label="First Name"
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={(value: string) => setFirstName(value)}
          />
          <Input 
            label="Last Name"
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={(value: string) => setLastName(value)}
          />
          <Input 
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={(value: string) => setEmail(value)}
          />
          <Input 
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={(value: string) => setPassword(value)}
          />
          <Select
            label="Interest"
            value={interest}
            onSelect={(index: any) => setInterest(getInterestByIndex(index.row))}
          >
            {interests.map((item: string) => <SelectItem key={item} title={item} />)}
          </Select>
          <Select
            label="Language"
            value={language}
            onSelect={(index: any) => setLanguage(getLanguageByIndex(index.row))}
          >
            {languages.map((item: string) => <SelectItem key={item} title={item} />)}
          </Select>
          <Input 
            label="Company Name"
            placeholder="Enter company name"
            value={companyName}
            onChangeText={(value: string) => setCompanyName(value)}
          />
          <Datepicker 
            min={new Date(1900, 0, 0)}
            label="Date of Birth"
            placeholder="Enter your date of birth"
            date={dateOfBirth}
            onSelect={(value: Date) => setDateOfBirth(value)}
          />
          <Input 
            label="Function"
            placeholder="Enter your function"
            value={functionTitle}
            onChangeText={(value: string) => setFunctionTitle(value)}
          />
          <Input 
            label="Address"
            placeholder="Enter your address"
            value={address}
            onChangeText={(value: string) => setAddress(value)}
          />
          <Input 
            label="State"
            placeholder="Enter your state"
            value={state}
            onChangeText={(value: string) => setState(value)}
          />
          <Input 
            label="Country"
            placeholder="Enter your country"
            value={country}
            onChangeText={(value: string) => setCountry(value)}
          />
          <Input 
            label="Zip Code"
            placeholder="Enter your zip code"
            keyboardType="numeric"
            value={zipcode}
            onChangeText={(value: string) => setZipcode(value)}
          />
        </View>
        <View className="mb-4"></View>
        {error && <TextAlert>{error}</TextAlert> }

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
        <View className="flex-row self-stretch gap-x-2 mt-4">
          <Button style={{ flex: 1 }} onPress={sendForm} disabled={!agree}>Register</Button>
        </View>
      </View>
    </BaseLayout>
  );
}
