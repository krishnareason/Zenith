// src/pages/NotesPage.jsx
import { useState, useEffect } from 'react';
import api from '../api';
import Header from '../components/Header';
import Modal from '../components/Modal';
import NoteForm from '../components/NoteForm';
import Footer from '../components/Footer';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Function to fetch all notes from the API
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notes');
      setNotes(response.data);
    } catch (err) {
      setError('Failed to fetch notes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Run the fetch function once when the component loads
  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to handle both creating a new note and updating an existing one
  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        // We are updating an existing note
        const response = await api.put(`/notes/${editingNote.id}`, noteData);
        setNotes(notes.map(n => n.id === editingNote.id ? response.data : n));
      } else {
        // We are creating a new note
        const response = await api.post('/notes', noteData);
        setNotes([response.data, ...notes]);
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save note", error);
      // You could set an error state here to show in the form
    }
  };

  // Function to handle deleting a note
  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.delete(`/notes/${noteId}`);
        setNotes(notes.filter(n => n.id !== noteId));
      } catch (err) {
        console.error("Failed to delete note", err);
      }
    }
  };

  // Helper functions to control the modal state
  const openModal = (note = null) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container"><h1>Loading Notes...</h1></div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="loading-container"><h1>{error}</h1></div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="page-header">
          <h1>My Notes</h1>
          <button onClick={() => openModal()} className="btn-primary">Add New Note</button>
        </div>
        <div className="notes-grid">
          {notes.length > 0 ? (
            notes.map(note => (
              <div key={note.id} className="note-card">
                <h3>{note.title}</h3>
                <p>{note.content?.substring(0, 150)}{note.content?.length > 150 ? '...' : ''}</p>
                <small>Created: {new Date(note.created_at).toLocaleDateString()}</small>
                <div className="note-actions">
                  <button onClick={() => openModal(note)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDeleteNote(note.id)} className="btn-delete">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-trades"> {/* We can reuse this class for the message styling */}
                No notes found. Add one to get started!
            </div>
          )}
        </div>
      </div>

      <Modal title={editingNote ? "Edit Note" : "Add New Note"} isOpen={isModalOpen} onClose={closeModal}>
        <NoteForm 
          onSubmit={handleSaveNote} 
          initialData={editingNote} 
          closeModal={closeModal} 
        />
      </Modal>
      <Footer />
    </>
  );
};

export default NotesPage;