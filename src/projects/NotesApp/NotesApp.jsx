import { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Clock, 
  Tag 
} from 'lucide-react';
import HeaderProject from '../../components/layouts/ProjectHeader';
import Footer from '../../components/layouts/Footer';
import './NoteApp.css';

const NoteApp = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [category, setCategory] = useState('personal');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title.trim() || !content.trim()) return;

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      category,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setContent('');
    setCategory('personal');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTitle('');
      setContent('');
      setCategory('personal');
    }
  };

  const startEditing = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
  };

  const updateNote = () => {
    if (!title.trim() || !content.trim()) return;

    setNotes(notes.map(note => 
      note.id === editingId 
        ? {
            ...note,
            title: title.trim(),
            content: content.trim(),
            category,
            lastModified: new Date().toISOString()
          }
        : note
    ));

    setEditingId(null);
    setTitle('');
    setContent('');
    setCategory('personal');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setCategory('personal');
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="app">
    <HeaderProject 
      title="Enhanced NoteApp" 
      description="A feature-rich Note app with Best functionality"/>
    <div className="note-app">
      <div className="note-container">
        <div className="header">
          <h1>Note Taking App</h1>
          <p>Capture your thoughts and ideas</p>
        </div>

        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="note-form">
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="ideas">Ideas</option>
          </select>
          <div className="form-buttons">
            {editingId ? (
              <>
                <button className="cancel" onClick={cancelEditing}>
                  <X size={16} />
                  Cancel
                </button>
                <button className="update" onClick={updateNote}>
                  <Save size={16} />
                  Update Note
                </button>
              </>
            ) : (
              <button className="add" onClick={addNote}>
                <Plus size={16} />
                Add Note
              </button>
            )}
          </div>
        </div>

        <div className="notes-grid">
          {filteredNotes.map(note => (
            <div key={note.id} className="note-card">
              <div className="note-header">
                <h3>{note.title}</h3>
                <div className="note-actions">
                  <button onClick={() => startEditing(note)} className="edit">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteNote(note.id)} className="delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p>{note.content}</p>
              <div className="note-meta">
                <Tag size={14} />
                <span className="category">{note.category}</span>
              </div>
              <div className="note-meta">
                <Clock size={14} />
                <span>Modified: {formatDate(note.lastModified)}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="no-notes">
            {searchTerm ? 'No notes found matching your search.' : 'No notes yet. Create your first note!'}
          </div>
        )}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default NoteApp;
