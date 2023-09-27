import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newAnecdote) =>
  axios.post(baseUrl, { ...newAnecdote, votes: 0 }).then((res) => res.data);

export const updateAnecdote = (modifyAnecdote) =>
  axios
    .put(`${baseUrl}/${modifyAnecdote.id}`, {
      ...modifyAnecdote,
      votes: modifyAnecdote.votes + 1,
    })
    .then((res) => res.data);
