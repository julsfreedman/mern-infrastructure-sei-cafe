//Create a users-api.js Module (this file rightchere)
// The users - service.js module will definitely need to make AJAX requests to the Express server.
// As discussed earlier, network related code is better abstracted into its own modules.
//This file is an API module that will handle user-related communications with the server.

// This is the base path of the Express route we'll define
const BASE_URL = '/api/users';

export async function signUp(userData) {
    // Fetch uses an options object as a second arg to make requests
    // other than basic GET requests, include data, headers, etc.
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Fetch requires data payloads to be stringified and assigned to a body property on the options object
        body: JSON.stringify(userData)
    });
    // Check if request was successful with (res.ok)
    if (res.ok) {
        // res.json() will resolve to the JWT (JSON Web Token)
        return res.json();
    } else {
        throw new Error('Invalid Sign Up');
    }
}

//IMPORTANT: The fetch method will not raise an error unless there's a network failure. This is why we need to check the res.ok property to see if the server returned a successful response (status code in the 200s).