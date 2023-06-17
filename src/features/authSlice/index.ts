import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import Cookies from 'universal-cookie';
import { IGetProfileRes } from '../../entity/UserAuth';

const cookie = new Cookies();

interface StateProps {
  user: IGetProfileRes | null;
  modalToggle: boolean;
  isLoggedIn: boolean;
}

const initialState: StateProps = {
  user: null,
  modalToggle: false,
  isLoggedIn: cookie.get('is_user_logged_in') || false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logOut: (state) => {
      state.user = null
      state.isLoggedIn = false
    },
    setModalToggle: (state, action) => {
      state.modalToggle = action.payload
    }
  },
})

export const {setUser, logOut, setIsLoggedIn, setModalToggle } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState): null | IGetProfileRes => state.auth.user
export const selectIsLoggedIn = (state: RootState): boolean => state.auth.isLoggedIn
export const selectModalToggle = (state: RootState): null | boolean => state.auth.modalToggle