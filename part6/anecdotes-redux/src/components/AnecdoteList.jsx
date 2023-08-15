import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer';
import Filter from './Filter';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes;
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
