'use client';

import { ApolloProvider } from '@apollo/client/react';
import { englishApolloClient, spanishApolloClient } from '@/lib/apollo-client';

interface ApolloProviderWrapperProps {
  children: React.ReactNode;
  language?: string;
}

export function ApolloProviderWrapper({ children, language = 'en' }: ApolloProviderWrapperProps) {
  // Select the appropriate Apollo client based on language
  const client = language === 'es' ? spanishApolloClient : englishApolloClient;
  
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}