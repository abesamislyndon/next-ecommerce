// pages/_app.js
import { Provider } from "react-redux";
import { store } from "../store";
import Layout from "../components/Layout";
import "../src/app/globals.css";

function grocery({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default grocery;
