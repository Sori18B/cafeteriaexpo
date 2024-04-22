import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { firebase } from '../config';

const ActualizarUsuario = () => {
  const [idDocumento, setIdDocumento] = useState('');
  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const [nuevaContra, setNuevaContra] = useState('');

  const actualizarUsuario = async () => {
    try {
      const usuarioRef = firebase.firestore().collection('usuarios').doc(idDocumento);

      await usuarioRef.update({
        email: nuevoCorreo,
        password: nuevaContra
      });

      Alert.alert('Usuario actualizado correctamente');
      setIdDocumento('');
      setNuevoCorreo('');
      setNuevaContra('');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      Alert.alert('Error', 'Ocurrió un error al actualizar el usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actualizar Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="ID del documento"
        value={idDocumento}
        onChangeText={setIdDocumento}
      />
      <TextInput
        style={styles.input}
        placeholder="Nuevo correo electrónico"
        value={nuevoCorreo}
        onChangeText={setNuevoCorreo}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        value={nuevaContra}
        onChangeText={setNuevaContra}
      />
      <TouchableOpacity style={styles.button} onPress={actualizarUsuario}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ActualizarUsuario;
