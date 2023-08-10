import { useDispatch } from 'react-redux';
import anecdoteService from '../services/anecdotes';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  unsetNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification('Anecdote added successfully.'));
    setTimeout(() => {
      dispatch(unsetNotification());
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
