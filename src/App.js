import { useState, useEffect } from 'react';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'


import './app.css';
import React from 'react';




function App() {
  const[showAddTask, setShowAddTask] = useState(false);
  
  const [tasks, setTasks ] = useState([])
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);

  }
    getTasks();
    
  },[])


  // fetching tasks 
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();

    //  console.log(data);
     return data;

  }


  // adding a task
  const addTask = async(task) => {

    // creating an id for new task
//   const id = (id) => task.id === id ? id : ''
//   const newTask = {id, ...task}

//   setTasks([...tasks, newTask])
//   console.log(id, task);  
const res = await fetch('http://localhost:5000/tasks', {method: 'POST',
 headers:{'Content-Type': 'application/json'},
 body: JSON.stringify(task)})
 const data = await res.json();

 setTasks([...tasks, data]);



 }

  // fetching tasks 
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks${id}`)
    const data = await res.json();

    //  console.log(data);
     return data;
     fetchTask();

  }


// delete a task

const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})



  setTasks(tasks.filter((task) => task.id !== id))
}

 
// toggle reminder

const toggleReminder = async(id) => {
  // const taskToToggle = await fetchTask(id)
  // const updTask = {...taskToToggle, 
  // reminder: !taskToToggle.reminder}
  // const res = await fetch(`http:localhost:5000/tasks/${id}`, {method: 'PUT',
  // headers: {'Content-Type': 'application/json'},
  // body: JSON.stringify(updTask)
  // })

  //  const TaskToToggle = await fetchTask()
  //  const updTask = {...TaskToToggle,
  //   reminder : !TaskToToggle.reminder
  }
//   const res = await fetch(`http:localhost:5000/tasks/${id}`, {method: 'PUT',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify(updTask)
// })
//  const data = await res.json();









  setTasks(tasks.map((task) => task.id === id ? {...task, reminder : !task.reminder} : task))
}




  return (
    <div className="container">
     <Header  onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

     {showAddTask && <AddTask onAdd={addTask} />}

     {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : ' no tasks '}
   
    </div>
  );

export default App;







// class App extends React.Component {
//   render() {
//     return <h1>hello from class</h1>
//   }
// }





