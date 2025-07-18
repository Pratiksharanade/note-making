import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BrowseNote.css'; // 👈 Import the CSS

const BrowseNotes = () => {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState('');

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('❌ You are not logged in.');
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/notes/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setNotes(res.data);
    } catch (err) {
      console.error('❌ Error fetching notes:', err.response?.data || err.message);
      setMessage(`❌ ${err.response?.data?.message || 'Failed to load notes'}`);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotes(prev => prev.filter(note => note._id !== id));
    } catch (err) {
      console.error('Failed to delete note:', err);
      setMessage('❌ Failed to delete note');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="browse-container">
      <h2>Your Notes</h2>
      {message && <p>{message}</p>}

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        notes.map(note => (
          <div className="note-card" key={note._id}>
            <h3>{note.title}</h3>
            <p><strong>Subject:</strong> {note.subject}</p>
            <p>{note.description}</p>

            {note.file && (
              <a
                href={`http://localhost:5000/uploads/${note.file}`}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                📥 Download
              </a>
            )}

            <Link to={`/edit/${note._id}`}>
              <button className="edit-btn">✏️ Edit</button>
            </Link>

            <button className="delete-btn" onClick={() => handleDelete(note._id)}>
              🗑️ Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BrowseNotes;
