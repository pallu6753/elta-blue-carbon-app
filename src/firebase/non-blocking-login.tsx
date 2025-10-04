'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { toast } from '@/hooks/use-toast';

function handleAuthError(error: unknown) {
  let errorMessage = 'An unexpected error occurred. Please try again.';
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-credential':
        errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email address.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password. Please try again.';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already registered. Please sign in or use a different email.';
        break;
      case 'auth/weak-password':
        errorMessage = 'The password is too weak. Please use at least 6 characters.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Please enter a valid email address.';
        break;
      default:
        errorMessage = `An authentication error occurred: ${error.message}`;
        break;
    }
  }
  
  toast({
    variant: 'destructive',
    title: 'Authentication Failed',
    description: errorMessage,
  });
}


/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance).catch(handleAuthError);
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  createUserWithEmailAndPassword(authInstance, email, password).catch(handleAuthError);
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password).catch(handleAuthError);
}
