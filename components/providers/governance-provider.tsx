'use client';

import { ApolloProvider } from '@apollo/client/react';
import { governanceApolloClient } from '@/lib/governance-apollo-client';

interface GovernanceProviderProps {
  children: React.ReactNode;
}

/**
 * Separate Apollo Provider for FMAO Governance queries
 * This provider is independent of the language-specific providers
 * and ensures no conflicts with existing Apollo Client setup
 */
export function GovernanceProvider({ children }: GovernanceProviderProps) {
  return (
    <ApolloProvider client={governanceApolloClient}>
      {children}
    </ApolloProvider>
  );
}