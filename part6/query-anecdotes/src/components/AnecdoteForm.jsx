import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { createAnecdote } from "../services/requests";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const waitTimeMilli = 5000;

  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatch({ type: "SHOW", payload: "New anecdote added successfully" });
      setTimeout(() => {
        dispatch({ type: "HIDE" });
      }, waitTimeMilli);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if(content.length < 5){
      dispatch({ type: "SHOW", payload: "Anecdote must have length of 5 of more." });
      setTimeout(() => {
        dispatch({ type: "HIDE" });
      }, waitTimeMilli);
      return;
    }
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
