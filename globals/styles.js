import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const globalStyles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    paddingTop: 60,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 32,
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.white,
    width: '100%',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.cardLight,
    marginBottom: 12,
  },
  boton: {
    backgroundColor: COLORS.accent,
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  botonTexto: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonSecundario: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: '100%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  botonSecundarioTexto: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 24,
    width: '90%',
    borderWidth: 1,
    borderColor: COLORS.cardLight,
    marginTop: 16,
  },
  error: {
    color: COLORS.danger,
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },
  seccionTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 12,
    marginTop: 24,
  },
});