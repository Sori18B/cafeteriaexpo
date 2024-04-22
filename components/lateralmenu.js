import { StyleSheet, Text } from 'react-native';
import {createDrawerNavigator,DrawerContentScrollView,} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Botonmenu from './botonmenu';
import Inicio from '../pantallas/Inicio';
import Registro from '../pantallas/Registro';
import InicioSesion from '../pantallas/InicioSes';
import Productos from '../pantallas/Productos';
import Carrito from '../pantallas/Carrito';
import Pedidos from '../pantallas/Pedidos';
import Actualizar from '../pantallas/ActUsuarios';


const Drawer = createDrawerNavigator();
export default function Menu() {
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
function ElementosMenu({ navigation }) {
  return (
    <DrawerContentScrollView style={estilos.contenedor}>
      <Text style={estilos.titulo}>Bienvenido!</Text>
      <Text style={estilos.titulo}>Menu de navegación:</Text>
      <Botonmenu
        text="Página principal"
        onPress={() => {
          navigation.navigate('Inicio');
        }}
        icon="home"
      />
      <Botonmenu
        text="Registrar cuenta"
        onPress={() => {
          navigation.navigate('Registro');
        }}
        icon="adduser"
      />
      <Botonmenu
        text="Iniciar Sesion"
        onPress={() => {
          navigation.navigate('InicioSesion');
        }}
        icon="user"
      />
      <Botonmenu
        text="Listado de productos"
        onPress={() => {
          navigation.navigate('Productos');
        }}
        icon="bars"
      />
      <Botonmenu
        text="Ver carrito"
        onPress={() => {
          navigation.navigate('Carrito');
        }}
        icon="shoppingcart"
      />
      <Botonmenu
        text="Ver pedidos"
        onPress={() => {
          navigation.navigate('Pedidos');
        }}
        icon="shoppingcart"
      />

    </DrawerContentScrollView>
  );
}
const estilos = StyleSheet.create({
  contenedor: {
    padding: 18,
    backgroundColor: '#B08968',
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color:'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3  },
});
