import BaseLayout from '@/components/BaseLayout';
import ScreenLayout from '@/components/ScreenLayout';
import { Alert } from '@/components/ui/Alert';
import { SuccessAlert } from '@/components/ui/SuccessAlert';
import { UserPermissions } from '@/constants/permisions';
import Backend, { userHasPermissions } from '@/services/Backend';
import { Ionicons } from '@expo/vector-icons';
import { Button, Datepicker, Input, Select, SelectItem } from '@ui-kitten/components';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Pressable, Platform } from 'react-native';
import { Icon } from 'react-native-paper';
import * as Yup from 'yup';

const languages = ["English", "Dutch", "German", "Spanish", "French", "Chinese"];
const interests = ["Transport safety", "Industrial safety", "Chemical warehousing", "Tank storage"];

const validationSchema = Yup.object().shape({
  zipcode: Yup.string()
    .matches(/^[0-9]{5}$/, 'Enter a valid 5-digit zip code'),
  country: Yup.string(),
  state: Yup.string(),
  address: Yup.string(),
  function: Yup.string(),
  dateOfBirth: Yup.date().max(new Date(), 'Date of birth cannot be in the future'),
  companyName: Yup.string(),
  language: Yup.string(),
  interest: Yup.string(),
  password: Yup.string().min(8, 'Password must be at least 8 characters'),
  email: Yup.string().email('Enter a valid email'),
  lastName: Yup.string().min(2, 'Last name must be at least 2 characters'),
  firstName: Yup.string().min(2, 'First name must be at least 2 characters'),
});

export default function UpdatePersonalInfoScreen() {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [originData, setOriginData] = useState<any>({});
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
  const [userCanChangeMailFrequency, setUserCanChangeMailFrequency] = useState("");
  const [mailingFrequency, setMailingFrequency] = useState("");
  
  const getInterestByIndex = (index: number): string => interests.at(index)!;
  const getLanguageByIndex = (index: number): string => languages.at(index)!;

  // const sendForm = async () => {
  //   setError("");
  //   // Structure the form data into a body object
  //   const body = {
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //     interest,
  //     language,
  //     companyName,
  //     dateOfBirth,
  //     function: functionTitle,
  //     address,
  //     state,
  //     zipcode,
  //     country,
  //   };

  //   try {
  //     validationSchema.validateSync(body, { abortEarly: true });
  //   } catch (error: any) {
  //     console.error("Error registering user:", JSON.stringify(error, null, 2));
  //     setError(error?.errors?.length >= 1 && error?.errors.slice(-1));
  //     return;
  //   }

  //   Backend.post("auth/register", body)
  //     .then(res => router.navigate("/login"))
  //     .catch(err => setError(err.length >= 1 && err[0]));
  // };

  const onSave = () => {
    setError("");
    const body = prepareBody();
    Backend.put("user/me", body)
      .then(res => { 
        setTimeout(() => setSuccess(""), 3000);
        setSuccess("Data updated!")
      });
}

const prepareBody = () => {
    const body: any  = {};
    
    if (firstName !== originData.firstName) body.firstName = firstName;
    if (lastName !== originData.lastName) body.lastName = lastName;
    if (email !== originData.email) body.email = email;
    if (password !== "") body.password = password;
    if (interest !== originData.interest) body.interest = interest;
    if (language !== originData.language) body.language = language;
    if (companyName !== originData.companyName) body.companyName = companyName;
    if (dateOfBirth !== originData.dateOfBirth) body.dateOfBirth = dateOfBirth;
    if (functionTitle !== originData.function) body.function = functionTitle;
    if (address !== originData.address) body.address = address;
    if (state !== originData.state) body.state = state;
    if (country !== originData.country) body.country = country;
    if (zipcode !== originData.zipcode) body.zipcode = zipcode;
    if (userCanChangeMailFrequency && mailingFrequency !== originData.mailingFrequency) body.mailingFrequency = mailingFrequency;
    
    try {
      validationSchema.validateSync(body, { abortEarly: true });
    } catch (error: any) {
      console.error("Error registering user:", JSON.stringify(error, null, 2));
      setError(error?.errors?.length >= 1 && error?.errors.slice(-1));
      return;
    }

    return body;
}

  useEffect(() => {
    Backend.get("user/me")
      .then(res => {
        setFirstName(res.firstName);
        setLastName(res.lastName);
        setEmail(res.email);
        setPassword("");
        setInterest(res.interest);
        setLanguage(res.language);
        setCompanyName(res.companyName);
        setDateOfBirth(new Date(res.dateOfBirth));
        setFunctionTitle(res.function);
        setAddress(res.address);
        setState(res.state);
        setCountry(res.country);
        setZipcode(res.zipcode);
        setMailingFrequency(res.mailingFrequency);

        setOriginData(res);
      });

      userHasPermissions(UserPermissions.ChangeMailingFrequency)
        .then((res: any) => setUserCanChangeMailFrequency(res));
  }, []);
  
  return (
    <BaseLayout>
      <View className="px-5 flex-col flex-1">
        <View className="flex-col gap-y-4 flex-1">
          {error && <Alert>{error}</Alert> }
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
          {userCanChangeMailFrequency && (
            <Select
              label="Mailing frequency"
              value={interest}
              onSelect={(index: any) => setMailingFrequency(index.row === 0 ? "Weekly" : "Monthly")}
            >
              <SelectItem title="Weekly" />
              <SelectItem title="Monthly" />
            </Select>
          )}
        </View>
        <View className="mb-4"></View>
        {error && <Alert>{error}</Alert> }
        {success && <SuccessAlert>{success}</SuccessAlert>}
        <View className="flex-row self-stretch gap-x-2 mt-4">
          <Button style={{ flex: 1 }} onPress={onSave}>Save</Button>
        </View>
      </View>
    </BaseLayout>
  );
}
