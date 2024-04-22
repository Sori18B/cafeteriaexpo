

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Inicio from '../pantallas/Inicio';
import Registro from '../pantallas/Registro';
import ElementosMenu from './lateralmenu';
import InicioSesion from '../pantallas/InicioSes';
import Productos from '../pantallas/Productos';
import Carrito from '../pantallas/Carrito';
import Pedidos from '../pantallas/Pedidos';
import Actualizar from '../pantallas/ActUsuarios';



const Drawer = createDrawerNavigator();

export default function NavegaStack() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <ElementosMenu {...props} />}>
        <Drawer.Screen name="Inicio" component={Inicio} />
        <Drawer.Screen name="Registro" component={Registro} />
        <Drawer.Screen name="InicioSesion" component={InicioSesion} />
        <Drawer.Screen name="Productos" component={Productos} />
        <Drawer.Screen name="Carrito" component={Carrito} />
        <Drawer.Screen name="Pedidos" component={Pedidos} />
        <Drawer.Screen name="Actualizar" component={Actualizar} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
