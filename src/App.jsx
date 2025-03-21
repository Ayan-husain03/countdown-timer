import React, { useEffect, useState } from "react";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  let intervalId = null;

  const tick = () => {
    setTime((prevTime) => {
      const { hours, minutes, seconds } = prevTime;

      if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(intervalId);
        setIsRunning(false);
        alert("Time's up");
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      if (seconds > 0) {
        return { ...prevTime, seconds: seconds - 1 };
      } else if (minutes > 0) {
        return { hours, minutes: minutes - 1, seconds: 59 };
      } else {
        return { hours: hours - 1, minutes: 59, seconds: 59 };
      }
    });
  };

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalId = setInterval(tick, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRunning, isPaused]);

  // * reset function to reset the timer and set the time to 0
  const reset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };
  // * stop function to pause the timer

  const stop = () => {
    setIsPaused(true);
  };
   // * resume  function to resume the timer
  const resume = () => {
    setIsPaused(false);
  };

  return (
    <div className="w-full h-screen bg-slate-800 p-1">
      <div className="max-w-xl bg-slate-900 shadow-2xl p-10 rounded-lg mx-auto mt-20">
        <h1 className="text-center text-white font-semibold text-3xl">Countdown Timer</h1>
        {!isRunning && (
          <div className="text-white grid grid-cols-4 gap-2 mt-5">
            {["hours", "minutes", "seconds"].map((unit) => (
              <input
                key={unit}
                type="number"
                className="border p-2 rounded-xl text-2xl text-center"
                placeholder={unit.toUpperCase()}
                name={unit}
                value={time[unit]}
                onChange={(e) =>
                  setTime({
                    ...time,
                    [unit]: Math.max(0, parseInt(e.target.value) || 0),
                  })
                }
              />
            ))}
            <button className="bg-green-600 px-5 rounded-xl text-2xl cursor-pointer" onClick={() => setIsRunning(true)}>
              Start
            </button>
          </div>
        )}
        {isRunning && (
          <div className="text-white grid grid-cols-5 gap-2 mt-5">
            {[time.hours, time.minutes, time.seconds].map((value, index) => (
              <div key={index} className="border p-2 rounded-xl text-2xl text-center">
                {value < 10 ? `0${value}` : value}
              </div>
            ))}
            {isPaused ? (
              <button className="bg-green-600 px-5 rounded-xl text-xl cursor-pointer" onClick={resume}>
                Resume
              </button>
            ) : (
              <button className="bg-red-600 px-5 rounded-xl text-2xl cursor-pointer" onClick={stop}>
                Stop
              </button>
            )}
            <button className="bg-blue-600 px-5 rounded-xl text-2xl cursor-pointer" onClick={reset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
