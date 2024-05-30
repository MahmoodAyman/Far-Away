import { useState } from "react";
export default function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function stepDec() {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  }
  function stepInc() {
    setStep((s) => s + 1);
  }
  function countDec() {
    setCount((c) => c - (step > 0 ? step : 1));
  }
  function countInc() {
    setCount((c) => c + (step > 0 ? step : 1));
  }

  return (
    <div style={{ textAlign: "center", marginBottom: "10px" }}>
      <div className="step" style={{ margin: "10px", padding: "14px" }}>
        <button onClick={stepDec}>-</button>
        <span>Step : {step}</span>
        <button onClick={stepInc}>+</button>
      </div>
      <div className="count">
        <button onClick={countDec}>-</button>
        <span>Count : {count}</span>
        <button onClick={countInc}>+</button>
      </div>
      <Datee Count={count} />
    </div>
  );
}
function Datee(props) {
  let date = new Date("May 29 2024");
  date.setDate(date.getDate() + props.Count);
  const style = {
    fontWeight: "bold",
    margin: "5px",
    border: "5px solid #000",
    borderRadius: "10px",
    padding: "15px",
    display: "block",
  };

  if (props.Count > 0) {
    return (
      <span style={style}>
        {`${Math.abs(props.Count)} days from now will be ${date.getDate()}`}{" "}
      </span>
    );
  }
  return <span style={style}></span>;
}
