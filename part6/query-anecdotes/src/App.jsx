import { useQuery } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import AnecdoteList from "./components/AnecdoteList";
import ErrorIndicator from "./components/ErrorIndicator";
import LoadingIndicator from "./components/LoadingIndicator";
import { getAnecdotes } from "./services/requests";

const App = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  return (
    <div>
      {isLoading && <LoadingIndicator />}
      {isError && <ErrorIndicator />}
      {data && (
        <>
          <h3>Anecdote app</h3>
          <Notification />
          <AnecdoteForm />
          <AnecdoteList anecdotes={data} />
        </>
      )}
    </div>
  );
};

export default App;
