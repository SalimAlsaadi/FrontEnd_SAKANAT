export const environment = {
  production: false,

  auth: {
    authority: 'https://localhost:9443',
    clientId: 'AQARK-client',
    redirectUrl: 'http://localhost:4200/callback',
    postLogoutRedirectUri: 'http://localhost:4200/',
    scope: 'openid profile email read write',
  },

apiBaseUrl: 'https://localhost:8008'
};
