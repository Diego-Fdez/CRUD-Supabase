import { useTasks } from '../hooks/useTasks';

const TaskCard = ({ task }) => {
  const { deleteTask, updateTask } = useTasks();

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleToggleDone = () => {
    updateTask(task.id, { done: !task.done });
  };

  return (
    <div className='card card-body mb-2'>
      <h2 className='h5'>
        {task.id} - {task.name}
      </h2>
      <p>{task.done ? 'Done ✔️' : 'Not Done ❌'}</p>
      <div className='ms-auto'>
        <button
          className='btn btn-danger btn-sm me-1'
          type='button'
          onClick={() => handleDelete()}
        >
          Delete
        </button>
        <button
          className='btn btn-secondary btn-sm'
          type='button'
          onClick={() => handleToggleDone()}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
