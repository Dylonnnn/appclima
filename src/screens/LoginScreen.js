import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, registrar, limpiarError } from '../features/authSlice';
import { COLORS } from '../../globals/colors';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const { cargando, error } = useSelector((s) => s.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [esRegistro, setEsRegistro] = useState(false);

  const manejar = () => {
    if (!email.trim() || !password.trim()) {
      return Alert.alert('Error', 'Completá todos los campos');
    }
    if (esRegistro) {
      dispatch(registrar({ email, password }));
    } else {
      dispatch(login({ email, password }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.pantalla}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.contenido}>
        <Text style={styles.emoji}>🌤</Text>
        <Text style={styles.titulo}>ClimaApp</Text>
        <Text style={styles.subtitulo}>
          {esRegistro ? 'Creá tu cuenta' : 'Iniciá sesión para continuar'}
        </Text>

        <View style={styles.formulario}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="tu@email.com"
            placeholderTextColor={COLORS.gray}
            value={email}
            onChangeText={(t) => { setEmail(t); dispatch(limpiarError()); }}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={COLORS.gray}
            value={password}
            onChangeText={(t) => { setPassword(t); dispatch(limpiarError()); }}
            secureTextEntry
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={[styles.boton, cargando && styles.botonDeshabilitado]}
            onPress={manejar}
            disabled={cargando}
          >
            <Text style={styles.botonTexto}>
              {cargando ? 'Cargando...' : esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchBtn}
            onPress={() => { setEsRegistro(!esRegistro); dispatch(limpiarError()); }}
          >
            <Text style={styles.switchTexto}>
              {esRegistro
                ? '¿Ya tenés cuenta? Iniciá sesión'
                : '¿No tenés cuenta? Registrate gratis'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 15,
    color: COLORS.gray,
    marginBottom: 40,
  },
  formulario: {
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray,
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.white,
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  error: {
    color: COLORS.danger,
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
  boton: {
    backgroundColor: COLORS.accent,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
  botonTexto: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchBtn: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchTexto: {
    color: COLORS.secondary,
    fontSize: 14,
  },
});