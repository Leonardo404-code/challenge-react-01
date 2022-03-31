import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(!newTaskTitle) {
      alert("O nome da Task não pode estar vazio")
      return
    }
    
    const copyTask = [...tasks]

    const id = uuidv4().replace(/[^\d]/g, "")

    const newTask = {
      id: Number(id),
      title: newTaskTitle,
      isComplete: false,
    }

    copyTask.push(newTask)

    setTasks(copyTask)
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    const copyTask = [...tasks]

    const taskUpdate = copyTask.map(task => task.id === id ? {
      ...task, isComplete: !task.isComplete
    } : task)

    setTasks(taskUpdate)
  }

  function handleRemoveTask(id: number) {
    const copyTask = [...tasks]

    const filteredTasks = copyTask.filter(task => task.id !== id)

    setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}