import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';

const AppStack = createStackNavigator();

const Routes = () => {
   return (
      <NavigationContainer>
         <AppStack.Navigator>
            <AppStack.Screen name="Login" component={Login} />
         </AppStack.Navigator>
      </NavigationContainer>
   )
}

export default Routes;
