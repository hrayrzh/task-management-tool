// import ReactDOM from 'react-dom/client';
import './index.css';
import {useState} from 'react';


function updateTask(item, key, value) {
    let newData = item;
    newData[key] = value;
    return newData
}


function Card({props, taskChange, taskDelete}) {

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

    const assigneeChange = () => {
        let updatedTask = updateTask(props, "assignee", assigneeInput);
        taskChange(updatedTask);
        setEditAssignee(!editAssignee);
    }

    const assigneeCancel = () => {
        setAssigneeInput(assignee);
        setEditAssignee(!editAssignee);
    }

    const titleChange = () => {
        let updatedTask = updateTask(props, "title", titleInput);
        taskChange(updatedTask);
        setEditTitle(!editTitle);
    }

    const titleCancel = () => {
        setTitleInput(title);
        setEditTitle(!editTitle);
    }

    const descriptionChange = () => {
        let updatedTask = updateTask(props, "description", descriptionInput);
        taskChange(updatedTask);
        setEditDescription(!editDescription);
    }

    const descriptionCancel = () => {
        setDescriptionInput(description);
        setEditDescription(!editDescription);
    }

    const deleteTask = () => {
        console.log(props);
        taskDelete(props)
    }


    return (
        <div
            className={`card ${priority === "high" ? "order-high" : priority === "medium" ? "order-mid" : "order-low"}`}>

            {editTitle ? <div className="title card-input">
                <input value={titleInput} onChange={(e) => setTitleInput(e.target.value)}/>
                <button onClick={titleChange}>👍</button>
                <button onClick={titleCancel}>👎</button>
            </div> : <div className="title card-input">
                <span>{titleInput}</span>
                <button onClick={() => setEditTitle(!editTitle)}>🖋</button>
            </div>}


            {editDescription ? <div className="description card-input">
                <textarea rows={4} value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)}/>
                <button onClick={descriptionChange}>👍</button>
                <button onClick={descriptionCancel}>👎</button>
            </div> : <div className="description card-input">
                <span>{descriptionInput}</span>
                <button onClick={() => setEditDescription(!editDescription)}>🖋</button>
            </div>}

            <select name="status" className="status" defaultValue={status} onChange={handleStatusChange}>
                <option value="backlog">Backlog</option>
                <option value="todo">ToDo</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
            </select>

            <select name="priority" className="priority" defaultValue={priority} onChange={handlePriorityChange}>
                <option value="high">High</option>
                <option value="mid">Medium</option>
                <option value="low">Low</option>
            </select>

            {editAssignee ? <div className="assignee card-input">
                <input value={assigneeInput} onChange={(e) => setAssigneeInput(e.target.value)}/>
                <button onClick={assigneeChange}>👍</button>
                <button onClick={assigneeCancel}>👎</button>
            </div> : <div className="assignee card-input">
                <span>{assigneeInput}</span>
                <button onClick={() => setEditAssignee(!editAssignee)}>🖋</button>
            </div>}

            <button className="delete-button" onClick={deleteTask}>Cancel the task</button>
        </div>
    );
}

export default Card;
