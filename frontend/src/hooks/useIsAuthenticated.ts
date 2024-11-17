import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useError } from '../contexts';
import {
  CustomErrorTypes,
  CustomNetworkErrorTypes
} from '../CustomTypes.types';
import { CHECK_AUTH } from '../api/queries';

type UseIsAuthenticatedTypes = {
  protectedRoute?: boolean;
};

export const useIsAuthenticated: React.FC<UseIsAuthenticatedTypes> = ({
  protectedRoute = false
} = {}) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setError } = useError();
  const baphToken = localStorage.getItem('baphomet-token');

  if (!baphToken) {
    navigate('/login');
  }

  useQuery(CHECK_AUTH, {
    variables: {
      token: baphToken
    },
    onCompleted: data => {
      if (data.checkAuth.isValid) {
        setIsAuthenticated(true);
      }
    },
    onError: error => {
      if (protectedRoute) {
        const titledError = {
          ...error,
          title: 'checkAuth',
          networkError: error.networkError as
            | CustomNetworkErrorTypes
            | undefined,
          cause: error.cause as CustomErrorTypes
        };
        setError(titledError);
      }

      setIsAuthenticated(false);
    }
  });

  return isAuthenticated;
};
