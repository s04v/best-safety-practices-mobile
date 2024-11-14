// import { Backend } from "../services/Backend";
import * as SecureStore from 'expo-secure-store';
import base64 from 'react-native-base64';

export function isUserLoggedIn() {
    const jwt = SecureStore.getItem("jwt");

    return jwt ? true : false;
}

export function isUserAdmin() {
    if (!isUserLoggedIn()) return;
    
    const jwt = SecureStore.getItem("jwt");

    const decodedString = base64.decode(jwt!.split('.')[1]);
    const role = decodedString.match(/"role"\s*:\s*"([^"]+)"/)?.[1];
    console.log(role);
    return role === 'admin';
}

// export async function userHasPermissions(permissionKey) {
//     var res = await Backend.get(`user/me/has-permission-to/${permissionKey}`);
//     return res.status === true;
// }