// // Import all named exports attached to a usersAPI object
// // This syntax can be helpful documenting where the methods come from
// import * as usersAPI from './users-api';

// //We will use a src/utilities/users-service.js module to organize functions used to sign-up, log in, log out, etc.
// //Any component can import the functions exported from this file as needed.

// export async function signUp(userData) {
//     // Delegate the network request code to the users-api.js API module
//     // which will ultimately return a JSON Web Token (JWT)
//     const token = await usersAPI.signUp(userData);
//     // Baby step by returning whatever is sent back by the server
//     localStorage.setItem("token", token)
//     return getUser();
// }

// export async function login(credentials) {

//     const token = await usersAPI.login(credentials)

//     localStorage.setItem('token', token)
//     return getUser()
// }


// //Setting the userState When the Page is Loaded or Refreshed:
// export function getToken() {
//     // getItem returns null if there's no string
//     const token = localStorage.getItem('token');
//     if (!token) return null;
//     // Obtain the payload of the token
//     //The atob()method decodes a base-64 encoded string
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     // A JWT's exp is expressed in seconds, not milliseconds, so convert
//     if (payload.exp < Date.now() / 1000) {
//         // Token has expired - remove it from localStorage
//         localStorage.removeItem('token');
//         return null;
//     }
//     return token;
// }

// //the above function was decoded to be able to use here in the below function:
// export function getUser() {
//     const token = getToken();
//     // If there's a token, return the user in the payload, otherwise return null
//     return token ? JSON.parse(atob(token.split('.')[1])).user : null;
// }

// export function logOut() {
//     localStorage.removeItem('token')
// }

// export function checkToken() {
//     // Just so that you don't forget how to use .then
//     return usersAPI.checkToken()
//         // checkToken returns a string, but let's
//         // make it a Date object for more flexibility
//         .then(dateStr => new Date(dateStr));
// }

import * as usersAPI from './users-api';

export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    const token = await usersAPI.signUp(userData);

    localStorage.setItem("token", token)
    return getUser()
}

export async function login(credentials) {

    const token = await usersAPI.login(credentials)

    localStorage.setItem("token", token)
    return getUser()
}


export function getToken() {
    // getItem returns null if there's no string
    const token = localStorage.getItem("token")
    if (!token) return null
    // Obtain the payload of the token


    // const tokenPayloadStr = token.split('.')[1]
    // const decodedPayload = atob(tokenPayloadStr)
    // const parsedPayload = JSON.parse(decodedPayload)
    const payload = JSON.parse(atob(token.split('.')[1]));

    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        return null
    }
    return token
}


export function getUser() {
    const token = getToken();
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
    localStorage.removeItem('token')
}

export function checkToken() {
    // Just so that you don't forget how to use .then
    return usersAPI.checkToken()
        // checkToken returns a string, but let's
        // make it a Date object for more flexibility
        .then(dateStr => new Date(dateStr));
}