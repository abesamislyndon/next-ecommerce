// hooks/useAuth.js
import { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";

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
    const token = localStorage.getItem("token");
    if (token) {
      const checkUser = async () => {
        try {
          const response = await fetch("/api/auth/check-auth", {
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
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      } else {
        const response = await fetch("/api/auth/check-auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          router.push("/login");
        } else {
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        localStorage.removeItem("token");
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
