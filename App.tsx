/**
 * AdvancedCadastroApp
 * Sistema de Cadastro de Alunos com MVC + Redux
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import store from './src/redux/store';
import MenuScreen from './src/view/screens/MenuScreen';
import AlunoScreen from './src/view/screens/AlunoScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Menu"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Alunos" component={AlunoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}

export default App;
