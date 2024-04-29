import { createContext, useState } from "react";

export const MyContext = createContext({
  user: null,
  setUserFunction: (userData) => {},
});

export const MyContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const setUserFunction = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData)); // Saving user data to sessionStorage
  };

  return (
    <MyContext.Provider
      value={{ user, setUserFunction }}
    >
      {props.children}
    </MyContext.Provider>
  );
};