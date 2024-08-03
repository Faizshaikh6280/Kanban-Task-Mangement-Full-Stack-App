import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [authuser, setAuthuser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        authuser,
        setAuthuser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Auth Context is used outside of provider.');
  return context;
}

export default AuthContextProvider;
