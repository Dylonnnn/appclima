import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../globals/colors';

const iconoClima = (descripcion = '') => {
  const d = descripcion.toLowerCase();
  if (d.includes('lluvia')) return '🌧';
  if (d.includes('nube')) return '☁️';
  if (d.includes('tormenta')) return '⛈';
  if (d.includes('nieve')) return '❄️';
  if (d.includes('niebla') || d.includes('neblina')) return '🌫';
  return '☀️';
};

const WeatherCard = ({ datos }) => {
  if (!datos) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.icono}>{iconoClima(datos.weather[0].description)}</Text>
      <Text style={styles.ciudad}>{datos.name}, {datos.sys.country}</Text>
      <Text style={styles.temp}>{Math.round(datos.main.temp)}°C</Text>
      <Text style={styles.desc}>{datos.weather[0].description}</Text>
      <View style={styles.separador} />
      <View style={styles.detalles}>
        <View style={styles.detalleItem}>
          <Text style={styles.detalleValor}>{datos.main.humidity}%</Text>
          <Text style={styles.detalleLabel}>Humedad</Text>
        </View>
        <View style={styles.detalleItem}>
          <Text style={styles.detalleValor}>{Math.round(datos.main.feels_like)}°C</Text>
          <Text style={styles.detalleLabel}>Sensación</Text>
        </View>
        <View style={styles.detalleItem}>
          <Text style={styles.detalleValor}>{datos.wind.speed} m/s</Text>
          <Text style={styles.detalleLabel}>Viento</Text>
        </View>
        <View style={styles.detalleItem}>
          <Text style={styles.detalleValor}>{Math.round(datos.main.temp_max)}°</Text>
          <Text style={styles.detalleLabel}>Máx</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  icono: {
    fontSize: 64,
    marginBottom: 8,
  },
  ciudad: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  temp: {
    fontSize: 80,
    fontWeight: '200',
    color: COLORS.primary,
    lineHeight: 90,
  },
  desc: {
    fontSize: 16,
    color: COLORS.gray,
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  separador: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.cardLight,
    marginBottom: 20,
  },
  detalles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  detalleItem: {
    alignItems: 'center',
    flex: 1,
  },
  detalleValor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  detalleLabel: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
  },
});

export default WeatherCard;