// pages/auth/error.js
const ErrorPage = ({ error }) => {
  return (
    <div>
      <h1>Authentication Error</h1>
 {error}
    </div>
  );
};

export default ErrorPage;
