import { ServerError, ServerParseError } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { GraphQLFormattedError, GraphQLErrorExtensions } from 'graphql';

export type CustomNetworkErrorTypes =
  | ServerError
  | (ServerParseError & { statusCode?: number });

export type CustomApolloErrorTypes = ApolloError & {
  networkError?: CustomNetworkErrorTypes;
  status?: string | number;
  statusCode?: number;
  cause?: Error;
};

export type CustomErrorTypes = Error & {
  title: string;
  name: string;
  message: string;
  status?: string | number;
  networkError?: CustomNetworkErrorTypes;
  apolloError?: CustomApolloErrorTypes;
  graphQLErrors: ReadonlyArray<GraphQLFormattedError>;
  protocolErrors: ReadonlyArray<{
    message: string;
    extensions?: GraphQLErrorExtensions[];
  }>;
  clientErrors: ReadonlyArray<Error>;
  statusCode?: number;
  extraInfo?: any;
  cause?: Error;
  stack?: string;
};
