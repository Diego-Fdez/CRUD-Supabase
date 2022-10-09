import { useTasks } from '../hooks/useTasks';
import { useEffect } from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ done = false }) => {
  const { tasks, getTasks, loading } = useTasks();

  useEffect(() => {
    getTasks(done);
  }, [done]);

  return (
    <>
      {tasks?.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TaskList;
