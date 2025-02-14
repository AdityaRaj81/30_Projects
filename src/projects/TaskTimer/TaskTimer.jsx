import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import HeaderProject from '../../components/layouts/ProjectHeader';
import Footer from '../../components/layouts/Footer';
import './TaskTimer.css';

const TaskTimer = () => {
  // Load tasks from localStorage or initialize an empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('timerTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [activeTask, setActiveTask] = useState(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  // Save tasks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('timerTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to update total time for tasks
  const updateTaskTime = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, totalTime: task.totalTime + 1 } : task
      )
    );
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isRunning && activeTask) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        updateTaskTime(activeTask.id);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, activeTask, updateTaskTime]);

  // Format time for display
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    const newTask = {
      id: uuidv4(),
      name: newTaskName,
      totalTime: 0,
      sessions: []
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskName('');
  };

  // Start task
  const startTask = (task) => {
    if (activeTask && activeTask.id !== task.id) {
      stopTask();
    }

    setActiveTask(task);
    setIsRunning(true);
    setTime(0);

    const newSession = {
      id: uuidv4(),
      startTime: new Date().toISOString(),
      duration: 0
    };

    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, sessions: [...t.sessions, newSession] } : t
      )
    );
  };

  // Pause task
  const pauseTask = () => {
    setIsRunning(false);
  };

  // Resume task
  const resumeTask = () => {
    setIsRunning(true);
  };

  // Stop task and record time
  const stopTask = () => {
    if (!activeTask) return;

    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === activeTask.id
          ? {
              ...t,
              totalTime: t.totalTime + time,
              sessions: t.sessions.map((session, index) =>
                index === t.sessions.length - 1
                  ? { ...session, duration: time }
                  : session
              )
            }
          : t
      )
    );

    setActiveTask(null);
    setIsRunning(false);
    setTime(0);
  };

  // Delete task
  const deleteTask = (taskId) => {
    if (activeTask && activeTask.id === taskId) {
      stopTask();
    }
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Calculate total task time
  const calculateTotalTime = (task) => {
    return task.sessions.reduce((total, session) => total + session.duration, 0);
  };

  return (
    <div className="app">
      <HeaderProject title="Task Timer" description="Track time spent on different tasks with detailed statistics" />
      <main className="timer-main">
        <div className="timer-container">
          {/* Timer Display */}
          <div className="active-timer">
            <div className="timer-display">
              <div className="time">{formatTime(time)}</div>
              {activeTask && <div className="active-task-name">{activeTask.name}</div>}
            </div>
            <div className="timer-controls">
              {activeTask ? (
                <>
                  {isRunning ? (
                    <button onClick={pauseTask} className="control-button pause">
                      <FontAwesomeIcon icon={faPause} />
                    </button>
                  ) : (
                    <button onClick={resumeTask} className="control-button play">
                      <FontAwesomeIcon icon={faPlay} />
                    </button>
                  )}
                  <button onClick={stopTask} className="control-button stop">
                    <FontAwesomeIcon icon={faStop} />
                  </button>
                </>
              ) : (
                <p className="no-active-task">Select a task to start timing</p>
              )}
            </div>
          </div>

          {/* Add Task Form */}
          <form onSubmit={addTask} className="add-task-form">
            <input
              type="text"
              className="task-input"
              placeholder="Enter task name"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <button type="submit" className="add-button">
              <FontAwesomeIcon icon={faPlus} /> Add Task
            </button>
          </form>

          {/* Task List */}
          <div className="tasks-list">
            {tasks.map((task) => (
              <div className="task-item" key={task.id}>
                <div className="task-info">
                  <div className="task-name">{task.name}</div>
                  <div className="task-time">{formatTime(calculateTotalTime(task))}</div>
                </div>
                <div className="task-actions">
                  <button onClick={() => startTask(task)} className="task-button start">
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="task-button delete">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TaskTimer;
