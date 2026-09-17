import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  onSnapshot, 
  updateDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAS-Qh-bS8y3BI4v7QByYMmn2wVvU8jJi0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mandarin-learning-54243.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mandarin-learning-54243",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mandarin-learning-54243.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "430002688685",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:430002688685:web:0d3ce94a6d758211feec24",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-HN441RCXGW"
};

// Initialize Firebase App singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Firestore
let db = null;
try {
  db = getFirestore(app);
} catch (e) {
  console.warn('Firestore initialization notice:', e);
}
export { db };

/**
 * Sign in with official Google Popup using Firebase
 */
export async function signInWithGoogleFirebase() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return {
      user: result.user,
      error: null
    };
  } catch (error) {
    console.error('Firebase Google Sign-In error:', error);
    return {
      user: null,
      error: error.message || 'Đăng nhập Google thất bại hoặc cửa sổ đã bị đóng.'
    };
  }
}

/**
 * Sign out from Firebase
 */
export async function signOutFirebase() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Firebase Sign-Out error:', error);
  }
}
