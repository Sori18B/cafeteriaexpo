import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { firebase } from '../config';

const db = firebase.firestore();

export default function Carrito() {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const unsubscribe = db.collection('carrito').onSnapshot(snapshot => {
      const productos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProductos(productos);
      calcularTotal(productos);
    });

    return () => unsubscribe();
  }, []);

  const calcularTotal = (productos) => {
    let total = 0;
    productos.forEach(producto => {
      total += producto.precio;
    });
    setTotal(total);
  };

  const eliminarProducto = async (id) => {
    try {
      await db.collection('carrito').doc(id).delete();
      console.log('Producto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

const realizarPedido = () => {
  db.collection('pedidos').add({
    productos: productos.map(producto => ({
      nombre: producto.nombre,
      precio: producto.precio
    })),
    total: total
  })
  .then(() => {
    Alert.alert('Pedido Realizado', 'Su pedido ha sido registrado correctamente');
    db.collection('carrito').get().then(snapshot => {
      snapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  })
  .catch(error => {
    console.error('Error al realizar el pedido:', error);
  });
};


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemNombre}>{item.nombre}</Text>
      <Text style={styles.itemPrecio}>${item.precio}</Text>
      <TouchableOpacity onPress={() => eliminarProducto(item.id)}>
        <Text style={styles.eliminarButton}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      {productos.length === 0 ? (
        <Text>El carrito está vacío</Text>
      ) : (
        <>
          <FlatList
            data={productos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.flatList}
          />
          <Text style={styles.total}>Total: ${total}</Text>
          <TouchableOpacity onPress={realizarPedido} style={styles.pedidoButton}>
            <Text style={styles.pedidoButtonText}>Realizar Pedido</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
    elevation: 2,
  },
  itemNombre: {
    fontSize: 16,
  },
  itemPrecio: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eliminarButton: {
    color: 'red',
    marginLeft: 10,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20,
  },
  flatList: {
    flexGrow: 0,
  },
  pedidoButton: {
    backgroundColor: '#874e00',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  pedidoButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});