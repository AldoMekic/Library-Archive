import React from 'react';

const ErrorPage = ({errorMessage}) => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;