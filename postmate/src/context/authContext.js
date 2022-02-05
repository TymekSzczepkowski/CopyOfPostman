import React from "react";

const AuthContext = React.createContext({
  login: () => {},
  logout: () => {},
});

AuthContext.displayName = "AuthContext";

export default AuthContext;
