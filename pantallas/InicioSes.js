import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function InicioSesion({ navigation }) {
  const iniciarSesion = () => {
    navigation.navigate('Productos');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Ingresa tu correo electrónico'
              autoCapitalize='none'
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Ingresa tu contraseña'
              autoCapitalize='none'
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            onPress={iniciarSesion}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B08968',
    paddingHorizontal: 15,
  },
  formContainer: {
    backgroundColor: '#E5E0D5',
    padding: 20,
    borderRadius: 20,
    width: '100%',
  },
  title: {
    color: '#16213E',
    fontSize: 26,
    fontWeight: '400',
    marginBottom: 35,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderColor: '#16213e',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#395864',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
});
