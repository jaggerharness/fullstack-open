import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/requests";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const [notification, dispatch] = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatch({ type: "SHOW", payload: "New anecdote added successfully" });
      setTimeout(() => {
        dispatch({ type: "HIDE" });
      }, 3000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
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
