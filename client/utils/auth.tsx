import React, { useState, useContext, createContext, FC, useEffect } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';

type AuthContextType = {
   setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
   isSignedIn: () => boolean;
   createApolloClient: () => ApolloClient<NormalizedCacheObject>;
   signIn: (token: string) => void;
   signOut: () => void;
};

const AuthContext = createContext(null as any as AuthContextType);

export const AuthProvider: FC = ({ children }) => {
   const auth = useProvideAuth();

   useEffect(() => {
      localStorage.getItem('auth-token') ? auth.setAuthToken(localStorage.getItem('auth-token')) : null;
   }, []);

   return (
      <AuthContext.Provider value={auth}>
         <ApolloProvider client={auth.createApolloClient()}>{children}</ApolloProvider>
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   return useContext(AuthContext);
};

function useProvideAuth(): AuthContextType {
   const [authToken, setAuthToken] = useState(null as null | string);

   const signIn = (token: string) => {
      setAuthToken(token);
      localStorage.setItem('auth-token', token);
   };

   const signOut = () => {
      setAuthToken(null);
      localStorage.clear();
   };

   const isSignedIn = () => {
      if (authToken) {
         return true;
      } else {
         return false;
      }
   };

   const getAuthHeaders = () => {
      if (!authToken) return null;

      return `Bearer ${authToken}`;
   };

   const createApolloClient = () => {
      const authorization = getAuthHeaders();
      const link = new HttpLink({
         uri: 'https://hb-notes-backend.herokuapp.com/graphql',
         headers: {
            authorization
         }
      });

      return new ApolloClient({
         link,
         cache: new InMemoryCache()
      });
   };

   return {
      setAuthToken,
      isSignedIn,
      createApolloClient,
      signIn,
      signOut
   };
}
