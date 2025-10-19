import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface User {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  blood_type?: string;
  birth_date?: string;
  country?: string;
  city?: string;
  adresse?: string;
  postal_code?: number | null; 
  phone_number?: string;
  password?: string; 
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      try {
        const parsedUser: User = JSON.parse(savedUser);
        if (parsedUser && parsedUser.customer_id) {
          setUser(parsedUser);
          setToken(savedToken);
        } else {
          console.warn("⚠️ Utilisateur sauvegardé invalide :", parsedUser);
        }
      } catch (err) {
        console.error("Erreur parsing utilisateur :", err);
      }
    }
  }, []);

  const login = (user: User, token: string) => {
    if (!user.customer_id) {
      console.error("⚠️ Erreur : customer_id manquant dans le user reçu du backend");
    }
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (!user) return;
    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  return context;
};
