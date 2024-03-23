import { useState, useEffect } from "react";

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}
const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Failed to fetch user from localStorage:", error);
      setCurrentUser(null);
    }
  }, []);

  const setUser = (user: User) => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
    } catch (error) {
      console.error("Failed to save user to localStorage:", error);
    }
  };

  const clearUser = () => {
    try {
      localStorage.removeItem("user");
      setCurrentUser(null);
    } catch (error) {
      console.error("Failed to remove user from localStorage:", error);
    }
  };

  return { currentUser, setUser, clearUser };
};
export default useCurrentUser;
