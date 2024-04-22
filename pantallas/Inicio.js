import React from 'react';
import { StyleSheet, View, Text,  ImageBackground } from 'react-native';

const PlaceholderImage = require('../assets/fondo.jpg');

export default function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={PlaceholderImage} style={styles.backgroundImage}>
        <View style={styles.topOverlay}>
          <Text style={styles.titulo}>CAFE</Text>
          <Text style={styles.titulo}>MAGNIFIQUE</Text>
        </View>
        <View style={styles.bottomOverlay}>
          <Text style={styles.texto}>Bienvenido! {'\n'} Inicia sesión o registra una cuenta</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    color: 'white',
    textAlign: 'center',
    fontSize: 48,
  },
    texto: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topOverlay: {
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 20, 
  },
  bottomOverlay: {
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 80, 
  },
});
