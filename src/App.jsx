import { Routes, Route } from 'react-router-dom';
import MainHeader from './components/layouts/MainHeader';
import Footer from './components/layouts/Footer';
import ProjectCard from './components/ProjectCard/ProjectCard';
import { HashRouter } from "react-router-dom";


// Basic Apps
import TodoList from './projects/TodoList/TodoList';
import Calculator from './projects/Calculator/Calculator';
import Weather from './projects/Weather/Weather';
import NotesApp from './projects/NotesApp/NotesApp';
import PasswordGenerator from './projects/PasswordGenerator/PasswordGenerator';

// Games
// import MemoryGame from './projects/MemoryGame/MemoryGame';
// import TicTacToe from './projects/TicTacToe/TicTacToe';
// import SnakeGame from './projects/SnakeGame/SnakeGame';
// import QuizApp from './projects/QuizApp/QuizApp';
// import WordGame from './projects/WordGame/WordGame';

// // E-commerce
// import ShoppingCart from './projects/ShoppingCart/ShoppingCart';
// import ProductCatalog from './projects/ProductCatalog/ProductCatalog';
// import Wishlist from './projects/Wishlist/Wishlist';
// import OrderTracker from './projects/OrderTracker/OrderTracker';
// import ReviewSystem from './projects/ReviewSystem/ReviewSystem';

// // Social & Communication
// import ChatApp from './projects/ChatApp/ChatApp';
// import SocialFeed from './projects/SocialFeed/SocialFeed';
// import UserProfile from './projects/UserProfile/UserProfile';
// import PhotoGallery from './projects/PhotoGallery/PhotoGallery';
// import CommentSystem from './projects/CommentSystem/CommentSystem';

// // Productivity
// import PomodoroTimer from './projects/PomodoroTimer/PomodoroTimer';
// import KanbanBoard from './projects/KanbanBoard/KanbanBoard';
// import Calendar from './projects/Calendar/Calendar';
// import BudgetTracker from './projects/BudgetTracker/BudgetTracker';
import TaskTimer from './projects/TaskTimer/TaskTimer';

// // Development Tools
// import CodeEditor from './projects/CodeEditor/CodeEditor';
// import ColorPicker from './projects/ColorPicker/ColorPicker';
// import FormBuilder from './projects/FormBuilder/FormBuilder';
// import MarkdownEditor from './projects/MarkdownEditor/MarkdownEditor';
// import APITester from './projects/APITester/APITester';

import './App.css';

const projects = [
  // Basic Apps
  {
    title: "Todo List App",
    description: "A feature-rich task management application with drag-n-drop and categories.",
    demoUrl: "/todo",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "DnD", "LocalStorage"]
  },
  {
    title: "Calculator",
    description: "Scientific calculator with history and keyboard support.",
    demoUrl: "/calculator",
    imageUrl: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Math.js", "Keyboard Events"]
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather updates with 5-day forecast and location search.",
    demoUrl: "/weather",
    imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Weather API", "Geolocation"]
  },
  {
    title: "Notes App",
    description: "Markdown-supported note-taking app with categories and search.",
    demoUrl: "/notes",
    imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Markdown", "Search"]
  },
  {
    title: "Password Generator",
    description: "Secure password generator with customizable options.",
    demoUrl: "/password-generator",
    imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFzc3dvcmR8ZW58MHx8MHx8fDA%3D",
    technologies: ["React", "Crypto", "Clipboard"]
  },
  // Games
  {
    title: "Memory Card Game",
    description: "Test your memory with this fun card matching game.",
    demoUrl: "/memory-game",
    imageUrl: "https://images.unsplash.com/photo-1612078894399-c8f1fc81cbf0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Animation", "Game Logic"]
  },
  {
    title: "Tic Tac Toe",
    description: "Classic game with AI opponent and multiplayer mode.",
    demoUrl: "/tic-tac-toe",
    imageUrl: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "AI", "Multiplayer"]
  },

  {
    "title": "TaskTimer",
    "description": "A time-tracking web app to monitor tasks with detailed statistics and session tracking.",
    "demoUrl": "/tasktimer",
    "imageUrl": "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "JavaScript", "LocalStorage"]
}

  // Add more projects following the same pattern...
  // The complete list would include all 30 projects
];

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
          <div className="app">
            <MainHeader />
            <main className="main-content">
              <div className="projects-grid">
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>
            </main>
            <Footer />
          </div>
        } />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/notes" element={<NotesApp />} />
        <Route path="/password-generator" element={<PasswordGenerator />} />
        {/* <Route path="/memory-game" element={<MemoryGame />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/snake-game" element={<SnakeGame />} />
        <Route path="/quiz" element={<QuizApp />} />
        <Route path="/word-game" element={<WordGame />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/order-tracker" element={<OrderTracker />} />
        <Route path="/review-system" element={<ReviewSystem />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/social-feed" element={<SocialFeed />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/gallery" element={<PhotoGallery />} />
        <Route path="/comments" element={<CommentSystem />} />
        <Route path="/pomodoro" element={<PomodoroTimer />} />
        <Route path="/kanban" element={<KanbanBoard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/budget" element={<BudgetTracker />} /> */}
        <Route path="/TaskTimer" element={<TaskTimer />} />
        {/* <Route path="/code-editor" element={<CodeEditor />} />
        <Route path="/color-picker" element={<ColorPicker />} />
        <Route path="/form-builder" element={<FormBuilder />} />
        <Route path="/markdown-editor" element={<MarkdownEditor />} />
        <Route path="/api-tester" element={<APITester />} /> */}
      </Routes>
    </HashRouter>
  );
}

export default App;