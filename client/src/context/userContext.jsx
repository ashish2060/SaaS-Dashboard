import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_ORIGIN}/api/user/getuserdetails`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: localStorage.getItem("accessToken"),
        }),
      }
    );
    const data = await response.json();
    setUser(data?.user);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <UserContext.Provider value={{ user, fetchUserDetails }}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;