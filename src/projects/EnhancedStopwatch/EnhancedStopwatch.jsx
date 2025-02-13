import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Pause, Play, RotateCcw, Flag, Download } from 'lucide-react';

const EnhancedStopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} py-12 px-4`}>
      <Card className={`max-w-md mx-auto ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} shadow-xl rounded-xl p-6`}>
        <div className="text-center">
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </Button>
          </div>
          
          <div className="flex items-center justify-center mb-8">
            <Timer className="w-8 h-8 mr-2" />
            <h1 className={`text-4xl md:text-6xl font-mono font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {formatTime(time)}
            </h1>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <Button
              onClick={handleStartStop}
              className={`rounded-full ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button
              onClick={handleReset}
              className="rounded-full bg-gray-500 hover:bg-gray-600"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button
              onClick={handleLap}
              className="rounded-full bg-blue-500 hover:bg-blue-600"
              disabled={!isRunning}
            >
              <Flag className="w-5 h-5" />
            </Button>
          </div>

          {laps.length > 0 && (
            <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h2 className="text-lg font-semibold mb-3">Lap Times</h2>
              <div className="max-h-48 overflow-y-auto">
                {laps.map((lapTime, index) => (
                  <div
                    key={index}
                    className={`flex justify-between py-2 px-4 rounded-lg mb-2 ${
                      theme === 'dark' ? 'bg-gray-600' : 'bg-white'
                    }`}
                  >
                    <span>Lap {laps.length - index}</span>
                    <span className="font-mono">{formatTime(lapTime)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EnhancedStopwatch;