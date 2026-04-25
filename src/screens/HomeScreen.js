import React, { useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ActivityIndicator, ScrollView, Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { buscarPorUbicacion, buscarPorCiudad } from '../features/weatherSlice';
import { logout } from '../features/authSlice';
import { cargarFavoritos, agregarFavorito } from '../features/favoritesSlice';
import WeatherCard from '../components/WeatherCard';
import { COLORS } from '../../globals/colors';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { datos, cargando, error } = useSelector((s) => s.weather);
  const { usuario } = useSelector((s) => s.auth);
  const { lista: favoritos } = useSelector((s) => s.favorites);

  useEffect(() => {
    pedirUbicacion();
    if (usuario) dispatch(cargarFavoritos(usuario.uid));
  }, []);

  const pedirUbicacion = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sin ubicación', 'Podés buscar una ciudad manualmente');
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    dispatch(buscarPorUbicacion({ lat: loc.coords.latitude, lon: loc.coords.longitude }));
  };

  const ciudadActual = datos ? `${datos.name}, ${datos.sys.country}` : null;
  const esFavorito = favoritos.some((f) => f.ciudad === ciudadActual);

  const toggleFavorito = () => {
    if (!datos || !usuario) return;
    if (!esFavorito) {
      dispatch(agregarFavorito({ uid: usuario.uid, ciudad: ciudadActual }));
    }
  };

  const nombreUsuario = usuario?.email?.split('@')[0] ?? 'Usuario';

  return (
    <ScrollView style={styles.pantalla} contentContainerStyle={styles.contenido}>
      <View style={styles.header}>
        <View>
          <Text style={styles.saludo}>Hola, {nombreUsuario} 👋</Text>
          <Text style={styles.fecha}>
            {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </Text>
        </View>
        <TouchableOpacity onPress={() => dispatch(logout())} style={styles.salirBtn}>
          <Text style={styles.salirTexto}>Salir</Text>
        </TouchableOpacity>
      </View>

      {cargando && (
        <View style={styles.cargando}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.cargandoTexto}>Obteniendo clima...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorTexto}>⚠️ {error}</Text>
        </View>
      )}

      {datos && <WeatherCard datos={datos} />}

      {datos && (
        <View style={styles.acciones}>
          <TouchableOpacity
            style={[styles.accionBtn, esFavorito && styles.accionBtnActivo]}
            onPress={toggleFavorito}
          >
            <Text style={styles.accionBtnTexto}>
              {esFavorito ? '★ Guardado' : '☆ Guardar favorito'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.accionBtn, { backgroundColor: COLORS.accent }]}
            onPress={pedirUbicacion}
          >
            <Text style={[styles.accionBtnTexto, { color: COLORS.white }]}>📍 Mi ubicación</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.botonBuscar}
        onPress={() => navigation.navigate('Search')}
      >
        <Text style={styles.botonBuscarTexto}>🔍  Buscar otra ciudad</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonFavoritos}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.botonFavoritosTexto}>⭐  Mis favoritos ({favoritos.length})</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contenido: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '90%',
    marginBottom: 24,
  },
  saludo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  fecha: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  salirBtn: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  salirTexto: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  cargando: {
    alignItems: 'center',
    marginTop: 60,
    gap: 12,
  },
  cargandoTexto: {
    color: COLORS.gray,
    fontSize: 14,
  },
  errorBox: {
    backgroundColor: '#3d1515',
    borderRadius: 12,
    padding: 14,
    width: '90%',
    marginBottom: 16,
  },
  errorTexto: {
    color: COLORS.danger,
    fontSize: 14,
    textAlign: 'center',
  },
  acciones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    width: '90%',
  },
  accionBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  accionBtnActivo: {
    backgroundColor: COLORS.primary,
  },
  accionBtnTexto: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  botonBuscar: {
    backgroundColor: COLORS.accent,
    width: '90%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  botonBuscarTexto: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonFavoritos: {
    backgroundColor: COLORS.card,
    width: '90%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  botonFavoritosTexto: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});