# Spotify API Template NodeJS

This repository contains a template for a Node.js application that uses the Spotify Web API. 

## Getting Started

1. Clone the repository:
   ```bash
   git clone
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Create a new Spotify application at the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
4. Add the client ID and client secret to the `.env` file:
    ```env
    CLIENT_ID=YOUR_CLIENT_ID
    CLIENT_SECRET=YOUR_CLIENT_SECRET
    REDIRECT_URI=http://localhost:3000/auth/callback
    ```
5. Start the server:
    ```bash
    npm start
    ```
6. Open the application in your web browser:
    ```
    http://localhost:3000
    ```
7. Click the "Log in with Spotify" button to authenticate with Spotify.

8. After authenticating, you will be redirected to the `/callback` route, where you can see your profile name!

## Authentication Flow

The authentication flow for the Spotify API involves the following steps:

1. **Authorization Request**: The user is redirected to the Spotify Accounts service. This is where the user logs in and authorizes your application to access their Spotify data. The URL for this request includes your client ID, the redirect URI, and the scopes your application needs.

2. **Redirect URI**: After the user authorizes your application, Spotify redirects the user to the redirect URI you specified. This URI includes a code parameter in the query string.

3. **Authorization Code Exchange**: Your application exchanges the authorization code for an access token by making a POST request to the Spotify Accounts service. This request includes your client ID, client secret, the authorization code, and the redirect URI.

4. **Access Token**: If the authorization code is valid, Spotify returns an access token. This token is used to authenticate your requests to the Spotify Web API.

### Example

1. **Authorization Request**:
   ```
   GET https://accounts.spotify.com/authorize
       ?client_id=YOUR_CLIENT_ID
       &response_type=code
       &redirect_uri=YOUR_REDIRECT_URI
       &scope=user-read-private user-read-email
   ```

2. **Redirect URI**:
   ```
   http://localhost:3000/callback?code=AQAhz0v-MCdrmbh47HzX_0Mq1Z2ekiV9lA5l8Jak-oYJxNdAVliZc62lIpXEUnNn1xPDFKzqAoSj4jIIwKM7Gui_nBqMH_9AI-BKDrmoQMFMX4pK3LveKFOlGqPANwZcH20x0PgwCDGD0oyGdn9DyPO1VImbn4BDA0SPYFywrybsJySjwrbrQdbYDV0itG3lkJrSEQtiV73cAAclADywvY_5HYJPjA
   ```

3. **Authorization Code Exchange**:
   ```
   POST https://accounts.spotify.com/api/token
       -H "Content-Type: application/x-www-form-urlencoded"
       -d "grant_type=authorization_code"
       -d "code=AUTHORIZATION_CODE"
       -d "redirect_uri=YOUR_REDIRECT_URI"
       -d "client_id=YOUR_CLIENT_ID"
       -d "client_secret=YOUR_CLIENT_SECRET"
   ```

4. **Access Token**:
   ```json
   {
       "access_token": "ACCESS_TOKEN",
       "token_type": "Bearer",
       "expires_in": 3600,
       "refresh_token": "REFRESH_TOKEN",
       "scope": "user-read-private user-read-email"
   }
   ```

Use the access token to make authenticated requests to the Spotify Web API.

```javascript
axios.get('https://api.spotify.com/v1/me', {
    headers: {
        'Authorization': 'Bearer ' + access_token
    }
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error(error);
});
```


