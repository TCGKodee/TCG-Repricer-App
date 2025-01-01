import { User, UserCredential, GoogleAuthProvider } from 'firebase/auth';

interface MockUser extends Partial<User> {
  uid: string;
  email: string | null;
  displayName: string | null;
  getIdToken: () => Promise<string>;
}

interface MockUserCredential {
  user: MockUser;
}

export const mockAuth = {
  currentUser: null as User | null,
  
  signInWithEmailAndPassword: async (email: string, password: string): Promise<MockUserCredential> => {
    // Simulate basic validation
    if (!email || !password) {
      throw new Error('Missing email or password');
    }
    
    return {
      user: {
        uid: '1',
        email,
        displayName: email.split('@')[0],
        getIdToken: async () => 'mock-token'
      }
    };
  },
  
  createUserWithEmailAndPassword: async (email: string, password: string): Promise<MockUserCredential> => {
    // Simulate basic validation
    if (!email || !password) {
      throw new Error('Missing email or password');
    }
    if (password.length < 6) {
      throw new Error('Password should be at least 6 characters');
    }
    
    return {
      user: {
        uid: '1',
        email,
        displayName: email.split('@')[0],
        getIdToken: async () => 'mock-token'
      }
    };
  },
  
  signInWithPopup: async (provider: GoogleAuthProvider): Promise<MockUserCredential> => {
    return {
      user: {
        uid: '1',
        email: 'demo@example.com',
        displayName: 'Demo User',
        getIdToken: async () => 'mock-token'
      }
    };
  }
};