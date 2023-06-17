import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { IOrderQuery } from '../../entity/Order'

const orderFilterSlice = createSlice({
  name: 'orderFilter',
  initialState: {
      filterQuery: {
        search: "",
        sort: "asc",
        sortBy: "id",
        filterByStatus: "Payment",
        limit: 0,
        page: 1,
      }
  },
  reducers: {
    setFilterQuery: (state, action) => {
      state.filterQuery = action.payload
    }
  },
})

export const { setFilterQuery } = orderFilterSlice.actions

export default orderFilterSlice.reducer

export const selectOrderFilterQuery = (state: RootState): IOrderQuery => state.order.filterQuery