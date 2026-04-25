import { initializeApp, getApps ,getapps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCz5jvmeh0HQixM4k_eKG_bJt7kMHyA8UU',
  authDomain: 'clima-app-81b0f.firebaseapp.com',
  projectId: 'clima-app-81b0f',
  storageBucket: 'clima-app-81b0f.firebasestorage.app',
  messagingSenderId: '161086231374',
  appId: '1:161086231374:web:b76fe8c6a8ef29f8ad841f',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);