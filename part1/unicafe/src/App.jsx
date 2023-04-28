import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => (
  <>
    <h1>statistics</h1>
    <div>good {good}</div>
    <div>neutral {neutral}</div>
    <div>bad {bad}</div>
    <div>all {all}</div>
    <div>average {average}</div>
    <div>positive {positive}%</div>
  </>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const updateStatistics = ({ updatedGood, updatedNeutral, updatedBad }) => {
    const updatedTotal = updatedGood + updatedNeutral + updatedBad;
    const updatedAverage = updatedTotal === 0 ? 0 : (updatedGood - updatedBad) / updatedTotal;
    const updatedPositive = updatedTotal === 0 ? 0 : updatedGood / updatedTotal;
    setAll(updatedTotal);
    setAverage(updatedAverage);
    setPositive(updatedPositive * 100);
  };

  // handle button click
  const recordFeedback = (feedback) => {
    let updatedGood = good;
    let updatedNeutral = neutral;
    let updatedBad = bad;

    if (feedback === "good") {
      updatedGood += 1;
      setGood(updatedGood);
    } else if (feedback === "neutral") {
      updatedNeutral += 1;
      setNeutral(updatedNeutral);
    } else {
      updatedBad += 1;
      setBad(updatedBad);
    }

    const feedbackObj = {
      updatedGood: updatedGood,
      updatedNeutral: updatedNeutral,
      updatedBad: updatedBad,
    };

    updateStatistics({ ...feedbackObj });
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => recordFeedback("good")} text="good"></Button>
      <Button
        handleClick={() => recordFeedback("neutral")}
        text="neutral"
      ></Button>
      <Button handleClick={() => recordFeedback("bad")} text="bad"></Button>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
