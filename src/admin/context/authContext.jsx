
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginAdmin,
  refreshAdminSession,
  logoutAdmin,
} from "../../api/authApi";

const AuthContext = createContext(null);

// Share the initial refresh request across React StrictMode remounts.
let sessionRestorePromise = null;

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    if (!sessionRestorePromise) {
      sessionRestorePromise = refreshAdminSession()
        .catch(() => null)
        .finally(() => {
          sessionRestorePromise = null;
        });
    }

    sessionRestorePromise.then((result) => {
      if (!active) return;

      if (result) {
        setAdmin(result.admin || null);
        setIsAuthenticated(true);
      } else {
        setAdmin(null);
        setIsAuthenticated(false);
      }

      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleExpired = () => {
      setAdmin(null);
      setIsAuthenticated(false);
    };

    window.addEventListener("adminSessionExpired", handleExpired);

    return () => {
      window.removeEventListener("adminSessionExpired", handleExpired);
    };
  }, []);

  const login = async (credentials) => {
    const result = await loginAdmin(credentials);

    setAdmin(result.admin || null);
    setIsAuthenticated(true);

    return result;
  };

  const logout = async () => {
    try {
      await logoutAdmin();
    } finally {
      setAdmin(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
