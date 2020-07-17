// controla qual rota está disponível para o usuário
import React, { useContext } from 'react';

import AuthContext from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
   const { signed } = useContext(AuthContext);
   // switch de rotas baseado no contexto
   return signed ? <AppRoutes/> : <AuthRoutes />;
}

export default Routes;