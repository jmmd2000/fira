import {
  type ReactNode,
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";
import { api } from "~/utils/api";
import { type User } from "@prisma/client";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  updateUser: (newUser: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an AuthProvider");
  }
  return context;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { data, isLoading } = api.user.getCurrentUser.useQuery();

  useEffect(() => {
    if (!isLoading && data) {
      setUser(data.user);
    }
  }, [data, isLoading]);

  useEffect(() => {
    // Check for window to ensure code is running in the browser
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as boolean;
        if (typeof parsedUser === "object") {
          setUser(parsedUser);
        } else {
          console.error("Invalid user value in local storage");
        }
      }
    }
  }, []);

  const updateUser = (newUser: User) => {
    // check for window here to prevent server-side access to localStorage
    if (typeof window !== "undefined") {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  };

  const contextValues: UserContextType = {
    user,
    isLoading,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
}
