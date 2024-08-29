import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const columns = ['To Do', 'In Progress', 'Done'];

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), title: newTask, status: 'To Do' }]);
      setNewTask('');
    }
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className={styles.container}>
      <h1>Mini Trello Board</h1>
      <div className={styles.taskInput}>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className={styles.board}>
        {columns.map(column => (
          <div key={column} className={styles.column}>
            <h2>{column}</h2>
            {tasks
              .filter(task => task.status === column)
              .map(task => (
                <div key={task.id} className={styles.task}>
                  {task.title}
                  <div className={styles.taskActions}>
                    {columns.map(newStatus => 
                      newStatus !== task.status && (
                        <button key={newStatus} onClick={() => moveTask(task.id, newStatus)}>
                          Move to {newStatus}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))
            }
          </div>
        ))}
      </div>
    </div>
  );
}
