import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    unsetNotification() {
      return '';
    },
  },
});

export const { setNotification, unsetNotification } = notificationSlice.actions;

export const handleNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(unsetNotification());
    }, time * 1000);
  }
}

export default notificationSlice.reducer;
