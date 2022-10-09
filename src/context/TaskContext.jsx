import { createContext, useState } from 'react';
import { supabase } from '../supabase/client';

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTasks = async (done = false) => {
    setLoading(true);
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from('task')
      .select()
      .eq('userId', user.id)
      .eq('done', done)
      .order('id', { ascending: true });

    if (error) throw error;

    setTasks(data);
    setLoading(false);
  };

  const createTask = async (taskName) => {
    setAdding(true);
    try {
      const user = supabase.auth.user();
      const { error, data } = await supabase.from('task').insert({
        name: taskName,
        userId: user.id,
      });
      if (error) throw error;
      setTasks([...tasks, ...data]);
      setAdding(false);
    } catch (error) {
      console.log(error);
      setAdding(false);
    }
  };

  const deleteTask = async (id) => {
    const user = supabase.auth.user();

    const { error } = await supabase
      .from('task')
      .delete()
      .eq('userId', user.id)
      .eq('id', id);

    if (error) throw error;
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const updateTask = async (id, updateFields) => {
    const user = supabase.auth.user();

    const { error } = await supabase
      .from('task')
      .update(updateFields)
      .eq('userId', user.id)
      .eq('id', id);

    if (error) throw error;

    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        adding,
        loading,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
