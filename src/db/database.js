import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'historial_clima';

export const inicializarDB = async () => {
  const existe = await AsyncStorage.getItem(KEY);
  if (!existe) await AsyncStorage.setItem(KEY, JSON.stringify([]));
};

export const guardarCiudad = async (ciudad) => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const historial = raw ? JSON.parse(raw) : [];
    const nuevo = [
      { id: Date.now(), ciudad, fecha: new Date().toISOString() },
      ...historial.filter((i) => i.ciudad !== ciudad),
    ].slice(0, 10);
    await AsyncStorage.setItem(KEY, JSON.stringify(nuevo));
  } catch (e) {
    console.warn('Error guardando ciudad:', e);
  }
};

export const obtenerHistorial = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const limpiarHistorial = async () => {
  await AsyncStorage.setItem(KEY, JSON.stringify([]));
};