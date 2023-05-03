import { createContext, useContext } from 'react';
import { useState } from 'react';

const AuthContext = createContext();

export function AuthWrapper({ children }) {
  let [user, setUser] = useState(null)

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}