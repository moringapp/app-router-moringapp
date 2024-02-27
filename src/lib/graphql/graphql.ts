import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
} from "@apollo/client";
import { GraphQLInterface } from "./interface";
import { ApolloLink, from } from "apollo-link";
import { HttpLink } from "apollo-link-http";

class GraphQL implements GraphQLInterface {
  private apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor(private baseUrl: string, private token: string | null) {
    const headers: Record<string, string> | undefined = this.token
      ? { Authorization: `Bearer ${this.token}` }
      : undefined;

    const httpLink = new HttpLink({ uri: this.baseUrl });

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          ...headers,
        },
      });

      return forward(operation);
    });

    this.apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: from([authMiddleware, httpLink]) as any,
    });
  }

  async query(query: string) {
    try {
      const { data, error } = await this.apolloClient.query({
        query: gql`${query}`,
      });
      return {
        data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  async mutation(mutation: string) {
    try {
      const { data, errors } = await this.apolloClient.mutate({
        mutation: gql`${mutation}`,
      });
      return {
        data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}

export default GraphQL;
