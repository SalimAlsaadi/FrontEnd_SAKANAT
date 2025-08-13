export const environment = {
  production: false,
   auth: { 
    authority: 'http://localhost:9001',            // your Spring Auth Server
    clientId: 'frontend-client',                   // same as RegisteredClient
    redirectUrl: 'http://localhost:4200/callback', // must match RegisteredClient
    postLogoutRedirectUri: 'http://localhost:4200/',
    scope: 'openid profile read write',
    responseType: 'code',                          // PKCE
    useRefreshToken: true
  },
 apiBaseUrl: 'http://localhost:8008'             // your Resource Server base URL
};


