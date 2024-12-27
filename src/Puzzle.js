import React, { useState, useEffect } from "react";
import "./Puzzle.css";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Puzzle = () => {
  const [tiles, setTiles] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [targetTime, setTargetTime] = useState(null);
  const [autoSolve, setAutoSolve] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initialTiles = [...Array(15).keys()].map((x) => x + 1);
    setTiles(shuffleArray([...initialTiles, null]));
  }, []);

  useEffect(() => {
    let interval;
    if (isStarted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
        if (targetTime && timer + 1 >= targetTime && !checkWin()) {
          setIsStarted(false);
          setMessage("Час вийшов. Ви програли!");
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, timer, targetTime]);

  const moveTile = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [emptyIndex - 4, emptyIndex + 4, emptyIndex - 1, emptyIndex + 1];
    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  const checkWin = () => {
    const winningOrder = [...Array(15).keys()].map((x) => x + 1).concat(null);
    return JSON.stringify(tiles) === JSON.stringify(winningOrder);
  };

  const handleAutoSolve = () => {
    setAutoSolve(true);
    setTimeout(() => {
      const winningOrder = [...Array(15).keys()].map((x) => x + 1).concat(null);
      setTiles(winningOrder);
      setAutoSolve(false);
      setMessage("Фішки автоматично зібрано!");
    }, 2000);
  };

  const handleStartGame = () => {
    setIsStarted(true);
    setTimer(0);
    setMessage("");
    if (!targetTime) setTargetTime(null);
  };

  const handleWin = () => {
    if (checkWin()) {
      setIsStarted(false);
      setMessage("Вітаємо! Ви виграли!");
    }
  };

  useEffect(() => {
    if (checkWin() && isStarted) {
      handleWin();
    }
  }, [tiles, isStarted]);

  return (
    <div className="puzzle-container">
      <h2>Гра «П’ятнашки»</h2>
      <div className="controls">
        <button
          className={`start-button ${isStarted ? "stop" : "start"}`}
          onClick={handleStartGame}
          disabled={isStarted}
        >
          {isStarted ? "Зупинено" : "Розпочати"}
        </button>
        <input
          type="number"
          placeholder="Час у секундах"
          onChange={(e) => setTargetTime(Number(e.target.value))}
          disabled={isStarted}
          className="time-input"
        />
        <button
          className="auto-solve-button"
          onClick={handleAutoSolve}
          disabled={!isStarted || autoSolve}
        >
          Автоматичне збирання
        </button>
      </div>
      <p className="timer">Час: {timer} секунд</p>
      <div className="grid">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile === null ? "empty" : ""}`}
            onClick={() => moveTile(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      <p className="message">{message}</p>
    </div>
  );
};

export default Puzzle;
