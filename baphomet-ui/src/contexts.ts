import { createContext, useContext } from 'react';
import { CustomErrorTypes } from './CustomTypes.types';

// ---------- Show Heading Context

export const ShowHeadingContext = createContext<{
  showHeading: boolean;
  setShowHeading: (showHeading: boolean) => void;
}>({
  showHeading: false,
  setShowHeading: () => {}
});

export const useShowHeading = () => useContext(ShowHeadingContext);

// ---------- Has Error Context

export const ErrorContext = createContext<{
  error: CustomErrorTypes | undefined;
  setError: (error: CustomErrorTypes | undefined) => void;
}>({
  error: undefined,
  setError: () => {}
});

export const useError = () => useContext(ErrorContext);

// ---------- Authenticated Context

export const AuthenticatedContext = createContext<{
  authenticated: boolean;
  setAuthenticated: (authorized: boolean) => void;
}>({
  authenticated: false,
  setAuthenticated: () => {}
});

export const useAuthorized = () => useContext(AuthenticatedContext);
