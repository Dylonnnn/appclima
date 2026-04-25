import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return { uid: cred.user.uid, email: cred.user.email };
  } catch (e) {
    return rejectWithValue('Email o contraseña incorrectos');
  }
});

export const registrar = createAsyncThunk('auth/registrar', async ({ email, password }, { rejectWithValue }) => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return { uid: cred.user.uid, email: cred.user.email };
  } catch (e) {
    return rejectWithValue('No se pudo crear la cuenta');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { usuario: null, cargando: false, error: null },
  reducers: {
    setUsuario: (state, action) => { state.usuario = action.payload; },
    limpiarError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.cargando = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.cargando = false; state.usuario = action.payload; })
      .addCase(login.rejected, (state, action) => { state.cargando = false; state.error = action.payload; })
      .addCase(registrar.pending, (state) => { state.cargando = true; state.error = null; })
      .addCase(registrar.fulfilled, (state, action) => { state.cargando = false; state.usuario = action.payload; })
      .addCase(registrar.rejected, (state, action) => { state.cargando = false; state.error = action.payload; })
      .addCase(logout.fulfilled, (state) => { state.usuario = null; });
  },
});

export const { setUsuario, limpiarError } = authSlice.actions;
export default authSlice.reducer;