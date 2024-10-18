import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const domain = 'https://platform-dev.repay.auth0app.com'; // Replace with your Auth0 domain
const clientId = 'rm3Rh0AkRhYAMrWqwBjq3cOm0rR5VCRa';  // Replace with your Auth0 client ID

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience={`https://platform-dev.repay.auth0app.com/api/v2/`}
    scope="openid profile email"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
