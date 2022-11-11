import { createSlice } from '@reduxjs/toolkit'
import { filters } from '../components/Topbar'

const initialState = filters[0].toLowerCase().split(' ')[0]

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterSelected(state, action) {
      return (state = action.payload)
    },
  },
})

export const { filterSelected } = filterSlice.actions

export default filterSlice.reducer
