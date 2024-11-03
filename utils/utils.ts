// import { Backend } from "../services/Backend";
import * as SecureStore from 'expo-secure-store';
export function isUserLoggedIn() {
    const jwt = SecureStore.getItem("jwt");

    return jwt ? true : false;
}

export function isUserAdmin() {
    if (!isUserLoggedIn()) return;
    
    const jwt = SecureStore.getItem("jwt");

    return JSON.parse(atob(jwt!.split('.')[1])).role === 'admin';
}

// export async function userHasPermissions(permissionKey) {
//     var res = await Backend.get(`user/me/has-permission-to/${permissionKey}`);
//     return res.status === true;
// }