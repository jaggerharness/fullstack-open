import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const recordFeedback = (feedback) => {
    // init variables
    let updated_feedback = 0;
    let updated_total = 0;
    let updated_average = 0;
    let updated_positive = 0;

    if (feedback === "good") {
      // updated state
      updated_feedback = good + 1;
      updated_total = updated_feedback + neutral + bad;
      updated_average = (updated_feedback - bad) / updated_total;
      updated_positive = updated_feedback / updated_total;
      setGood(updated_feedback);
    } else if (feedback === "neutral") {
      // updated state
      updated_feedback = neutral + 1;
      updated_total = good + updated_feedback + bad;
      updated_average = (good - bad) / updated_total;
      updated_positive = good / updated_total;
      setNeutral(updated_feedback);
    } else {
      // updated state
      updated_feedback = bad + 1;
      updated_total = good + neutral + updated_feedback;
      updated_average = (good - updated_feedback) / updated_total;
      updated_positive = good / updated_total;
      setBad(updated_feedback);
    }

    setAll(updated_total);
    setAverage(updated_average);
    setPositive(updated_positive * 100);
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
