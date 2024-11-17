import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Modal, Button } from '@collinlucke/phantomartist';
import { CSSObject } from '@emotion/react';
import { CustomErrorTypes } from '../../CustomTypes.types';
import { useError } from '../../contexts';
import { useRouteError } from 'react-router-dom';

type ErrorBoundaryTypes = {
  id?: string;
  children?: ReactNode;
  className?: {
    errorModal?: CSSObject;
  };
  error?: CustomErrorTypes;
  closeModal?: () => void;
};
export const ErrorBoundary: React.FC<ErrorBoundaryTypes> = ({
  className,
  children
}) => {
  const errorContent = {
    status: 'It dun broke',
    message: `This isn't looking very good for you.`
  };
  const routerError = useRouteError() as CustomErrorTypes;
  const { error: contextError, setError } = useError();
  const navigate = useNavigate();

  if (contextError?.networkError?.statusCode === 401) {
    errorContent.status = '401';
    errorContent.message = `Ha! No... Maybe login and try again.`;
  } else if (contextError?.networkError?.statusCode === 403) {
    errorContent.status = '403';
    errorContent.message = `Dude, don't try to come in here, I'll put my hand on your chest. Try logging in and then give it another go.`;
  } else if (routerError && routerError?.status === 404) {
    errorContent.status = '404';
    errorContent.message = `Uh-oh.... Whatever you're looking for, you ain't gonna find it here.`;
  } else if (contextError && contextError?.networkError?.statusCode === 500) {
    errorContent.status = '500';
    errorContent.message = `Look like someone out there doesn't want you to do this. Try logging in again.`;
  } else if (routerError?.name?.includes('ReferenceError')) {
    (errorContent.status = 'Whomp Whomp!'),
      (errorContent.message =
        'Looks like one of the devs pooped the bed. Try your action again or write a nasty letter to company.');
  } else if (routerError?.name === 'TypeError') {
    errorContent.status = 'TypeError';
    errorContent.message = `Something very wrong happened. You can try refreshing the page but it probably won't fix anything.`;
  }

  const goHomeHandler = () => {
    setError(undefined);
    navigate('movielist');
  };

  const goToLoginHandler = () => {
    setError(undefined);
    navigate('/login');
  };

  return (
    <Modal
      className={{
        modal: { ...className?.errorModal, ...baseStyle.errorModal }
      }}
    >
      {children ? (
        children
      ) : (
        <>
          <div>
            <h2>Error</h2>
            <p>
              <strong>Status:</strong> {errorContent?.status}
            </p>
            <p>
              <strong>Message:</strong> {errorContent?.message}
            </p>
          </div>

          <ButtonGroup>
            <Button onClick={goHomeHandler} kind="ghost">
              Go home
            </Button>
            <Button onClick={goToLoginHandler}>Log in</Button>
          </ButtonGroup>
        </>
      )}
    </Modal>
  );
};

const baseStyle = {
  errorModal: {
    backgroundColor: `rgba(255,255,255,.75)`
  }
};
