// hoc/withAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, checkAuthentication } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        checkAuthentication();
      }
    }, [user]);

    if (!user) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
