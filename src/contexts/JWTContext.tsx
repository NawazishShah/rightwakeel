import { createContext, useEffect, useReducer, ReactElement } from 'react';

// third-party
// import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project-imports
import Loader from 'components/Loader';
import axios from 'utils/axios';
import { KeyedObject } from 'types/root';
import { AuthProps, JWTContextType } from 'types/auth';

// const chance = new Chance();

// constant
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};
interface RegisterValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  company?: string; // Optional for clients
  experience?: string; // Optional for lawyers
  location?: string; // Optional for lawyers
  contact?: string; // Optional for lawyers
}

const verifyToken: (st: string) => boolean = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded: KeyedObject = jwtDecode(serviceToken);

  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null) => {
  console.log(serviceToken,'sericce tocken in context')
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const response = await axios.get('/api/account/me');
          const { user } = response.data;

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('/api/account/login', { email, password });
    const { token, user } = response.data;
    setSession(token);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };
  const lawyerLogin = async (email: string, password: string) => {
    const response = await axios.post('/api/lawyer/login', { email, password });
    const { serviceToken, user } = response.data;
    setSession(serviceToken); // Set the session
    dispatch({
      type: LOGIN,
      payload: { isLoggedIn: true, user },
    });
  };

  // const register = async (email: string, password: string, firstName: string, lastName: string) => {
  //   const id = chance.bb_pin();
  //   const response = await axios.post('/api/account/register', {
  //     id,
  //     email,
  //     password,
  //     firstName,
  //     lastName
  //   });
  //   let users = response.data;

  //   if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
  //     const localUsers = window.localStorage.getItem('users');
  //     users = [
  //       ...JSON.parse(localUsers!),
  //       {
  //         id,
  //         email,
  //         password,
  //         name: `${firstName} ${lastName}`
  //       }
  //     ];
  //   }

  //   window.localStorage.setItem('users', JSON.stringify(users));
  // };

  const register = async (type: 'client' | 'lawyer', values: RegisterValues) => {
    const endpoint = type === 'client' ? '/api/account/register' : '/api/lawyer/register';
    
    const response = await axios.post(endpoint, values);
    const { serviceToken, user } = response.data;
    
    setSession(serviceToken); // Set the session
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };

  
  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email: string) => {};

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, lawyerLogin, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
