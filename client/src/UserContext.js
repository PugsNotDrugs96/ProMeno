import { createContext, useEffect, useState } from "react";
import React from "react";
import { validateToken } from "./api/api";

const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const token = localStorage.getItem("key");
  const [user, setUser] = useState(token);

  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        const response = await validateToken(token);
        if (response.status === 200) {
          setUser(token);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    fetchData();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
