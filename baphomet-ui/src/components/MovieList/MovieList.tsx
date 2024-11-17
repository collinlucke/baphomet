import { Button, List, Search } from '@collinlucke/phantomartist';
import { MovieListItem } from './MovieListItem';
import { ChangeEvent, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScreenSize } from '../../hooks/useScreenSize';

type Movie = {
  id: string;
  title: string;
  releaseDate?: string;
  rated?: string;
  poster?: string;
};

type MovieData = {
  movieData: {
    allMovies: Movie[];
  };
  searchTerm?: string;
  resultsCount?: number;

  onSearch?: React.FormEventHandler<HTMLFormElement>;
  setSearchTerm?: (e: ChangeEvent<HTMLInputElement>) => void;
  openDeleteModal?: ({ id, title }: { id: string; title: string }) => void;
};

export const MovieList: React.FC<MovieData> = ({
  movieData,
  searchTerm,
  onSearch,
  setSearchTerm,
  openDeleteModal
}) => {
  const navigate = useNavigate();
  const screenSize = useScreenSize();

  const onSearchHandler: FormEventHandler<HTMLFormElement> = e => {
    onSearch?.(e);
  };

  const setSearchTermHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm?.(e);
  };

  const navigateToArena = () => {
    navigate('/arena');
  };

  return (
    <List>
      <Search
        onSearch={onSearchHandler}
        searchTerm={searchTerm}
        searchLabel="Search Movies"
        setSearchTerm={setSearchTermHandler}
        resultsCount={movieData.allMovies.length}
        buttonSize={screenSize}
        inputSize={screenSize}
        useSearchButton={false}
      />
      {movieData.allMovies.length ? (
        movieData.allMovies.map(mov => (
          <MovieListItem
            mov={mov}
            key={mov.id}
            openDeleteModal={openDeleteModal || (() => {})}
          />
        ))
      ) : (
        <div css={[baphStyles.noResults]}>
          <h2>No Movies Match Your Search</h2>
          <div>Maybe you should go make one...</div>
        </div>
      )}
      <Button
        size={screenSize}
        onClick={navigateToArena}
        className={baphStyles}
      >
        Fight!
      </Button>
    </List>
  );
};

const baphStyles = {
  noResults: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    marginBottom: '30px',
    marginTop: '30px'
  },
  button: {
    alignSelf: 'end',
    display: 'flex',
    flexDirection: 'column' as 'column'
  }
};
