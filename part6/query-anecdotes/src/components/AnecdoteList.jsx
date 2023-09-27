import { useContext } from "react";
import { updateAnecdote } from "../services/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NotificationContext from "../NotificationContext";

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient();

  const [notification, dispatch] = useContext(NotificationContext);

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
  });

  const handleVote = (anecdote) => {
    dispatch({ type: "SHOW", payload: "Vote recorded" });
    setTimeout(() => {
      dispatch({ type: "HIDE" });
    }, 3000);
    updateAnecdoteMutation.mutate(anecdote);
  };

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

export default AnecdoteList;
