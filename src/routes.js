import Main from './pages/page_main';
import Login from './pages/page_login';
import Avaliador from './pages/page_avaliadores';
import Bairros from './pages/page_bairros';
import Valorizacao from './pages/page_Region';
import MainMapa from './pages/page_mapa';
import Comparacao from './pages/page_comparacao';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';

const Stack = createStackNavigator();
function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="mapa">
        <Stack.Screen
          name="Main"
          component={Main}
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
          name="mapa"
          component={MainMapa}
          options={{
            title: 'Imobile',
            headerStyle: {
              backgroundColor: '#111111',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="login"
          component={Login}
          options={{
            title: 'Login',
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
          name="bairros"
          component={Bairros}
          options={{
            title: 'Bairros',
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
              backgroundColor: '#111',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="comparacao"
          component={Comparacao}
          options={({navigation, route}) => ({
            title: `${route.params.bairro1} X ${route.params.bairro2}`,
            headerStyle: {
              backgroundColor: '#111',
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
