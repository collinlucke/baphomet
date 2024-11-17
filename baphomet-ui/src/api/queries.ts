import { gql } from '@apollo/client';

export const GET_ALL_MOVIES = gql`
  query getAllMovies($limit: Int, $searchTerm: String) {
    allMovies: getAllMovies(limit: $limit, searchTerm: $searchTerm) {
      fullplot
      poster
      title
      releaseDate
      rated
      id
    }
  }
`;

export const GET_MOVIE = gql`
  query getMovie($id: ID!) {
    movie: getMovie(id: $id) {
      poster
      title
      releaseDate
      rated
      id
      fullplot
    }
  }
`;

export const CHECK_AUTH = gql`
  query checkAuth($token: String) {
    checkAuth(token: $token) {
      isValid
    }
  }
`;
