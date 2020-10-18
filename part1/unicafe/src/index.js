import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, clicked }) => {
  return <button onClick={clicked}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const sum = () => good + neutral + bad;
  const average = () => (good - bad) / sum();
  const percentagePos = () => (good * 100) / sum();

  if (good === 0 && neutral === 0 && bad === 0) return <p>No feedback given</p>;

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={sum()} />
        <Statistic text="average" value={average()} />
        <Statistic text="positive" value={percentagePos()} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" clicked={() => setGood(good + 1)} />
      <Button text="neutral" clicked={() => setNeutral(neutral + 1)} />
      <Button text="bad" clicked={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
