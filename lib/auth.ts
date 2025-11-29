import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  User,
  UserCredential,
  OAuthCredential
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * Sign in with Google using OpenID Connect (OIDC) protocol
 * Firebase handles the OIDC flow automatically when using GoogleAuthProvider
 * 
 * The authentication flow:
 * 1. User clicks "Sign in with Google"
 * 2. Firebase redirects to Google's OAuth 2.0 authorization endpoint
 * 3. User authenticates with Google (IdP)
 * 4. Google returns an ID token (JWT) to Firebase
 * 5. Firebase validates the token and creates a session
 * 6. User is authenticated in the application
 */
export const signInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  
  // Request additional OAuth scopes if needed
  provider.addScope('profile');
  provider.addScope('email');
  
  // Optional: Force account selection
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    const result = await signInWithPopup(auth, provider);
    
    // Get the OAuth access token and ID token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const idToken = credential?.idToken;
    
    console.log('Authentication successful');
    console.log('Access Token:', token ? 'Present' : 'Not available');
    console.log('ID Token (OIDC):', idToken ? 'Present' : 'Not available');
    
    return result;
  } catch (error: any) {
    console.error('Error during Google sign-in:', error);
    
    // Handle specific error codes
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in popup was closed before completing the sign-in process');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Sign-in popup was blocked by the browser');
    } else if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Only one popup request is allowed at a time');
    }
    
    throw error;
  }
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

/**
 * Get the current authenticated user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
