import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const [points, setPoints] = useState(Array(anecdotes.length - 1).fill(0));

  const [mostVotesIndex, setMostVotesIndex] = useState(0);

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length - 1)));
  };

  const handleVote = () => {
    const points_copy = [...points];
    points_copy[selected] += 1;
    setMostVotesIndex(points_copy.indexOf(Math.max(...points_copy)));
    setPoints(points_copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>Has {points[selected]} votes</p>
      <div>
        <Button text="vote" handleClick={handleVote} />
        <Button text="next anecdote" handleClick={handleNextClick} />
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotesIndex]}
    </div>
  );
};

export default App;
