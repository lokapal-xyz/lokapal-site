import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create language-specific Apollo clients
const createApolloClient = (language: string) => {
  const endpoints = {
    en: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_EN || 'YOUR_ENGLISH_ENDPOINT',
    es: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_ES || 'YOUR_SPANISH_ENDPOINT',
  };

  const httpLink = new HttpLink({
    uri: endpoints[language as keyof typeof endpoints] || endpoints.en,
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
            shards: {
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
    },
  });
};

// Export clients for both languages
export const englishApolloClient = createApolloClient('en');
export const spanishApolloClient = createApolloClient('es');

// Default export for backward compatibility
export default englishApolloClient;