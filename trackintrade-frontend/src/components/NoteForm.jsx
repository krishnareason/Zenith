// src/components/NoteForm.jsx
import { useState, useEffect } from 'react';

const NoteForm = ({ onSubmit, initialData = null, closeModal }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <div className="form-group">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="8" />
      </div>
      <div className="form-actions">
        <button type="button" onClick={closeModal} className="btn-secondary">Cancel</button>
        <button type="submit" className="btn-primary">Save Note</button>
      </div>
    </form>
  );
};
export default NoteForm;