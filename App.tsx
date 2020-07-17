import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/auth';
import Routes from './src/routes';

const App: React.FC = () => {

   /* .Provider - todas as telas vão ter acesso ao contexto */
   return (
      <NavigationContainer>
         <AuthProvider>
            <Routes />
         </AuthProvider>
      </NavigationContainer>
   );
}

export default App;