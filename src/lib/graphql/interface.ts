export interface GraphQLInterface {
  query: (query: string) => Promise<any>;
  mutation: (mutation: string) => Promise<any>;
}
