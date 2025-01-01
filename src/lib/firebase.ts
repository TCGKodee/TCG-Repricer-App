import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { mockAuth } from './mockAuth';

const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID'
] as const;

const missingEnvVars = requiredEnvVars.filter(
  (key) => !import.meta.env[key]
);

const hasFirebaseConfig = missingEnvVars.length === 0;

export const auth = hasFirebaseConfig
  ? (() => {
      const firebaseConfig: FirebaseOptions = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
      };

      const app = initializeApp(firebaseConfig);
      return getAuth(app);
    })()
  : mockAuth;