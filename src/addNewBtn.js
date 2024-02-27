// import ReactDOM from 'react-dom/client';
import './index.css';
import React from 'react';


function AddNewBtn({setNewTaskMode, isopen}) {



    const addBtn = () => {
        setNewTaskMode(!isopen);
        document.body.classList.add('hidden-overflow')
    }

    return (
            <div>
                <button className='new-task-btn' onClick={addBtn}> Add New Task</button>
            </div>
    );
}

export default AddNewBtn;
