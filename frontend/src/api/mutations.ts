import { gql } from '@apollo/client';

// TODO: Update to handle uploading movie posters

export const ADD_MOVIE = gql`
  mutation addMovie(
    $title: String!
    $rated: String
    $releaseDate: String
    $fullplot: String
  ) {
    newMovie: addMovie(
      title: $title
      rated: $rated
      releaseDate: $releaseDate
      fullplot: $fullplot
    ) {
      title
      releaseDate
      rated
      id
      fullplot
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation updateMovie(
    $id: ID!
    $title: String!
    $rated: String
    $releaseDate: String
    $poster: String
    $fullplot: String
  ) {
    updatedMovie: updateMovie(
      id: $id
      title: $title
      rated: $rated
      releaseDate: $releaseDate
      poster: $poster
      fullplot: $fullplot
    ) {
      title
      releaseDate
      rated
      id
      poster
      fullplot
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(id: $id)
  }
`;
