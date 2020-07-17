import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthContext from './src/contexts/auth';
import Routes from './src/routes';

const App: React.FC = () => {
   /* .Provider - todas as telas vão ter acesso ao contexto */
   return (
      <NavigationContainer>
         <AuthContext.Provider value={{ signed: true }}>
            <Routes />
         </AuthContext.Provider>
      </NavigationContainer>
   );
}

export default App;