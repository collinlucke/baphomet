import {
  Form,
  FormTextInput,
  TwoColumn,
  // ButtonGroup,
  FormTextArea,
  Button,
  Header,
  Image,
  ButtonGroup
} from '@collinlucke/phantomartist';
import { useNavigate } from 'react-router-dom';

type MovieEditorFormProps = {
  movie: {
    id: string;
    poster?: string;
    releaseDate?: string;
    rated?: string;
    title?: string;
    fullplot?: string;
  };
  clean?: boolean;
  readonly?: boolean;

  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTextArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const MovieEditorForm: React.FC<MovieEditorFormProps> = ({
  movie,
  readonly,
  // clean,
  onSubmit,
  onChange,
  onChangeTextArea
}) => {
  const navigate = useNavigate();
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit?.(e);
  };

  const onChangeHandlerText = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const onChangeHandlerTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChangeTextArea?.(e);
  };

  const cancelHandler = () => {
    if (movie.id) {
      navigate(`/view/${movie.id}`);
    } else {
      navigate('/movielist');
    }
  };

  const navToEdit = () => {
    navigate(`/edit/${movie.id}`);
  };

  const leftContent = (
    <>
      {!readonly && (
        <FormTextInput
          readonly={readonly}
          label="Title"
          labelPos="above"
          name="title"
          value={movie.title}
          onChange={onChangeHandlerText}
        />
      )}
      {movie.poster && (
        <Image src={movie.poster} className={{ img: baphStyles.img }} />
      )}
      {!readonly && (
        <FormTextArea
          readonly={readonly}
          name="poster"
          value={movie.poster || ''}
          onChange={onChangeHandlerTextArea}
          autoResize
          label="Poster URL"
          labelPos="above"
        />
      )}
    </>
  );
  const rightContent = (
    <>
      <FormTextArea
        readonly={readonly}
        label="Plot"
        labelPos="above"
        name="fullplot"
        value={movie.fullplot}
        onChange={onChangeHandlerTextArea}
        autoResize
      />
      <FormTextInput
        readonly={readonly}
        label="Rated"
        labelPos="above"
        name="rated"
        value={movie.rated}
        onChange={onChangeHandlerText}
      />
      {/* Need to figure out how to edit dates */}
      <FormTextInput
        type="date"
        readonly={readonly}
        label="Release Date"
        labelPos="above"
        name="releaseDate"
        value={movie.releaseDate}
        onChange={onChangeHandlerText}
      />
      {!readonly && (
        <ButtonGroup>
          <Button type="submit" kind="primary">
            Save
          </Button>
          <Button onClick={cancelHandler} kind="secondary">
            Cancel
          </Button>
        </ButtonGroup>
      )}
    </>
  );

  return (
    <Form onSubmit={onSubmitHandler}>
      <Header className={{ header: baphStyles.header }}>
        <>
          <h1 css={[baphStyles.h1]}>{movie.title || '-Add title-'}</h1>
          {readonly && <Button onClick={navToEdit}>Edit Movie</Button>}
        </>
      </Header>
      <TwoColumn left={leftContent} right={rightContent} />
    </Form>
  );
};

const baphStyles = {
  header: {
    justifyContent: 'space-between',
    height: 'auto',
    alignItems: 'end'
  },
  h1: {
    maxWidth: '80%',
    justifySelf: 'start'
  },
  img: {
    marginBottom: '20px',
    width: '100%'
  }
};
