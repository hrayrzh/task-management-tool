// import ReactDOM from 'react-dom/client';
import './index.css';
import React, {useEffect, useReducer} from 'react';
import Card from './card'
import AddNewCard from './addCardForm'
import ACTIONS from "./ACTIONS";


// function replaceItem(items, newItem) {
//     return items.map(item => {
//         if (item.id === newItem.id) {
//             return newItem;
//         }
//         return item;
//     });
// }
//
// function deleteItem(items, deletedItem) {
//     return items.filter(item => (item.id != deletedItem.id))
// }
//
// function addItem(items, newItem) {
//     return [...items, newItem]
// }


function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.GET_DATA:
            return action.data
        case ACTIONS.DELETE_TASK:
            return state.filter(item => (item.id !== action["item"].id))
        case ACTIONS.ADD_TASK:
            return [...state, action.item]
        case ACTIONS.EDIT_TASK:
            return state.map(item => {
                if (item.id === action["item"].id) {
                    return action["item"];
                }
                return item;
            });
        default:
            console.log("WHAT?");
    }
}

// const actionsMap = {
//     [ACTIONS.GET_DATA]: (state, action) => action.data,
//     [ACTIONS.DELETE_TASK]: (state, action) => state.filter(item => item.id !== action.item.id),
//     [ACTIONS.ADD_TASK]: (state, action) => [...state, action.item],
//     [ACTIONS.EDIT_TASK]: (state, action) => state.map(item => item.id === action.item.id ? action.item : item),
// };
//
// const reducer = (state, action) => {
//     const handler = actionsMap[action.type];
//     return handler ? handler(state, action) : state;
// };


function App() {

    const [data, dispatch] = useReducer(reducer, []);
    // const [data, setdata] =useState([]);


    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                console.log("JSON data:", data)
                tasksGet(data)
            })
            .catch(error => console.error('JSON load Error:', error));
    }, []);


    // const taskChange = (task) => {
    //   let newData = replaceItem(data, task);
    //   setdata(newData);
    // }
    //
    // const taskDelete =(task) => {
    //     let newData = deleteItem(data, task);
    //     // let newData = data.filter(item => (item.id != task.id));
    //     setdata(newData)
    // }
    //
    // const taskAdd =(task) => {
    //     let newData = addItem(data, task);
    //     // let newData = [...data, task];
    //     setdata(newData)
    // }


    function tasksGet(data) {
        dispatch({type: ACTIONS.GET_DATA, data: data});
    }

    function taskDelete(item) {
        dispatch({type: ACTIONS.DELETE_TASK, item: item});
    }

    function taskAdd(item) {
        dispatch({type: ACTIONS.ADD_TASK, item: item});
    }

    function taskChange(item) {
        dispatch({type: ACTIONS.EDIT_TASK, item: item});
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
