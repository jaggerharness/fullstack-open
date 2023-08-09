import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import Filter from './Filter';
import {
  setNotification,
  unsetNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes;
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  const vote = (id) => {
    dispatch(voteAnecdote(id));
    dispatch(setNotification('Vote recorded.'));
    setTimeout(() => {
      dispatch(unsetNotification());
    }, 5000);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes
        .slice()
        .sort(
          (firstAnecdote, secondAnecdote) =>
            secondAnecdote.votes - firstAnecdote.votes
        )
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
