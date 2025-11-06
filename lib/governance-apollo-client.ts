import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create dedicated Apollo client for FMAO Governance
const createGovernanceApolloClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_FMAO_GOVERNANCE || 'https://api.studio.thegraph.com/query/121796/fmao-governance/v0.0.1',
    headers: {
      // Add any additional headers if needed
    },
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            guardians: {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              merge(_existing = [], incoming) {
                return incoming;
              },
            },
            proposals: {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              merge(_existing = [], incoming) {
                return incoming;
              },
            },
            bhaktiTransfers: {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              merge(_existing = [], incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
      },
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'network-only',
      },
    },
  });
};

// Export governance client instance
export const governanceApolloClient = createGovernanceApolloClient();

export default governanceApolloClient;