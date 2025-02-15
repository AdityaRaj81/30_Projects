import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedo, faCog } from '@fortawesome/free-solid-svg-icons';
import HeaderProject from '../../components/layouts/ProjectHeader';
import Footer from '../../components/layouts/Footer';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [settings, setSettings] = useState({
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    cyclesBeforeLongBreak: 4
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    const notification = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
    notification.play();

    if (!isBreak) {
      const newCycles = cycles + 1;
      setCycles(newCycles);
      
      if (newCycles % settings.cyclesBeforeLongBreak === 0) {
        setTimeLeft(settings.longBreakDuration * 60);
      } else {
        setTimeLeft(settings.breakDuration * 60);
      }
    } else {
      setTimeLeft(settings.workDuration * 60);
    }
    setIsBreak(!isBreak);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(settings.workDuration * 60);
    setIsRunning(false);
    setIsBreak(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const updateSettings = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  const calculateProgress = () => {
    const totalSeconds = isBreak 
      ? (settings.breakDuration * 60)
      : (settings.workDuration * 60);
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  return (
    <div className="app">
      <HeaderProject 
        title="Pomodoro Timer" 
        description="Stay focused and productive with timed work sessions"
      />
      <main className="pomodoro-main">
        <div className="pomodoro-container">
          <div className="timer-display">
            <div className="progress-ring">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#ddd"
                  strokeWidth="5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={isBreak ? "#4CAF50" : "#f44336"}
                  strokeWidth="5"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - calculateProgress() / 100)}`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="timer-text">
                <div className="time">{formatTime(timeLeft)}</div>
                <div className="phase">{isBreak ? 'Break' : 'Work'}</div>
              </div>
            </div>
          </div>

          <div className="controls">
            <button onClick={toggleTimer} className="control-button">
              <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
            </button>
            <button onClick={resetTimer} className="control-button">
              <FontAwesomeIcon icon={faRedo} />
            </button>
            <button onClick={() => setShowSettings(!showSettings)} className="control-button">
              <FontAwesomeIcon icon={faCog} />
            </button>
          </div>

          <div className="stats">
            <div className="stat">
              <span className="stat-label">Cycles</span>
              <span className="stat-value">{cycles}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Phase</span>
              <span className="stat-value">{isBreak ? 'Break' : 'Work'}</span>
            </div>
          </div>

          {showSettings && (
            <div className="settings">
              <h3>Settings</h3>
              <div className="setting-item">
                <label>Work Duration (minutes)</label>
                <input
                  type="number"
                  name="workDuration"
                  value={settings.workDuration}
                  onChange={updateSettings}
                  min="1"
                  max="60"
                />
              </div>
              <div className="setting-item">
                <label>Break Duration (minutes)</label>
                <input
                  type="number"
                  name="breakDuration"
                  value={settings.breakDuration}
                  onChange={updateSettings}
                  min="1"
                  max="30"
                />
              </div>
              <div className="setting-item">
                <label>Long Break Duration (minutes)</label>
                <input
                  type="number"
                  name="longBreakDuration"
                  value={settings.longBreakDuration}
                  onChange={updateSettings}
                  min="1"
                  max="60"
                />
              </div>
              <div className="setting-item">
                <label>Cycles Before Long Break</label>
                <input
                  type="number"
                  name="cyclesBeforeLongBreak"
                  value={settings.cyclesBeforeLongBreak}
                  onChange={updateSettings}
                  min="1"
                  max="10"
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PomodoroTimer;