import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { firebase } from '../config';

const db = firebase.firestore();

const productos = [
  { id: '1', nombre: 'Café Americano', precio: 25, imagen: require('../assets/Americano.jpg') },
  { id: '2', nombre: 'Pastel de fresa', precio: 28, imagen: require('../assets/Pastel.jpg') },
  { id: '3', nombre: 'Café Latte', precio: 30, imagen: require('../assets/Latte.jpg') },
  { id: '4', nombre: 'Cappuccino', precio: 40, imagen: require('../assets/Cappuchino.jpg') },
  { id: '5', nombre: 'Mocha', precio: 35, imagen: require('../assets/Mocha.jpg') },
  { id: '6', nombre: 'Café con Leche', precio: 25, imagen: require('../assets/Cafe&Leche.jpg') },
];

export default function Productos({ navigation }) {
  const agregarProductoAlCarrito = async (item) => {
    try {
      await db.collection('carrito').doc(item.id).set({
        nombre: item.nombre,
        precio: item.precio,
      });
      alert(`Agregado al carrito: ${item.nombre}`);
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetalleProducto', { productId: item.id });
        }}
      >
        <Image source={item.imagen} style={styles.itemImage} />
        <Text style={styles.itemNombre}>{item.nombre}</Text>
        <Text style={styles.itemPrecio}>${item.precio}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.agregarCarritoButton}
        onPress={() => agregarProductoAlCarrito(item)}
      >
        <Text style={styles.agregarCarritoButtonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.bienvenida}>¡Bienvenidos a Café Magnifique!</Text>
      <Text style={styles.menu}>Menú de productos</Text>
      <FlatList
        data={productos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    paddingTop: 20,
  },
  bienvenida: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#874e00', 
  },
  menu: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#874e00', 
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  itemNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  itemPrecio: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  agregarCarritoButton: {
    backgroundColor: '#874e00', // Color café
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  agregarCarritoButtonText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});
