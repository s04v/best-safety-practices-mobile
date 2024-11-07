import ScreenLayout from '@/components/ScreenLayout';
import { Alert } from '@/components/ui/Alert';
import Backend from '@/services/Backend';
import { Button, Input } from '@ui-kitten/components';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';
import * as SecureStore from 'expo-secure-store';
import BaseLayout from '@/components/BaseLayout';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email'),
  password: Yup.string()
    .required('Password is required')
});

export default function LoginScreen() {
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendForm = async () => {
    setError("");
    const body = { email, password };

    try {
      validationSchema.validateSync(body, { abortEarly: true });
    } catch (error: any) {
      setError(error?.errors?.length >= 1 && error?.errors.slice(-1));
      return;
    }

    Backend.post("auth/login", body)
      .then((res) => {
        console.log(res);
        SecureStore.setItem("jwt",res.token);
        router.replace("/");
      }) 
      .catch(err => setError(err.length >= 1 && err[0]));
  };

  return (
    <BaseLayout>
      <View className="px-5 flex-col flex-1">
        <View className="flex-col gap-y-4 flex-1">
          {error && <View className="mt-1"><Alert>{error}</Alert></View>}
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
        </View>

        <View className="flex-row self-stretch gap-x-2 mt-4">
          <Button style={{ flex: 1 }} onPress={sendForm}>Login</Button>
        </View>
      </View>
    </BaseLayout>
  );
}
