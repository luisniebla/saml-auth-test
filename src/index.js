import { Auth0Provider } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const clientId = 'rm3Rh0AkRhYAMrWqwBjq3cOm0rR5VCRa';  // Replace with your Auth0 client ID

const Auth0 = () => {
  const [loginMetadata, setLoginMetadata] = React.useState(null);
  useEffect(() => {
    fetch('https://auth.localhost/auth/merchant/api/v1/login-metadata', {
      headers: {
        'X-Repay-Org-Subdomain': 'pb2'
      }
    }).then((response) => {
      response.json().then((data) => {
        setLoginMetadata(data)
      })
    })
  }, [])


  if (!loginMetadata) {
    return null
  }

  return <Auth0Provider
    domain={loginMetadata.auth0.url}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience={`https://platform-dev.repay.auth0app.com/api/v2/`}
    scope="openid profile email"
    authorizationParams={
      {organization: loginMetadata.auth0.auth0_org_id}
    }
  >
    <App loginMetadata={loginMetadata} />
  </Auth0Provider>
}

const root = createRoot( document.getElementById('root') )
root.render(<Auth0 />); // Updated to use createRoot and render method
