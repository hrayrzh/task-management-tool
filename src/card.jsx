import ReactDOM from 'react-dom/client';
import './index.css';
import React, { useState, useEffect } from 'react';

function Card({props, cons}) {

    const {status, assignee, title, description, priority} = props;

    const [editTitle, setEditTitle] = useState(false);
    const [editAssigne, setEditAssigne] = useState(false);
    const [editDescription, setEditDescription] = useState(false);
    console.log(cons);






  return (
            <div className="card" >
                <div className={title}>
                    { editTitle ?  <input value={title} /> : <span>{title}</span>}

                    <button onClick={() => setEditTitle(!editTitle)}>
                        { !editTitle ? '🖋' :  "📌"}
                    </button>
                </div>
                <div>
                    { editDescription ? <textarea value={description}/> : <span>{description}</span>}
                    <button onClick={() => setEditDescription(!editDescription)}>
                        { !editDescription ? '🖋' :  "📌"}
                    </button>
                </div>
                <select>
                  <option value="backlog">Backlog</option>
                  <option value="todo">ToDo</option>
                  <option value="in progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <select>
                  <option value="high">High</option>
                  <option value="mid">Mid</option>
                  <option value="low">Low</option>
                </select>

                <div>
                    { editAssigne ?  <input value={assignee} /> : <span>{assignee}</span>}
                    <button onClick={() => setEditAssigne(!editAssigne)}>
                        { !editAssigne ? '🖋' : "📌"}
                    </button>
                </div>
            </div>
  );
}

export default Card;
