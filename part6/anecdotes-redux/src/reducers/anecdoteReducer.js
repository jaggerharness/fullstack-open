import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import { handleNotification } from "../reducers/notificationReducer";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload.id ? { ...action.payload } : anecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { updateAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch(appendAnecdote(newAnecdote));
    dispatch(handleNotification("Anecdote added successfully.", 5));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.incrementAnecdoteVote(
      anecdote
    );
    dispatch(updateAnecdote(updatedAnecdote));
    dispatch(handleNotification("Vote recorded.", 5));
  };
};

export default anecdoteSlice.reducer;
