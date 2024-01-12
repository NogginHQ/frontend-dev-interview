import React, { useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber'
import { Html, OrbitControls, Sky } from '@react-three/drei'

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const Todo = ({task, index}) => {
    return (
    <li key={index} className="bg-white shadow mb-2 p-2 flex items-center justify-between w-full">
      <div className="flex items-center">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => toggleTaskCompletion(index)}
          className="mr-2"
        />
        <span className={task.completed ? "line-through" : ""}>{task.text}</span>
      </div>
      <button 
        onClick={() => deleteTask(index)} 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        Delete
      </button>
      </li>
    )

  }

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
      <div className="w-max mx-auto p-4">
        <h1 className="text-2xl font-bold mb-3 text-white text-center">To-Do List</h1>
        <div className="flex mb-4">
          <input 
            type="text" 
            className="shadow border rounded flex-1 py-2 px-3 text-grey-darker" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task" 
          />
          <button 
            onClick={addTask} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Add
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <Todo key={index} task={task} index={index} />
          ))}
        </ul>
      </div>
  );
}

function App() {
  return (
    <div className="App h-screen" >
    <Canvas className='full-h'>
      <OrbitControls />
      {/* <pointLight position={[1, 1, 1]} intensity={100} color="#fff" /> */}
      <ambientLight />
      <pointLight position={[0, 20, 10]} intensity={1.5} />
      <Sky sunPosition={[10, 2, 10]} />
      <mesh scale={2}>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color={"#f99"} />
      <Html occlude distanceFactor={1.5} position={[0, 0, 0.51]} scale={0.75} transform>
        <TodoList />
      </Html>
    </mesh>
    </Canvas>
    </div>
  )
}

export default App;
