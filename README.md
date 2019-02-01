# Haventec Common JS

A collection of javascript functions to facilitate client-side interaction with Haventec backend services. 

## Installation

`npm install @haventec/common-js`

## General Usage

### Angular 2-5 Usage

For Angular 2, HaventecCommonProvider is provided to easily inject HaventecClient into your Module, 
simply add it to the providers array. It can then be injected into constructors as is typical.

### Generic Usage

Access the HaventecClient object via the usual means (the following applies to Typescript):
```
import {HaventecClient} from '@haventec/common-js';

let haventecClient = new HaventecClient();
```

## Initialisation

The HaventecClient object must be initialised for a particular user. This typically is done after signup:
```
haventecClient.init(username);
```

This provisions haventecClient with required data to interact with the Haventec endpoints, and manages its persistence.
On completion, the data required by the endpoints can be accessed directly:
```
let username = haventecClient.getUsername();
let deviceUuid = haventecClient.getDeviceUuid();
let authKey = haventecClient.getAuthKey();
let hashedPin = haventecClient.getHashPin(pin);
```

For interactions that authenticate haventecClient must be updated with the response on the return, to keep the data in sync:
```
haventecClient.updateDataFromResponse(data);
```
This must be run on return with the result from the following Haventec POST endpoints:
```
/authentication/login
/authentication/reset-pin
/device
/authentication/activate/device
/authentication/activate/user
```

Additionally, haventecClient provides a http object that can be used to communicate with the main Haventec endpoints, 
and handles responses in a standard way.
N.B. We do not recommend communicating with the Haventec endpoints directly from the frontend, as it will expose the API Key.
We do recommend calling the endpoints via a server intermediary, that can be invoked via haventecClient.http
```
let body = {
  applicationUuid: YOUR_APPLICATION_UUID,
  username: username,
  deviceUuid: deviceUuid,
  authKey: authKey,
  hashedPin: hashedPin
};

haventecClient.http.postNoAuth(haventecLoginUrl, body).then(
    data => {
      haventecClient.updateDataFromResponse(data);
        // Handle success 
    },
    err => {
      // Handle error
    }
  );
```

## General-purpose Functions
```
haventecClient.isAdmin(); 
haventecClient.isANAdmin(); 
haventecClient.isANSupport(); 
haventecClient.isRole(role: string); 
```
Detects if the logged-in user is an Admin or Authenticate Admin, Authenticate Support, or a particular role

```
haventecClient.purge(); 
```
Removes all data for the current user - including localStorage

```
haventecClient.invalidateToken(); 
```
Sets the token of the current user to undefined, so that no further calls can be made

```
let deviceName = haventecClient.getDeviceName(); 
```
Auto-generates a suitable device name for the current device, comprising the OS, browser, and device
Information is parsed from the User-Agent string and formatted.
e.g. "MacOS Chrome"

```
let userUuid = haventecClient.getUserUuid(); 
```
Returns the Haventec userUuid unique ID representing the current authenticated user. Returns undefined if not authenticated

```
let applicationUuid = haventecClient.getApplicationUuid(); 
```
Returns the Haventec applicationUuid unique ID representing the application of the current user. Returns undefined if there a user has not been provisioned on the current device



## Development
To build, install the npm package 'npmts'. Then run the commands in order:
```
npmts
npm pack
```

## Contributors

 - John Kelaita
 - Justin Crosbie

## License

This code is available under the MIT license. A copy of the license can be found in the LICENSE file included with the distribution.
 