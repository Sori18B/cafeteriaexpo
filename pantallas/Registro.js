import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { firebase } from '../config'; 

const SignupSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, 'Mínimo 2 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .required('Ingrese su nombre completo'),
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('Ingrese su dirección de correo'),
  password: Yup.string()
    .min(8, 'Mínimo 8 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .required('Ingrese una contraseña'),
  confirmarPassword: Yup.string()
    .min(8, 'Mínimo 8 caracteres')
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Es necesario confirmar la contraseña'),
  telefono: Yup.string()
    .min(10, 'Debe ingresar 10 dígitos')
    .max(10, 'Debe ingresar exactamente 10 dígitos')
    .required('Ingrese su número de teléfono')
    .matches(/^[0-9]+$/, 'Debe contener solo dígitos'),
});

const Registro = () => {
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const todoRef = firebase.firestore().collection('usuarios');

  const addUsuario = (data) => {
    console.log('Datos a agregar:', data);
    todoRef.add(data).then(() => {
      console.log('Usuario registrado exitosamente');
      setRegistroExitoso(true);
    }).catch((error) => {
      console.error('Error al registrar usuario:', error.code);
      let errorMessage = 'Error al registrar usuario';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'El correo electrónico ya está en uso';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'La contraseña es débil';
      }
      Alert.alert('Error', errorMessage);
    });
  };

  return (
    <Formik
      initialValues={{
        nombre: '',
        email: '',
        password: '',
        confirmarPassword: '',
        telefono: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { resetForm }) => {
        const { nombre, email, password, telefono } = values;
        addUsuario({ nombre, email, telefono, password });
        resetForm();
      }}
    >
      {({ values, errors, touched, handleChange, setFieldTouched, handleSubmit, isValid }) => (
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Formulario de registro :)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Ingresa tu nombre completo'
                value={values.nombre}
                onChangeText={handleChange('nombre')}
                onBlur={() => setFieldTouched('nombre')}
              />
              {touched.nombre && errors.nombre && (
                <Text style={styles.errorText}>{errors.nombre}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Ingresa tu correo electrónico'
                value={values.email}
                autoCapitalize='none'
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder='Ingresa tu contraseña'
                autoCapitalize='none'
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder='Confirma tu contraseña'
                autoCapitalize='none'
                value={values.confirmarPassword}
                onChangeText={handleChange('confirmarPassword')}
                onBlur={() => setFieldTouched('confirmarPassword')}
              />
              {touched.confirmarPassword && errors.confirmarPassword && (
                <Text style={styles.errorText}>{errors.confirmarPassword}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                keyboardType='number-pad'
                style={styles.input}
                placeholder='Ingresa tu número de teléfono'
                autoCapitalize='none'
                value={values.telefono}
                onChangeText={handleChange('telefono')}
                onBlur={() => setFieldTouched('telefono')}
              />
              {touched.telefono && errors.telefono && (
                <Text style={styles.errorText}>{errors.telefono}</Text>
              )}
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.button}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Registrar cuenta</Text>
            </TouchableOpacity>
          </View>
          {registroExitoso && (
            <Text style={styles.successText}>Usuario registrado exitosamente</Text>
          )}
        </View>
      )}
    </Formik>
  );
};

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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: '#16213E',
    fontSize: 26,
    fontWeight: 'bold',
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
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#395864',
    padding: 12,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default Registro;
