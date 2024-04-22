import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { firebase } from '../config';

const db = firebase.firestore();

export default function ConsultaPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('pedidos').onSnapshot(snapshot => {
      const pedidosData = snapshot.docs.map(doc => doc.data());
      setPedidos(pedidosData);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.pedidoContainer}>
      <Text style={styles.pedidoTitle}>Pedido</Text>
      {item.productos.map((producto, index) => (
        <View key={index}>
          <Text>{producto.nombre} - ${producto.precio}</Text>
        </View>
      ))}
      <Text style={styles.pedidoTotal}>Total: ${item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de Pedidos</Text>
      {pedidos.length === 0 ? (
        <Text>No hay pedidos</Text>
      ) : (
        <FlatList
          data={pedidos}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
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
  pedidoContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  pedidoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pedidoTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'right',
  },
});
