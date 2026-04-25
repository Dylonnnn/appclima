import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, FlatList, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { buscarPorCiudad, limpiarClima } from '../features/weatherSlice';
import { obtenerHistorial, limpiarHistorial } from '../db/database';
import WeatherCard from '../components/WeatherCard';
import { COLORS } from '../../globals/colors';

export default function SearchScreen({ route }) {
  const dispatch = useDispatch();
  const { datos, cargando, error } = useSelector((s) => s.weather);
  const [texto, setTexto] = useState('');
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    cargarHistorial();
    dispatch(limpiarClima());
    if (route.params?.ciudad) {
      dispatch(buscarPorCiudad(route.params.ciudad));
    }
  }, []);

  const cargarHistorial = async () => {
    const h = await obtenerHistorial();
    setHistorial(h);
  };

  const buscar = (ciudad) => {
    const query = ciudad || texto;
    if (!query.trim()) return;
    dispatch(buscarPorCiudad(query));
    setTexto('');
    setTimeout(cargarHistorial, 500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.pantalla}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.buscadorContenedor}>
        <TextInput
          style={styles.input}
          placeholder="Ej: Mendoza, AR"
          placeholderTextColor={COLORS.gray}
          value={texto}
          onChangeText={setTexto}
          onSubmitEditing={() => buscar()}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.boton} onPress={() => buscar()}>
          <Text style={styles.botonTexto}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {cargando && (
        <View style={styles.cargando}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorTexto}>⚠️ {error}</Text>
        </View>
      )}

      {datos && <WeatherCard datos={datos} />}

      {historial.length > 0 && (
        <View style={styles.historialContenedor}>
          <View style={styles.historialHeader}>
            <Text style={styles.historialTitulo}>Recientes (guardado offline)</Text>
            <TouchableOpacity
              onPress={() => { limpiarHistorial(); setHistorial([]); }}
            >
              <Text style={styles.limpiarTexto}>Limpiar</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={historial}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.historialItem}
                onPress={() => buscar(item.ciudad)}
              >
                <Text style={styles.historialItemTexto}>🕐 {item.ciudad}</Text>
                <Text style={styles.historialFecha}>
                  {new Date(item.fecha).toLocaleDateString('es-AR')}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 20,
    alignItems: 'center',
  },
  buscadorContenedor: {
    width: '90%',
    marginBottom: 16,
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.white,
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.cardLight,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: COLORS.accent,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonTexto: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cargando: {
    marginTop: 30,
  },
  errorBox: {
    backgroundColor: '#3d1515',
    borderRadius: 12,
    padding: 14,
    width: '90%',
    marginBottom: 12,
  },
  errorTexto: {
    color: COLORS.danger,
    fontSize: 14,
    textAlign: 'center',
  },
  historialContenedor: {
    width: '90%',
    marginTop: 24,
  },
  historialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  historialTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
  limpiarTexto: {
    fontSize: 13,
    color: COLORS.accent,
  },
  historialItem: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  historialItemTexto: {
    color: COLORS.white,
    fontSize: 14,
  },
  historialFecha: {
    color: COLORS.gray,
    fontSize: 12,
  },
});