import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const AnecdoteList = ({ anecdotes, handleVote }) => {
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const LoadingIndicator = () => {
  return <div>Loading data...</div>;
};

const ErrorIndicator = () => {
  return (
    <div>
      Unexpected error occurred while fetching anecdotes. Please, try again.
    </div>
  );
};

const App = () => {
  const handleVote = (anecdote) => {
    console.log(anecdote);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () =>
      axios.get("http://localhost:3001/anecdotes").then((res) => res.data),
  });

  const anecdotes = data;

  return (
    <div>
      {isLoading && <LoadingIndicator />}
      {isError && <ErrorIndicator />}
      {data && (
        <>
          <h3>Anecdote app</h3>
          <Notification />
          <AnecdoteForm />
          <AnecdoteList anecdotes={data} handleVote={handleVote} />
        </>
      )}
    </div>
  );
};

export default App;
