import React, { useState, useEffect } from 'react';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { 
//   Search, 
//   Plus, 
//   Trash2, 
//   Edit2, 
//   Save,
//   X,
//   Clock,
//   Tag
// } from 'lucide-react';

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

  // Save notes to localStorage whenever they change
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 md:p-8">
      <Card className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl rounded-xl p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Note Taking App
          </h1>
          <p className="text-gray-600">Capture your thoughts and ideas</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-lg"
            />
          </div>
        </div>

        {/* Note Input Form */}
        <Card className="mb-8 p-4 bg-white shadow-md rounded-lg">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg"
            />
            <Textarea
              placeholder="Note content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="rounded-lg min-h-[100px]"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="ideas">Ideas</option>
            </select>
            <div className="flex justify-end gap-2">
              {editingId ? (
                <>
                  <Button
                    onClick={cancelEditing}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </Button>
                  <Button
                    onClick={updateNote}
                    className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
                  >
                    <Save size={16} />
                    Update Note
                  </Button>
                </>
              ) : (
                <Button
                  onClick={addNote}
                  className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Note
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map(note => (
            <Card
              key={note.id}
              className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-800">{note.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(note)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-4 whitespace-pre-wrap">{note.content}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Tag size={14} />
                <span className="capitalize">{note.category}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>Modified: {formatDate(note.lastModified)}</span>
              </div>
            </Card>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            {searchTerm ? 'No notes found matching your search.' : 'No notes yet. Create your first note!'}
          </div>
        )}
      </Card>
    </div>
  );
};

export default NoteApp;