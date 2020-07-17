import React, { createContext, useState } from 'react';
import * as auth from '../services/auth';

interface AuthContextData {
   signed: boolean;
   user: object | null;
   signIn(): Promise<void>;
} // token não é importante para os componentes, apenas pelo cliente de requsições http. o context é para os componentes

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
   const [user, setUser] = useState<object | null>(null); // o estado pode armazenar tanto um objeto (no caso do usuário estar logado), quanto ser nulo

   async function signIn() {
      const response = await auth.signIn();

      setUser(response.user); // usuário que se autenticou
   }

   return (
      <AuthContext.Provider value={{ signed: Boolean(user), user, signIn }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthContext;