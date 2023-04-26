import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleFeedback = (feedback) => {
    let total = 0;
    switch (feedback) {
      case "good":
        const updatedGood = good + 1;
        setGood(updatedGood);
        total = updatedGood + neutral + bad;
        setAll(total);
        break;
      case "neutral":
        const updatedNeutral = neutral + 1;
        setNeutral(updatedNeutral);
        total = good + updatedNeutral + bad;
        setAll(total);
        break;
      default:
        const updatedBad = bad + 1;
        setBad(updatedBad);
        total = good + neutral + updatedBad;
        setAll(total);
        break;
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => handleFeedback("good")}>good</button>
      <button onClick={() => handleFeedback("neutral")}>neutral</button>
      <button onClick={() => handleFeedback("bad")}>bad</button>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positive}%</div>
    </div>
  );
};

export default App;
