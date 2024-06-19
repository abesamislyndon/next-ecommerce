// hooks/useAuth.js
import { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const checkUser = async () => {
        try {
          const response = await fetch("/api/customer/get", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUser(data.user);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };
      checkUser();
    }
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
      } else {
        const response = await fetch("/api/customer/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleLogout = async () => {
    const token = Cookies.get("token");
    try {
       const response = await fetch("/api/customer/logout?token=true", {
         headers: {
           Acccept: "application/json",
           Authorization: `Bearer ${token}`,
         },
       });
      console.log(response);
      if (response.ok) {
        Cookies.remove("token");
        sessionStorage.removeItem("BasicInfo");
        setUser(null);
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return {
    user,
    handleLogout,
    checkAuthentication,
  };
};
