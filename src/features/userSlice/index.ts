import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const userSlice = createSlice({
  name: 'user',
  initialState: {userDetail: null},
  reducers: {
    setUser: (state, action) => {
      const {user} = action.payload.data
      state.userDetail = user
    }
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer

export const selectCurrentUser = (state: RootState): null | string => state.user.userDetail