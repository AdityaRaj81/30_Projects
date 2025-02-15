import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHeader from './components/layouts/MainHeader';
import Footer from './components/layouts/Footer';
import ProjectCard from './components/ProjectCard/ProjectCard';


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
import PomodoroTimer from './projects/PomodoroTimer/PomodoroTimer';
// import KanbanBoard from './projects/KanbanBoard/KanbanBoard';
import Calendar from './projects/Calendar/Calendar';
import BudgetTracker from './projects/BudgetTracker/BudgetTracker';
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
    "title": "Memory Card Game",
    "description": "Test your memory with this fun card-matching game.",
    "demoUrl": "/memory-game",
    "imageUrl": "https://images.unsplash.com/photo-1612078894399-c8f1fc81cbf0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Animation", "Game Logic"]
  },
  {
    "title": "Tic Tac Toe",
    "description": "Classic game with AI opponent and multiplayer mode.",
    "demoUrl": "/tic-tac-toe",
    "imageUrl": "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "AI", "Multiplayer"]
  },
  {
    "title": "Snake Game",
    "description": "A fun and interactive Snake Game built using React.",
    "demoUrl": "/snake-game",
    "imageUrl": "https://images.unsplash.com/photo-1554475909-6b9f48f0f009?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Canvas", "Game Logic"]
  },
  {
    "title": "Quiz App",
    "description": "Test your knowledge with a dynamic and interactive quiz app.",
    "demoUrl": "/quiz",
    "imageUrl": "https://images.unsplash.com/photo-1600615996351-34b513172f7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "JavaScript", "API"]
  },
  {
    "title": "Word Game",
    "description": "Challenge yourself with this fun and engaging word puzzle game.",
    "demoUrl": "/word-game",
    "imageUrl": "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "JavaScript", "Game Logic"]
  },

  // E-commerce
  {
    "title": "Shopping Cart",
    "description": "A feature-rich shopping cart system for an e-commerce platform.",
    "demoUrl": "/shopping-cart",
    "imageUrl": "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Redux", "LocalStorage"]
  },
  {
    "title": "Product Catalog",
    "description": "Browse and explore a wide range of products in this catalog app.",
    "demoUrl": "/product-catalog",
    "imageUrl": "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "REST API", "Search"]
  },
  {
    "title": "Wishlist",
    "description": "Save your favorite products to a wishlist for future purchases.",
    "demoUrl": "/wishlist",
    "imageUrl": "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "LocalStorage", "User Authentication"]
  },
  {
    "title": "Order Tracker",
    "description": "Track your e-commerce orders in real time.",
    "demoUrl": "/order-tracker",
    "imageUrl": "https://images.unsplash.com/photo-1598531610714-184cb9342d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Firebase", "Real-time Updates"]
  },
  {
    "title": "Review System",
    "description": "An interactive review and rating system for products and services.",
    "demoUrl": "/review-system",
    "imageUrl": "https://images.unsplash.com/photo-1606327057566-3dd9c7e4c426?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Firebase", "User Authentication"]
  },

  // Social & Communication
  {
    "title": "Chat App",
    "description": "A real-time messaging application for seamless communication.",
    "demoUrl": "/chat",
    "imageUrl": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Firebase", "WebSockets"]
  },
  {
    "title": "Social Feed",
    "description": "A social media feed with posts, likes, and comments.",
    "demoUrl": "/social-feed",
    "imageUrl": "https://images.unsplash.com/photo-1519288360336-04e3f4f3c8d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Firebase", "Real-time Updates"]
  },
  {
    "title": "User Profile",
    "description": "A customizable user profile page with editable details.",
    "demoUrl": "/profile",
    "imageUrl": "https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Firebase", "User Authentication"]
  },
  {
    "title": "Photo Gallery",
    "description": "A responsive and dynamic photo gallery application.",
    "demoUrl": "/gallery",
    "imageUrl": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Cloudinary", "Masonry Layout"]
  },
  {
    "title": "Comment System",
    "description": "A threaded comment system for discussions and feedback.",
    "demoUrl": "/comments",
    "imageUrl": "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Firebase", "User Authentication"]
  },

  // Productivity
  {
    "title": "Pomodoro Timer",
    "description": "Stay focused and productive with timed work sessions using the Pomodoro technique.",
    "demoUrl": "/pomodoro",
    "imageUrl": "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "JavaScript", "CSS"]
  },
  {
    "title": "Kanban Board",
    "description": "A task management tool with draggable cards and boards.",
    "demoUrl": "/kanban",
    "imageUrl": "https://images.unsplash.com/photo-1516880711640-efbfff9a47de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Drag and Drop", "LocalStorage"]
  },
  {
    "title": "Calendar",
    "description": "A fully functional calendar with event scheduling.",
    "demoUrl": "/calendar",
    "imageUrl": "https://images.unsplash.com/photo-1569770218135-2942e31e171a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Date Picker", "Event Management"]
  },
  {
    "title": "BudgetTracker",
    "description": "A smart budget tracking app to manage expenses, set savings goals, and analyze spending habits.",
    "demoUrl": "/budget-tracker",
    "imageUrl": "https://images.unsplash.com/photo-1604014237744-f8b5d0b14e02?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Chart.js", "Local Storage"]
  },
  {
    "title": "TaskTimer",
    "description": "A time-tracking web app to monitor tasks with detailed statistics and session tracking.",
    "demoUrl": "/tasktimer",
    "imageUrl": "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "JavaScript", "LocalStorage"]
  },

  // Development Tools
  {
    "title": "Code Editor",
    "description": "A real-time code editor with syntax highlighting.",
    "demoUrl": "/code-editor",
    "imageUrl": "https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Monaco Editor", "Live Preview"]
  },
  {
    "title": "Color Picker",
    "description": "An interactive color picker tool for designers.",
    "demoUrl": "/color-picker",
    "imageUrl": "https://images.unsplash.com/photo-1534336981543-e2c7a348fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "CSS", "Color Manipulation"]
  },
  {
    "title": "Form Builder",
    "description": "Create dynamic forms with a drag-and-drop interface.",
    "demoUrl": "/form-builder",
    "imageUrl": "https://images.unsplash.com/photo-1566241440091-ec10de8b5e2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Drag and Drop", "Form Validation"]
  },
  {
    "title": "Markdown Editor",
    "description": "Write and preview markdown content with real-time rendering.",
    "demoUrl": "/markdown-editor",
    "imageUrl": "https://images.unsplash.com/photo-1580894908361-967f2c3c6b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "Markdown", "Live Preview"]
  },
  {
    "title": "API Tester",
    "description": "Test and debug APIs with a user-friendly interface.",
    "demoUrl": "/api-tester",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "technologies": ["React", "REST API", "JSON Viewer"]
  },
  



  //
  
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





  

  // Add more projects following the same pattern...
  // The complete list would include all 30 projects
];

function App() {
  return (
    <Router>
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
        <Route path="/comments" element={<CommentSystem />} /> */}
        <Route path="/pomodoro" element={<PomodoroTimer />} />
        {/* <Route path="/kanban" element={<KanbanBoard />} /> */}
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/budget-tracker" element={<BudgetTracker />} />
        <Route path="/TaskTimer" element={<TaskTimer />} />
        {/* <Route path="/code-editor" element={<CodeEditor />} />
        <Route path="/color-picker" element={<ColorPicker />} />
        <Route path="/form-builder" element={<FormBuilder />} />
        <Route path="/markdown-editor" element={<MarkdownEditor />} />
        <Route path="/api-tester" element={<APITester />} /> */}
      </Routes>
    </Router>
  );
}

export default App;