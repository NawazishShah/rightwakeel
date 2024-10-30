// project-imports
import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import {  LawyerFilter, LawyerStateProps } from 'types/lawyer';

// ==============================|| SLICE - LAWYERS ||============================== //

const initialState: LawyerStateProps = {
  error: null,
  lawyers: [],
  lawyer: null,
  specialties: [],
  relatedLawyers: [], 
  reviews: [] ,
  loading: false
};

const slice = createSlice({
  name: 'lawyer',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getLawyersSuccess(state, action) {
      state.lawyers = action.payload;
    },
    filterLawyersSuccess(state, action) {
      state.lawyers = action.payload;
    },
    getLawyerSuccess(state, action) {
      state.lawyer = action.payload;
    },
    getSpecialtiesSuccess(state, action) {
      state.specialties = action.payload;
    },
    setLawyerData(state, action) {
      state.lawyer = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export function getLawyers() {
  return async () => {
    try {
      const response = await axios.get('/api/lawyers/list');
      dispatch(slice.actions.getLawyersSuccess(response.data.lawyers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterLawyers(filter: LawyerFilter) {
  return async () => {
    try {
      const response = await axios.post('/api/lawyers/filter', { filter });
      dispatch(slice.actions.filterLawyersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLawyer(id: string | undefined) {
  return async () => {
    try {
      const response = await axios.post('/api/lawyer/details', { id });
      dispatch(slice.actions.getLawyerSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSpecialties() {
  return async () => {
    try {
      const response = await axios.get('/api/lawyers/specialties');
      dispatch(slice.actions.getSpecialtiesSuccess(response.data.specialties));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getLawyerById(id: string) {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`/api/lawyers/${id}`);
      dispatch(slice.actions.setLawyerData(response.data)); // Set lawyer data on success
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateLawyerProfile(id: string, data: any) {
  return async (dispatch: any) => {
    try {
      const response = await axios.put(`/api/lawyers/updateProfile/${id}`, data);
      dispatch(slice.actions.setLawyerData(response.data)); // Update data in the store if needed
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

