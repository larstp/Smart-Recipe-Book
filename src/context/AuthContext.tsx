import { useState } from 'react';
import { AuthContext } from './auth-context';

type User = {
  name: string;
  email: string;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );

  function login(token: string, user: User) {
    localStorage.setItem('token', token);

    setToken(token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem('token');

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
