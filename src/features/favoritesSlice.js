import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';

export const cargarFavoritos = createAsyncThunk('favorites/cargar', async (uid, { rejectWithValue }) => {
  try {
    const q = query(collection(db, 'favoritos'), where('uid', '==', uid));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const agregarFavorito = createAsyncThunk('favorites/agregar', async ({ uid, ciudad }, { rejectWithValue }) => {
  try {
    const ref = await addDoc(collection(db, 'favoritos'), { uid, ciudad });
    return { id: ref.id, uid, ciudad };
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const eliminarFavorito = createAsyncThunk('favorites/eliminar', async (id, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, 'favoritos', id));
    return id;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { lista: [], cargando: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cargarFavoritos.fulfilled, (state, action) => { state.lista = action.payload; })
      .addCase(agregarFavorito.fulfilled, (state, action) => { state.lista.push(action.payload); })
      .addCase(eliminarFavorito.fulfilled, (state, action) => {
        state.lista = state.lista.filter((f) => f.id !== action.payload);
      });
  },
});

export default favoritesSlice.reducer;