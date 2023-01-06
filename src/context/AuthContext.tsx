import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";
interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  updateIsAuthenticated: (isAuthenticated: boolean) => void;
}
export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token) {
      const decoded: any = jwt.decode(cookies.token);
      if (decoded) {
        const isExpired = decoded.exp < Date.now() / 1000;
        if (isExpired) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      }
    }
  }, [cookies]);

  const updateIsAuthenticated = (isAuthenticated: boolean) => {
    setIsAuthenticated(isAuthenticated);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, updateIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const value = useContext(AuthContext);
  return value;
};
