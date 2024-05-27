// pages/_app.js
import { Provider } from "react-redux";
import { store } from "../store";
import Layout from "../components/Layout";
import "../src/app/globals.css";

import { useRouter } from "next/router";
import LoginLayout from "../components/LoginLayout";
import { AuthProvider } from "../hooks/useAuth";

function grocery({ Component, pageProps }) {
  
  const router = useRouter();
  const isLoginPage = router.pathname === "/user/login";

  return (
    <Provider store={store}>
      {isLoginPage ? (
        <LoginLayout>
          <Component {...pageProps} />
        </LoginLayout>
      ) : (
        <Layout>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </Layout>
      )}
    </Provider>
  );
}

export default grocery;
