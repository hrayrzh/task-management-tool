import ReactDOM from 'react-dom/client';
import './index.css';
import React, { useState, useEffect } from 'react';
import Card from './card'



function App() {
    const [data, setdata] =useState([])
    
    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                console.log("JSON data:", data)
                setdata(data)
            })
            .catch(error => console.error('JSON load Error:', error));
    }, []);
    
    
    const cons = () => {
      console.log("a")
    }


    console.log(data);
    
  return (
    <div className="container">
        <div>
           <h6>Backlog</h6>
            {data.filter(task => task.status === 'backlog').map((task) => <Card props={task} cons={cons}/>)}
        </div>
        <div>
           <h6>ToDo</h6>
            {data.map((task) => (
                task.status === "todo" && <Card props={task} cons={cons}/>
            ))}
        </div>
        <div>
           <h6>In Progress</h6>
            {data.map((task) => (
                task.status === "in progress" && <Card props={task}/>
            ))}
        </div>
        <div>
           <h6>Done</h6>
            {data.map((task) => (
                task.status === 'done' && <Card props={task}/>
            ))}
        </div>
      
      </div>
  );
}

export default App;
