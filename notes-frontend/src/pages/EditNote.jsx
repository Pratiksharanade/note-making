import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: '',
    subject: '',
    description: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:5000/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => setNote(res.data))
      .catch((err) => {
        console.error('❌ Failed to fetch note:', err);
        setMessage('❌ Failed to load note');
      });
  }, [id]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        note,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate('/browse');
    } catch (err) {
      console.error('❌ Failed to update note:', err);
      setMessage('❌ Failed to update note');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Edit Note</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Title"
          required
        /><br /><br />
        <input
          name="subject"
          value={note.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
        /><br /><br />
        <textarea
          name="description"
          value={note.description}
          onChange={handleChange}
          placeholder="Description"
          required
        /><br /><br />
        <button type="submit">Update Note</button>
      </form>
    </div>
  );
};

export default EditNote;
