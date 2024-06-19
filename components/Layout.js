// components/Layout.js
import Navbar from "./Navbar";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
