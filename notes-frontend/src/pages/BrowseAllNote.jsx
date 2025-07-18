// BrowseAllNotes.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const BrowseAllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notes/all');
        setNotes(res.data);
      } catch (err) {
        console.error('❌ Error fetching all notes:', err);
        setMessage('❌ Failed to fetch all notes');
      }
    };

    fetchAllNotes();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h2>📚 All Uploaded Notes</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}

      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        notes.map(note => (
          <div key={note._id} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '1rem',
            marginBottom: '1rem',
            backgroundColor: '#f9f9f9'
          }}>
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
          </div>
        ))
      )}
    </div>
  );
};

export default BrowseAllNotes;
