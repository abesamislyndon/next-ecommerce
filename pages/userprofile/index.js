
"use client";
import { useEffect } from "react";
import withAuth from "../../hooks/withAuth";
import Sidebar from "../../components/customer/topnavbar";
import Info from "./info/info";

const UserProfile = () =>{
    return (
      <>
        <div className="mx-auto container">
            <Sidebar/>
            <Info />
         </div>
      </>
    );
}
export default  withAuth(UserProfile);