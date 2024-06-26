
import { useEffect } from "react";
import withAuth from "../../hooks/withAuth";
import Sidebar from "../userprofile/sidebar";
import Info from "../userprofile/info";

const UserProfile = () =>{
    return (
      <>
        <div className="mx-auto container">
          <div className="grid grid-cols-2">
            <Sidebar/>
            <Info />
          </div>
        </div>
      </>
    );
}
export default  withAuth(UserProfile);