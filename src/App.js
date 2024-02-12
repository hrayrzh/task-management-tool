import ReactDOM from 'react-dom/client';
import './index.css';
import React, { useState, useEffect } from 'react';
import Card from './card'
import AddNewCard from './addCardForm'


function replaceItem(items, newItem) {
    return items.map(item => {
        if (item.id === newItem.id) {
            return newItem;
        }
        return item;
    });
}

function deleteItem(items, deletedItem) {
    return items.filter(item => (item.id != deletedItem.id))
}

function addItem(items, newItem) {
    return [...items, newItem]
}





function App() {
    const [data, setdata] =useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                console.log("JSON data:", data)
                setdata(data)
            })
            .catch(error => console.error('JSON load Error:', error));
    }, []);
    
    
    const taskChange = (task) => {
      let newData = replaceItem(data, task);
      setdata(newData);
    }

    const taskDelete =(task) => {
        let newData = deleteItem(data, task);
        setdata(newData)
    }

    const taskAdd =(task) => {
        let newData = addItem(data, task);
        setdata(newData)
    }



    useEffect(() => {
        console.log("Updated JSON data:", data);
    }, [data])




    
  return (<>
    <AddNewCard
        taskAdd={taskAdd}
    />
    <div className="container">
        <div>
           <h6>Backlog</h6>
            {data.filter(task => task.status === "backlog").length > 0 ? (
                data.filter(task => task.status === "backlog").map((task) => (
                    <Card
                        props={task}
                        taskChange={taskChange}
                        taskAdd={taskAdd}
                        taskDelete={taskDelete}
                        key={task.id}
                    />
                ))
            ) : (
                <div className="card emptySection">SECTION IS EMPTY</div>
            )}
        </div>
        <div>
           <h6>ToDo</h6>
            {data.filter(task => task.status === "todo").length > 0 ? (
                data.filter(task => task.status === "todo").map((task) => (
                    <Card
                        props={task}
                        taskChange={taskChange}
                        taskAdd={taskAdd}
                        taskDelete={taskDelete}
                        key={task.id}
                    />
                ))
            ) : (
                <div className="card emptySection">SECTION IS EMPTY</div>
            )}
        </div>
        <div>
           <h6>In Progress</h6>
            {data.filter(task => task.status === "in progress").length > 0 ? (
                data.filter(task => task.status === "in progress").map((task) => (
                    <Card
                        props={task}
                        taskChange={taskChange}
                        taskAdd={taskAdd}
                        taskDelete={taskDelete}
                        key={task.id}
                    />
                ))
            ) : (
                <div className="card emptySection">SECTION IS EMPTY</div>
            )}
        </div>
        <div>
            <h6>Done</h6>
            {data.filter(task => task.status === "done").length > 0 ? (
                data.filter(task => task.status === "done").map((task) => (
                    <Card
                        props={task}
                        taskChange={taskChange}
                        taskAdd={taskAdd}
                        taskDelete={taskDelete}
                        key={task.id}
                    />
                ))
            ) : (
                <div className="card emptySection">SECTION IS EMPTY</div>
            )}
        </div>
      
      </div>
      </>
  );
}

export default App;
