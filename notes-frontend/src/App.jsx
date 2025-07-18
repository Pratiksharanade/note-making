import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/login'; 
import Signup from './pages/Signup'; 
import Dashboard from './pages/Dashboard';
import UploadNote from './pages/UploadNote'; 
import BrowseNote from './pages/BrowseNote';
import EditNote from './pages/EditNote';
import PrivateRoute from './utils/PrivateRoute'; // ✅ import it
import BrowseAllNote from './pages/BrowseAllNote'; // adjust path as needed


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
        <Route path="/upload" element={<PrivateRoute><UploadNote /></PrivateRoute>} />
        <Route path="/browse" element={<PrivateRoute><BrowseNote /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditNote /></PrivateRoute>} />
        <Route path="/all-notes" element={<BrowseAllNote />} />

      </Routes>
    </>
  );
}

export default App;
