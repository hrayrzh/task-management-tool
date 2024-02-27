import 'index.css'
import React, {useEffect, useReducer, useState} from 'react';

function Navigation() {
    const [tabname, setTabname] = useState('SM Tool')

    useEffect(() => {

    }, [tabname])


    return (
        <div className="nav">
            <button onClick={setTabname('App')}>SM Tool</button>
            <button onClick={setTabname("Resize")}> Resize< /button>
            <button onClick={setTabname("Soon")}>Soon...</button>
        </div>
    )
}

export default Navigation