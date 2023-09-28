import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { updateAnecdote } from "../services/requests";

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient();
  const waitTimeMilli = 5000;

  const dispatch = useNotificationDispatch();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
  });

  const handleVote = (anecdote) => {
    dispatch({ type: "SHOW", payload: "Vote recorded" });
    setTimeout(() => {
      dispatch({ type: "HIDE" });
    }, waitTimeMilli);
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
