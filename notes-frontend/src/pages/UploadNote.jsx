import { useState } from 'react';
import axios from 'axios';
import './UploadNote.css'; // 👈 Import the CSS

const UploadNote = () => {
  const [note, setNote] = useState({ title: '', subject: '', description: '' });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return setMessage('User not authenticated');

    const formData = new FormData();
    formData.append('title', note.title);
    formData.append('subject', note.subject);
    formData.append('description', note.description);
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/notes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setMessage(res.data.message);
      setNote({ title: '', subject: '', description: '' });
      setFile(null);
    } catch (err) {
      console.error('❌ Upload failed:', err.response?.data || err.message);
      setMessage(`❌ ${err.response?.data?.message || 'Failed to upload note'}`);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Note</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={handleChange}
          required
        />
        <input
          name="subject"
          placeholder="Subject"
          value={note.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={note.description}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.docx"
          required
        />
        <button type="submit">Upload Note</button>
      </form>
    </div>
  );
};

export default UploadNote;
