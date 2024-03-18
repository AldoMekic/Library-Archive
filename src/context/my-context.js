import { createContext, useState } from "react";

export const MyContext = createContext({
  user: null,
  setUserFunction: (userData) => {},
});

export const MyContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const setUserFunction = (userData) => {
    setUser(userData);
  };

  return (
    <MyContext.Provider
      value={{ user, setUserFunction }}
    >
      {props.children}
    </MyContext.Provider>
  );
};