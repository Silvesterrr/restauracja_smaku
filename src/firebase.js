import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const requiredConfig = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.appId,
]

const useEmulators =
  import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true'
const firestoreEmulatorPort = Number(
  import.meta.env.VITE_FIRESTORE_EMULATOR_PORT || 8085,
)

export const firebaseConfigured =
  useEmulators || requiredConfig.every(Boolean)

const fallbackConfig = {
  apiKey: 'demo-api-key',
  authDomain: 'demo-restauracja-smaku.firebaseapp.com',
  projectId: 'demo-restauracja-smaku',
  appId: 'demo-restauracja-smaku',
}

const app = initializeApp(
  firebaseConfigured ? firebaseConfig : fallbackConfig,
)

export const auth = getAuth(app)
export const db = getFirestore(app)

if (useEmulators && !globalThis.__RESTAURACJA_FIREBASE_EMULATORS__) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
    disableWarnings: true,
  })
  connectFirestoreEmulator(db, '127.0.0.1', firestoreEmulatorPort)
  globalThis.__RESTAURACJA_FIREBASE_EMULATORS__ = true
}
