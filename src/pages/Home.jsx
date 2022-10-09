import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { supabase } from '../supabase/client';

const Home = () => {
  const navigate = useNavigate();
  const [showTasksDone, setShowTasksDone] = useState(false);

  useEffect(() => {
    if (!supabase.auth.user()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='row pt-4'>
      <div className='col-md4 offset-md-4'>
        <TaskForm />
        <header className='d-flex justify-content-between my-3'>
          <span className='h5'>
            {showTasksDone ? 'Tasks done' : 'Tasks to do'}
          </span>
          <button
            className='btn btn-dark btn-sm'
            onClick={() => setShowTasksDone(!showTasksDone)}
          >
            {showTasksDone ? 'Show Tasks To Do' : 'Show Tasks Done'}
          </button>
        </header>
        <TaskList done={showTasksDone} />
      </div>
    </div>
  );
};

export default Home;
