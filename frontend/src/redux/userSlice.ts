// import { createSlice } from '@reduxjs/toolkit';
// import { useNavigate } from 'react-router-dom';
// import { useLoginMutation, useRegisterMutation } from '../components/utils/api';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     token: null,
//     isAdmin: false,
//   },
//   reducers: {
//     setCredentials: (state, action) => {
//       state.token = action.payload;
//     },
//     setIsAdmin: (state, action) => {
//       state.isAdmin = action.payload;
//     },
//   },
// });

// export const { setCredentials, setIsAdmin } = userSlice.actions;

// export const register = (userData) => async (dispatch) => {
//   const [registerResponse, registerError] = useRegisterMutation();
//   try {
//     const token = await registerResponse(userData).unwrap();
//     dispatch(setCredentials(token));
//     const navigate = useNavigate();
//     const isAdmin = token.role === 'admin'
    
//     if (isAdmin) {
//       navigate('/dashboard');
//     } else {
//       navigate('/user-dashboard');
//     }

//   } catch (error) {
//     console.error(error);
//   }
// };

// export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../components/utils/api';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    isAdmin: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setCredentials, setIsAdmin } = userSlice.actions;

export const register = (userData) => async (dispatch) => {
  const [registerResponse, registerError] = useRegisterMutation();
  try {
    const token = await registerResponse(userData).unwrap();
    dispatch(setCredentials(token));
    const navigate = useNavigate();
    const isAdmin = token.role === 'admin'
    
    if (isAdmin) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  } catch (error) {
    console.error(error);
  }
};
export default userSlice.reducer;