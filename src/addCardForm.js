// import ReactDOM from 'react-dom/client';
import './index.css';
import React, {useState} from 'react';

function createItem(t, d, s, p, a) {
    let item = {};
    item["id"] = Math.random();
    item["title"] = t;
    item["description"] = d;
    item["status"] = s;
    item["priority"] = p;
    item["assignee"] = a;
    return item;
}

function AddNewCard({taskAdd}) {

    const [newTaskMode, setNewTaskMode] = useState(true);
    const [title, setTitle] = useState("New Title");
    const [description, setDescription] = useState("New Description");
    const [assignee, setAssignee] = useState("Assignee");
    const [status, setStatus] = useState("backlog");
    const [priority, setPriority] = useState("low");


    const addBtn = () => {
        setNewTaskMode(false);
        document.body.classList.add('hidden-overflow')
    }

    const cancelBtn = () => {
        setNewTaskMode(true);
        document.body.classList.remove('hidden-overflow')
    }

    const addNewTask = () => {
        let item = createItem(title, description, status, priority, assignee);
        taskAdd(item);
        cancelBtn();
    }

    return (
        <>

            <div className={`${newTaskMode ? "d-none new-task-popup" : "new-task-popup"}`}>
                <div>
                    <input type="text" value={title}
                           onChange={(e) => e.target.value ? setTitle(e.target.value) : setTitle("New Title")}/>

                    <textarea rows={4} type="text" value={description}
                              onChange={(e) => e.target.value ? setDescription(e.target.value) : setDescription("New Description")}/>

                    <select name="status" defaultValue={"backlog"} className="status"
                            onChange={(e) => setStatus(e.target.value)}>
                        <option value="backlog">Backlog</option>
                        <option value="todo">ToDo</option>
                        <option value="in progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>

                    <select name="priority" defaultValue="low" onChange={(e) => setPriority(e.target.value)}>
                        <option value="high">High</option>
                        <option value="mid">Medium</option>
                        <option value="low">Low</option>
                    </select>

                    <input type="text" value={assignee}
                           onChange={(e) => e.target.value ? setAssignee(e.target.value) : setAssignee("New Assignee")}/>

                    <div className="add-card-buttons">
                        <button onClick={addNewTask}>Add Task</button>
                        <button onClick={cancelBtn}>Cancel</button>
                    </div>
                </div>
            </div>
            <div>
                <button className='new-task-btn' onClick={addBtn}> Add New Task</button>
            </div>
        </>
    );
}

export default AddNewCard;
