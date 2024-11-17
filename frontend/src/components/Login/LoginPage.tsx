import { FormEvent, useState, SetStateAction } from 'react';
import { FormTextInput, Button, Form, Modal } from '@collinlucke/phantomartist';
import { LOGIN } from '../../api/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { ApolloError } from '@apollo/client';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [error, setError] = useState<
    SetStateAction<SetStateAction<undefined>> & { title: string }
  >();

  const [login] = useMutation(LOGIN, {
    onCompleted: data => {
      if (data.login.token) {
        localStorage.setItem('baphomet-token', data.login.token);
        const navigateTo = location?.state?.from?.pathname || './movielist';
        navigate(navigateTo, { replace: true });
        window.location.pathname = navigateTo;
      }
    },
    onError: error => {
      const titledError = { ...error, title: 'login' };

      setError(
        titledError as SetStateAction<SetStateAction<undefined>> &
          ApolloError & { title: string }
      );
    }
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { name, value } = target;
    setUserInput({ ...userInput, [name]: value });
  };

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      variables: { email: userInput.email, password: userInput.password }
    });
  };

  return (
    <Modal>
      <Form onSubmit={loginHandler}>
        {error?.title === 'login' && (
          <div css={baphStyles.errorMessage}>
            Ups. Looks like either the email address or password you provided
            are wrong. Like, very wrong.
          </div>
        )}
        <div>Need you to login real quick. thnx!</div>
        <FormTextInput
          label="Email"
          labelPos="above"
          name="email"
          value={userInput.email}
          onChange={onChangeHandler}
        />
        <FormTextInput
          label="Password"
          labelPos="above"
          name="password"
          value={userInput.password}
          onChange={onChangeHandler}
          type="password"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Modal>
  );
};

const baphStyles = {
  errorMessage: {
    color: 'red',
    marginBottom: '20px'
  }
};
