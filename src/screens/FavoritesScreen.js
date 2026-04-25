import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  FlatList, Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { eliminarFavorito } from '../features/favoritesSlice';
import { buscarPorCiudad } from '../features/weatherSlice';
import { COLORS } from '../../globals/colors';

export default function FavoritesScreen({ navigation }) {
  const dispatch = useDispatch();
  const { lista } = useSelector((s) => s.favorites);

  const verClima = (ciudad) => {
    dispatch(buscarPorCiudad(ciudad));
    navigation.navigate('Search', { ciudad });
  };

  const confirmarEliminar = (id, ciudad) => {
    Alert.alert(
      'Eliminar favorito',
      `¿Querés quitar ${ciudad} de favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => dispatch(eliminarFavorito(id)) },
      ]
    );
  };

  if (lista.length === 0) {
    return (
      <View style={styles.vacio}>
        <Text style={styles.vacioEmoji}>⭐</Text>
        <Text style={styles.vacioTitulo}>Sin favoritos todavía</Text>
        <Text style={styles.vacioTexto}>
          Buscá una ciudad y guardala como favorita para verla acá.
        </Text>
        <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.botonTexto}>Buscar ciudad</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.pantalla}>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={
          <Text style={styles.contador}>{lista.length} ciudad{lista.length !== 1 ? 'es' : ''} guardada{lista.length !== 1 ? 's' : ''}</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => verClima(item.ciudad)}
          >
            <View style={styles.itemIzquierda}>
              <Text style={styles.itemEmoji}>📍</Text>
              <Text style={styles.itemCiudad}>{item.ciudad}</Text>
            </View>
            <TouchableOpacity
              style={styles.eliminarBtn}
              onPress={() => confirmarEliminar(item.id, item.ciudad)}
            >
              <Text style={styles.eliminarTexto}>✕</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  lista: {
    padding: 20,
  },
  contador: {
    color: COLORS.gray,
    fontSize: 13,
    marginBottom: 12,
  },
  item: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardLight,
  },
  itemIzquierda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemEmoji: {
    fontSize: 20,
  },
  itemCiudad: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  eliminarBtn: {
    backgroundColor: '#3d1515',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eliminarTexto: {
    color: COLORS.danger,
    fontWeight: 'bold',
    fontSize: 13,
  },
  vacio: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  vacioEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  vacioTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  vacioTexto: {
    color: COLORS.gray,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  boton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  botonTexto: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});