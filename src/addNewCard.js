// import ReactDOM from 'react-dom/client';
import './index.css';
import React, {useRef, useState} from 'react';
import {createPortal} from "react-dom";

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

function AddNewCard({taskAdd, setNewTaskMode, isopen}) {

    const [title, setTitle] = useState("New Title");
    const [description, setDescription] = useState("New Description");
    const [assignee, setAssignee] = useState("Assignee");
    const [status, setStatus] = useState("backlog");
    const [priority, setPriority] = useState("low");
    const contentRef = useRef(null); // { current: null }



    const cancelBtn = () => {
        setNewTaskMode(!isopen);
        document.body.classList.remove('hidden-overflow')
    }
    const testclick = (e) => {
        if (e.target !== contentRef.current && e.target.contains(contentRef.current)){
            cancelBtn()
        }
    }

    const addNewTask = () => {
        let item = createItem(title, description, status, priority, assignee);
        taskAdd(item);
        cancelBtn();
    }


    return createPortal(
        <>

            <div className={`${isopen ? "d-none new-task-popup" : "new-task-popup"}`} onClick={testclick}>
                <div ref={contentRef}>
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
        </>, document.body
    );
}

export default AddNewCard;
