import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sumTo: '',
  sumFrom: '',
  dateTo: '',
  dateFrom: '',
  select: [],
  search: '',
  sort: 'date',
  direction: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAction(state, { payload: { key, value } }) {
      console.log(key, value);
      state[key] = value;
    },
    setSelected(state, action) {
      const label = action.payload;
      state.select.length = 0;
      state.select = label.filter((item) => item);
    },

    resetState() {
      return initialState;
    },
  },
});

export const { setAction, setSelected, resetState } = filterSlice.actions;
export default filterSlice.reducer;
