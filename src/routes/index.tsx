// controla qual rota está disponível para o usuário
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
   const { signed, loading } = useAuth();
   // switch de rotas baseado no contexto

   if (loading) {
      // manter a splashscreen é uma ótima opção, com a lib react-native-splash-screen
      return (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#999" />
         </View>
      )
   }

   return signed ? <AppRoutes/> : <AuthRoutes />;
}

export default Routes;