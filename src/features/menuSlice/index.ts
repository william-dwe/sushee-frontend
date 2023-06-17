import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { IMenuQuery } from '../../entity/Menus'

const menuFilterSlice = createSlice({
  name: 'menuFilter',
  initialState: {
      filterQuery: {
        s: "",
        sort: "asc",
        sortBy: "id",
        filterByCategory: "meals,drinks,appetizers",
        limit: 8,
        page: 1,
      }
  },
  reducers: {
    setFilterQuery: (state, action) => {
      state.filterQuery = action.payload
    }
  },
})

export const { setFilterQuery } = menuFilterSlice.actions

export default menuFilterSlice.reducer

export const selectFilterQuery = (state: RootState): IMenuQuery => state.menu.filterQuery