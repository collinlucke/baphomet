import { useEffect, useState, useLayoutEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MOVIE } from '../../api/queries';
import { UPDATE_MOVIE, ADD_MOVIE } from '../../api/mutations';
import { MovieEditorForm } from './MovieEditorForm';
import { Block, InnerWidth } from '@collinlucke/phantomartist';
import { useNavigate, useParams } from 'react-router-dom';
import { useError, useShowHeading } from '../../contexts';
import { CustomErrorTypes } from '../../CustomTypes.types';

type MovieProps = {
  id?: string;
  title?: string;
  releaseDate?: string;
  rated?: string;
  poster?: string;
  fullplot?: string;
};

type EditMoviePage = MovieProps & {
  clean?: boolean;
  readonly?: boolean;
};

const cleanForm = {
  id: '',
  poster: undefined,
  rated: undefined,
  title: undefined,
  releaseDate: undefined,
  fullplot: ''
};

export const MovieEditorPage: React.FC<EditMoviePage> = ({
  clean,
  readonly
}) => {
  const [movie, setMovie] = useState(cleanForm);
  const [isViewReady, setIsViewReady] = useState(false);
  const { setShowHeading } = useShowHeading();
  const { setError } = useError();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (clean && JSON.stringify(movie) !== JSON.stringify(cleanForm)) {
      setMovie(cleanForm);
    }
    setShowHeading(true);
  }, [clean]);

  const { loading, data } = useQuery(GET_MOVIE, {
    variables: {
      id
    },
    onCompleted: data => {
      setMovie(data.movie);
    }
  });

  useLayoutEffect(() => {
    if (!loading && data) {
      setIsViewReady(true);
    }
  }, [loading, data]);

  const [addMovie] = useMutation(ADD_MOVIE, {
    variables: {
      title: movie.title,
      releaseDate: movie.releaseDate,
      rated: movie.rated,
      poster: movie.poster,
      fullplot: movie.fullplot
    },
    onCompleted: data => {
      navigate(`/view/${data.newMovie.id}`);
    },
    onError: error => {
      setError(error as CustomErrorTypes);
    }
  });

  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    variables: {
      id: movie.id,
      title: movie.title,
      releaseDate: movie.releaseDate,
      rated: movie.rated,
      poster: movie.poster,
      fullplot: movie.fullplot
    },
    onCompleted: data => {
      setMovie(data.updatedMovie);
    },
    onError: error => {
      setError(error as CustomErrorTypes);
    }
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const { name, value } = target;
    const newMovie = { ...movie, [name]: value };
    setMovie(newMovie);
  };
  const onChangeHandlerTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value } = target;
    const newMovie = { ...movie, [name]: value };
    setMovie(newMovie);
  };

  const onSubmitHandler = () => {
    const matchResult = location.pathname?.match(/\/[a-zA-Z0-9]+/);
    const endPoint = matchResult?.[0];

    if (endPoint === '/create') {
      addMovie();
    } else if (endPoint === '/edit') {
      updateMovie();
    }
  };

  return (
    <>
      {(isViewReady || clean) && (
        <Block>
          <InnerWidth>
            <MovieEditorForm
              readonly={readonly}
              clean={clean}
              movie={movie}
              onChange={onChangeHandler}
              onChangeTextArea={onChangeHandlerTextArea}
              onSubmit={onSubmitHandler}
            />
          </InnerWidth>
        </Block>
      )}
    </>
  );
};
