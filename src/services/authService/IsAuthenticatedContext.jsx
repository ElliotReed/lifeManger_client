import React from "react";
const { Provider, Consumer } = React.createContext();

const IsAuthenticatedContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  return (
    <Provider
      value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export {
  IsAuthenticatedContextProvider,
  Consumer as IsAuthenticatedContextConsumer,
};
