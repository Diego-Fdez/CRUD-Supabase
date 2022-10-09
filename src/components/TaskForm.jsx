import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const { createTask, adding } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTask(taskName);
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit} className='card card-body'>
      <input
        type='text'
        name='taskName'
        placeholder='write a task name'
        value={taskName}
        className='form-control mb-2'
        onChange={(e) => setTaskName(e.target.value)}
      />
      <div className='ms-auto'>
        <button type='submit' disabled={adding} className='btn btn-primary'>
          {adding ? 'Adding...' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
