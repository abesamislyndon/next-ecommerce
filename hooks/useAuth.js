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

  const get_user_id = () => {
    if (typeof window !== "undefined") {
      // Get the item from sessionStorage
      const userData = sessionStorage.getItem("BasicInfo");

      // Parse the JSON string if it exists
      if (userData) {
        const parsedUserData = JSON.parse(userData);

        // Access the `id` field
        return parsedUserData.id;
      }
    }

    return null; // Return null if there's no data or during SSR
  };

  const userId = get_user_id();


    if (token) {
      const checkUser = async () => {
        try {
          const response = await fetch(`/api/customers/${userId}?token=true`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });

          const data = await response.json();
          if (response.ok) {
            setUser(data);
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
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
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
     if (!token) {
     router.push("/login");
    } else {
      try { 
        const response = await fetch("/api/customer/logout?token=true", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        console.log('token', token);
 

        if (response.ok) {
          Cookies.remove("token");
          sessionStorage.removeItem("BasicInfo");
          window.location.reload();
          router.push("/");
          setUser(null);
          // console.log("Logout successful, redirecting...");
        } else {
          console.error("Logout failed with status:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };


  return {
    user,
    handleLogout,
    checkAuthentication,
  };
};
