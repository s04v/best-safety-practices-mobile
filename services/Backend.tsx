
import * as SecureStore from 'expo-secure-store';

const BASE_URL = "https://bsp-backend-xqdx.onrender.com/api";
// const BASE_URL = "http://localhost:7091/api";

const getHeaders = () => {
    let headers: any = {
        "Content-Type": "application/json",
    }
    const jwt = SecureStore.getItem("jwt");
    if (jwt) {
        headers = { ...headers, "Authorization": `Bearer ${jwt}` };
    }

    return headers;
}

function get(endpoint: any, options = {}) {
    const requestOptions = {
        method: 'GET',
        headers: getHeaders(),
        ...options
    };
    return fetch(`${BASE_URL}/${endpoint}`, requestOptions).then(handleResponse);
}

function post(endpoint: string, body: any) {
    const requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body)
    };
    return fetch(`${BASE_URL}/${endpoint}`, requestOptions).then(handleResponse);
}

function postFormData(endpoint: string, body: any) {
    const headers = getHeaders();

    const requestOptions: any = {
        method: 'POST',
        headers: headers.Authorization ? { Authorization: headers.Authorization } : {},
        body: body
    };

    return fetch(`${BASE_URL}/${endpoint}`, requestOptions).then(handleResponse);
}

function put(endpoint: string, body: any) {
    const requestOptions = {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(body)
    };
    return fetch(`${BASE_URL}/${endpoint}`, requestOptions).then(handleResponse);
}

function _delete(endpoint: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: getHeaders()
    };
    return fetch(`${BASE_URL}/${endpoint}`, requestOptions).then(handleResponse);
}

function download(endpoint: string) {
    const requestOptions = {
        method: 'GET',
        headers: getHeaders(),
        responseType: 'blob'
    };
    return fetch(`${BASE_URL}/${endpoint}`, requestOptions)
        .then(res => {
            if (res.ok) {
                return Promise.resolve(res.blob());
            }

            return Promise.reject("Error when downloading");
        });
}

function handleResponse(response: any) {
    return response.text().then((text: any) => {
        console.log(response);
        console.log(text);
        const data = text && JSON.parse(text);

        if (!response.ok) {
            // response.json().then((txt: any) => console.log("123"));

            const error = (data && data.errors) || response.statusText;
            return Promise.reject(error);
        }

        return Promise.resolve(data || null);
    });
}

const Backend = {
    get,
    post,
    postFormData,
    put,
    delete: _delete,
    download
};

export async function userHasPermissions(permissionKey: string) {
    var res = await Backend.get(`user/me/has-permission-to/${permissionKey}`);
    return res.status === true;
}

export default Backend;
