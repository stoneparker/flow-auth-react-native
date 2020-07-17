import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import * as auth from '../services/auth';

interface AuthContextData {
   signed: boolean;
   user: object | null;
   signIn(): Promise<void>; // promise são os que têm async, acho
   signOut(): void;
} // token não é importante para os componentes, apenas pelo cliente de requsições http. o context é para os componentes

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
   const [user, setUser] = useState<object | null>(null); // o estado pode armazenar tanto um objeto (no caso do usuário estar logado), quanto ser nulo

   useEffect(() => {
      async function loadStoragedData() {
         const storagedUser = await AsyncStorage.getItem('@RNAuth:user'); // armazenamento do objeto usuário em forma de string
         const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

         if (storagedUser && storagedToken) {
            setUser(JSON.parse(storagedUser));
         }
      }

      loadStoragedData();
   }, []);

   async function signIn() {
      const response = await auth.signIn();

      setUser(response.user); // usuário que se autenticou

      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user)); // armazenamento do objeto usuário em forma de string
      await AsyncStorage.setItem('@RNAuth:token', response.token);
   }

   function signOut() {
      AsyncStorage.clear().then(() => {
         setUser(null);
      })
   }

   return (
      <AuthContext.Provider value={{ signed: Boolean(user), user, signIn, signOut }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthContext;