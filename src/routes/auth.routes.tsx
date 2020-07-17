// rotas que o usuário tem acesso enquanto não está autenticado na aplicação
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';

const AuthStack = createStackNavigator();

const AuthRoute: React.FC = () => (
   <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignIn} />
   </AuthStack.Navigator>
);

export default AuthRoute;

