// components/Layout.js
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Head from "next/head";


export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Ent3 System</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
