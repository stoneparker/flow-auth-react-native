import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import * as auth from '../services/auth';
import api from '../services/api';


interface AuthContextData {
   signed: boolean;
   user: object | null;
   loading: boolean;
   signIn(): Promise<void>; // promise são os que têm async, acho
   signOut(): void;
} // token não é importante para os componentes, apenas pelo cliente de requsições http. o context é para os componentes

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
   const [user, setUser] = useState<object | null>(null); // o estado pode armazenar tanto um objeto (no caso do usuário estar logado), quanto ser nulo
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function loadStoragedData() {
         const storagedUser = await AsyncStorage.getItem('@RNAuth:user'); // armazenamento do objeto usuário em forma de string
         const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

         // token já vai como padrão em todas as requisições
         api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

         if (storagedUser && storagedToken) {
            setUser(JSON.parse(storagedUser));
            setLoading(false);
         }
      }

      loadStoragedData();
   }, []);

   async function signIn() {
      const response = await auth.signIn();

      setUser(response.user); // usuário que se autenticou

      // token já vai como padrão em todas as requisições
      api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user)); // armazenamento do objeto usuário em forma de string
      await AsyncStorage.setItem('@RNAuth:token', response.token);
   }

   function signOut() {
      AsyncStorage.clear().then(() => {
         setUser(null);
      })
   }

   return (
      <AuthContext.Provider value={{ signed: Boolean(user), user, loading, signIn, signOut }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthContext;