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
import { useLocation } from 'react-router';


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



const verifyToken = (serviceToken: string | null): { isValid: boolean; user?: KeyedObject } => {
  if (!serviceToken) {
    return { isValid: false };
  }

  const decoded: KeyedObject = jwtDecode(serviceToken);
  console.log(decoded,'services deconded tocken in context')
  
  // Including the role
  const isValid = decoded.exp > Date.now() / 1000;

  return { isValid, user: { ...decoded, role: decoded.role } }; // Include role
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


  const location = useLocation(); // Get the current path
const getRoleFromPath = () => {
  if (location.pathname === '/login' || location.pathname === '/register') return 'user';
  if (location.pathname === '/lawyer/login' || location.pathname === '/lawyer/register') return 'lawyer';
  if (location.pathname === '/admin/login' || location.pathname === '/admin/register') return 'admin';
  return 'user'; // Default role if no match
};
const role = getRoleFromPath(); // Get role based on the path
  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = localStorage.getItem('serviceToken');
        const { isValid, user } = verifyToken(serviceToken); // Now it's safe to pass
        if (isValid && user) {
          setSession(serviceToken);
          
          // Update user state with role
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user,
            }
          });
        } else {
          dispatch({ type: LOGOUT });
        }
      } catch (err) {
        console.error(err);
        dispatch({ type: LOGOUT });
      }
    };
  
    init();
  }, []);
  
  

  const login = async (email: string, password: string) => {
    const response = await axios.post('/api/account/login', { email, password, role: role });
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
    const { token, user } = response.data;
    setSession(token); // Set the session
    dispatch({
      type: LOGIN,
      payload: { isLoggedIn: true, user },
    });
  };


  const register = async ( values: RegisterValues)=> {
    
    const response = await axios.post('/api/account/register', { ...values, role: role });
    const { token, user } = response.data;
    
    setSession(token); // Set the session
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

  return (
    <JWTContext.Provider
      value={{ ...state, login, lawyerLogin, logout, register, resetPassword, updateProfile }}
    >
      {children}
    </JWTContext.Provider>
  );
  };

export default JWTContext;
