// //Create a users-api.js Module (this file rightchere)
// // The users - service.js module will definitely need to make AJAX requests to the Express server.
// // As discussed earlier, network related code is better abstracted into its own modules.
// //This file is an API module that will handle user-related communications with the server.

// // This is the base path of the Express route we'll define
// const BASE_URL = '/api/users';

// export async function signUp(userData) {
//     // Fetch uses an options object as a second arg to make requests
//     // other than basic GET requests, include data, headers, etc.
//     const res = await fetch(BASE_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         // Fetch requires data payloads to be stringified and assigned to a body property on the options object
//         body: JSON.stringify(userData)
//     });
//     // Check if request was successful with (res.ok)
//     if (res.ok) {
//         // res.json() will resolve to the JWT (JSON Web Token)
//         return res.json();
//     } else {
//         throw new Error('Invalid Sign Up');
//     }
// }


// export async function login(credentials) {
//     const res = await fetch(`${BASE_URL}/login`, {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials)
//     })

//     // Check if request was successful
//     if (res.ok) {
//         // res.json() will resolve to the JWT
//         return res.json()
//     } else {
//         throw new Error('Invalid Sign Up');
//     }
// }


//However, notice how the existing signUpand loginfunctions in users-api.js aren't very DRY?
//Here's a really clean refactor that will DRY things up in a jiffy:

import { getToken } from './users-service';
const BASE_URL = '/api/users';


export function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
}

/*--- Helper Functions ---*/

async function sendRequest(url, method = 'GET', payload = null) {
    // Fetch accepts an options object as the 2nd argument
    // used to include a data payload, set headers, etc.
    const options = { method };
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
    }

    const token = getToken();
    if (token) {
        // Ensure the headers object exists
        options.headers = options.headers || {};
        // Add token to an Authorization header
        // Prefacing with 'Bearer' is recommended in the HTTP specification
        options.headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(url, options);
    // res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) return res.json();
    throw new Error('Bad Request');
}



//IMPORTANT: The fetch method will not raise an error unless there's a network failure. This is why we need to check the res.ok property to see if the server returned a successful response (status code in the 200s).