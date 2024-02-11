import ReactDOM from 'react-dom/client';
import './index.css';
import React, { useState, useEffect } from 'react';


function updateTask(item, key, value) {
    let newData = item;
    newData[key] = value;
    return newData
}


function Card({props, taskChange}) {

    const {status, assignee, title, description, priority} = props;

    const [editTitle, setEditTitle] = useState(false);
    const [editAssignee, setEditAssignee] = useState(false);
    const [editDescription, setEditDescription] = useState(false);
    const [assigneeInput, setAssigneeInput] = useState(assignee);
    const [titleInput, setTitleInput] = useState(title);
    const [descriptionInput, setDescriptionInput] = useState(description);


    const handleStatusChange = (e) => {
        let updatedTask = updateTask(props, "status", e.target.value);
        taskChange(updatedTask);
    }

    const handlePriorityChange = (e) => {
        let updatedTask = updateTask(props, "priority", e.target.value);
        taskChange(updatedTask);
    }

    const assigneeChange = () =>{
        let updatedTask = updateTask(props, "assignee", assigneeInput);
        taskChange(updatedTask);
        setEditAssignee(!editAssignee);
    }

    const assigneeCancel = () =>{
        setAssigneeInput(assignee);
        setEditAssignee(!editAssignee);
    }

    const titleChange = () =>{
        let updatedTask = updateTask(props, "title", titleInput);
        taskChange(updatedTask);
        setEditTitle(!editTitle);
    }

    const titleCancel = () =>{
        setTitleInput(title);
        setEditTitle(!editTitle);
    }

    const descriptionChange = () =>{
        let updatedTask = updateTask(props, "description", descriptionInput);
        taskChange(updatedTask);
        setEditDescription(!editDescription);
    }

    const descriptionCancel = () =>{
        setDescriptionInput(description);
        setEditDescription(!editDescription);
    }







  return (
            <div className="card" >

                { editTitle ?  <div>
                    <input value={titleInput} onChange={(e) => setTitleInput(e.target.value)}/>
                    <button onClick={titleChange}>👍</button>
                    <button onClick={titleCancel}>👎</button>
                </div>: <div>
                    <span>{titleInput}</span>
                    <button onClick={() => setEditTitle(!editTitle)}>🖋</button>
                </div>}


                { editDescription ?  <div>
                    <input value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)}/>
                    <button onClick={descriptionChange}>👍</button>
                    <button onClick={descriptionCancel}>👎</button>
                </div>: <div>
                    <span>{descriptionInput}</span>
                    <button onClick={() => setEditDescription(!editDescription)}>🖋</button>
                </div>}

                <select name="status" className="status" onChange={handleStatusChange}>
                  <option value="backlog" selected={status==="backlog"}>Backlog</option>
                  <option value="todo" selected={status==="todo"}>ToDo</option>
                  <option value="in progress" selected={status==="in progress"}>In Progress</option>
                  <option value="done" selected={status==="done"}>Done</option>
                </select>
                <select name="status" className="status" onChange={handlePriorityChange}>
                  <option value="high" selected={priority==="high"}>High</option>
                  <option value="mid" selected={priority==="mid"}>Mid</option>
                  <option value="low" selected={priority==="low"}>Low</option>
                </select>

                <div>
                    { editAssignee ?  <div>
                        <input value={assigneeInput} onChange={(e) => setAssigneeInput(e.target.value)}/>
                        <button onClick={assigneeChange}>👍</button>
                        <button onClick={assigneeCancel}>👎</button>
                    </div>: <div>
                        <span>{assigneeInput}</span>
                        <button onClick={() => setEditAssignee(!editAssignee)}>🖋</button>
                    </div>}
                </div>
            </div>
  );
}

export default Card;
