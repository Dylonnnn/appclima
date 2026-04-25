export const buscarPorCiudad = createAsyncThunk(
  'weather/buscarPorCiudad',
  async (ciudad, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherByCity(ciudad);
      await guardarCiudad(data.name + ', ' + data.sys.country); // ← agregá await
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);