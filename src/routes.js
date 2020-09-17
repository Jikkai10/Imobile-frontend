import Avaliador from './pages/page_avaliadores';
import Valorizacao from './pages/pageRegionCap';
import MainMapa from './pages/page_mapa';
import Main from './pages/pageMain';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';


const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="main">
        <Stack.Screen
          name="mapa"
          component={MainMapa}
          options={{
            title: 'Imobile',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="main"
          component={Main}
          options={{
            
            headerShown: false,
            
          }}
        />
        <Stack.Screen
          name="avaliadores"
          component={Avaliador}
          options={{
            title: 'Avaliadores',
            headerStyle: {
              backgroundColor: '#00f',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="valorizacao"
          component={Valorizacao}
          options={({navigation, route}) => ({
            title: route.params.title,
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          })}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
