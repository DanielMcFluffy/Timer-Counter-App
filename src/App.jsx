import { animated, useSpring } from "@react-spring/web";
import { useState } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './App.css'
import TimerDisplay from "./TimerDisplay";


function App() {

  //logic for timer
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleStart = () => {
    if (!intervalId) {
      const newIntervalId = setInterval(() => {
        setTimer(prev => prev + 100);
      }, 100);
      setIntervalId(newIntervalId);
    }
  };

  const handlePause = () => {
    clearInterval(intervalId)
    setIntervalId(null);
  };

  const handleReset = () => {
    clearInterval(intervalId);
    setIntervalId(null)
    setTimer(0);
  };

  //logic for counter
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  }

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  }

  const reset = () => {
    setCount(0);
  }

  //usespring for card bounciness
  const [props, set] = useSpring(() => ({
    transform: `scale(1)`,
    from: {
      transform: `scale(0.5)`,
    },
    config: {
      tension: 400,
      mass: 2,
    }
  }))
  //activate while hover
  const updateHover = hovering => ({
    transform: `scale(${hovering ? 1.1 : 1})`,
  })

  //toggle for counter to timer
  const [toggle, setToggle] = useState(false);

  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }} >


        <animated.div style={props}
          onMouseEnter={() => set(updateHover(true))}
          onMouseLeave={() => set(updateHover(false))}
        >
          <Card style={{ width: '18rem', position: 'relative', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>

            <Card.Body style={{ display: 'flex', justifyContent: 'flex-end' }} >
              <Button
                onClick={() => { setToggle(!toggle) }} >
                {toggle ? <i className="bi bi-stopwatch"></i> : <i className="bi bi-file-diff"></i>}
              </Button>
            </Card.Body>
            {toggle ? (
              <Card.Body  >
                <Card.Title>Counter App</Card.Title>

                <Card.Text >
                  <p>{count}</p>
                </Card.Text>

                <Button className="mx-3" onClick={increment} variant="primary">Add</Button>

                <Button onClick={decrement} variant="primary">Minus</Button>

                <Button className="mx-3" onClick={reset} variant="primary">Reset</Button>

              </Card.Body>
            ) : (<Card.Body>
              <Card.Title>Timer App</Card.Title>
              <Card.Text>
                <TimerDisplay timer={timer} />
              </Card.Text>
              <Button className="mx-3" onClick={handleStart}>Start</Button>
              <Button onClick={handlePause}>Pause</Button>
              <Button className="mx-3" onClick={handleReset}>Reset</Button>
            </Card.Body>)}
          </Card>
        </animated.div>
      </div>

    </>
  );
}

export default App;
