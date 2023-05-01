import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{text === "positive" ? `${value}%` : `${value}`}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <>
        <h1>statistics</h1>
        <div>No feedback given.</div>
      </>
    );
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  );
};

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
    const updatedAverage =
      updatedTotal === 0 ? 0 : (updatedGood - updatedBad) / updatedTotal;
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
