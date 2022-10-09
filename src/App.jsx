import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import { supabase } from './supabase/client';
import { TaskContextProvider } from './context/TaskContext';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/login');
      } else {
        navigate('/');
      }
    });
  }, [navigate]);

  return (
    <div className='App'>
      <TaskContextProvider>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route index exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='*' element={<NotFound />} />
          </Routes>
        </div>
      </TaskContextProvider>
    </div>
  );
}

export default App;
