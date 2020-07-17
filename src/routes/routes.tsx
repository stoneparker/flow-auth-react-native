import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';

const AppStack = createStackNavigator();

const Routes = () => {
   return (
      <NavigationContainer>
         <AppStack.Navigator>
            <AppStack.Screen name="SignIn" component={SignIn} />
            <AppStack.Screen name="Dashboard" component={Dashboard} />
         </AppStack.Navigator>
      </NavigationContainer>
   )
}

export default Routes;
