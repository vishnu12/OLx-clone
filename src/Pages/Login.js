import React from 'react';
import Login from '../Components/Login/Login';

function LoginPage({location}) {
  return (
    <div>
      <Login location={location} />
    </div>
  );
}

export default LoginPage;
