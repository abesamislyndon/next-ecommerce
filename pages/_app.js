import { Provider } from "react-redux";
import { store } from "../store";
import Layout from "../components/Layout";
import LoginLayout from "../components/LoginLayout";
import SignupLayout from "../components/SignupLayout"; // Import the SignupLayout component
import { AuthProvider } from "../hooks/useAuth";
import "../src/app/globals.css";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";


function GroceryApp({ Component, pageProps : {session, ...pageProps}, }) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/user/login";
  const isSignupPage = router.pathname === "/user/signup"; // Check if the current route is the signup page

  return (
    // <SessionProvider session={session}>
      <Provider store={store}>
        {isLoginPage ? (
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        ) : isSignupPage ? (
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        ) : (
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        )}
      </Provider>
    // </SessionProvider>
  );
}

export default GroceryApp;
