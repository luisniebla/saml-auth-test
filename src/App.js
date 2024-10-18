import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  const connection = getQueryParams('connection'); // Get the 'connection' parameter from the URL

  const loginWithSAML = () => {
    if (connection) {
      loginWithRedirect({
      authorizationParams: {
        connection: connection // Replace with your SAML connection name
      }
    })
    } else {
    loginWithRedirect({
    });
  }
  };

    const connectionValues = [
    '24bd1970-a677-4ca7-a4d2-e328ddd4691b-repay-samlp-0',
    '002152af-9b53-4eeb-bd46-edbd2e2d698e-merchant-db',
    null,
  ];

    const getInitialToggleIndex = () => {
    const currentConnection = getQueryParams('connection');
    const index = connectionValues.indexOf(currentConnection);
    return index === -1 ? 0 : index; // Default to 0 if the current connection is not in the array
  };
  console.log('window.location.search', window.location.search)

  // State to track the current toggle index
  const [currentToggleIndex, setCurrentToggleIndex] = useState(getInitialToggleIndex);

  console.log(currentToggleIndex)
  const changeQueryString = () => {
    const newIndex = (currentToggleIndex + 1) % connectionValues.length;
    const newConnection = connectionValues[newIndex];

    // Create a new URLSearchParams object
    const urlParams = new URLSearchParams(window.location.search);

    // Update or remove the 'connection' query parameter based on the new value
    if (newConnection) {
      urlParams.set('connection', newConnection);
    } else {
      urlParams.delete('connection'); // Remove the 'connection' parameter if null
    }

    // Update the browser's URL without reloading the page
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, '', newUrl);

    // Update the current toggle state
    setCurrentToggleIndex(newIndex);

    console.log('Query string updated to:', newConnection || 'none');
  };


  console.log(connection)


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={changeQueryString}>Change Query String</button>
        <h1>SAML Authentication Test</h1>
        {!isAuthenticated ? (
          <button onClick={loginWithSAML}>{`Login with ${connection === null ? 'auth0' : connection}`}</button>
        ) : (
          <>
            <h2>Welcome, {user.name}</h2>
            <button onClick={() => logout({ returnTo: window.location.origin })}>
              Logout
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
