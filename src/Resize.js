// import ReactDOM from 'react-dom/client';
import './index.css';
import React, {useEffect, useState} from 'react';


function Resize(){
    const [desctopSize, setDesctopSize] = useState(window.innerWidth);



    const newSize = () => {
        setDesctopSize(window.innerWidth)
    }


    useEffect(() => {
        window.addEventListener('resize', newSize)

        return () =>{
            window.removeEventListener('resize', newSize)
        }
    }, [])





    return (
        <div className='resize'>
            {desctopSize > 1023 && <p>This is displayed only on <span>desktop</span>.</p>}
            {desctopSize > 766 && desctopSize < 1024  && <p>This is displayed only on <span>tablet</span>.</p>}
            {desctopSize < 767 && <p>This is displayed only on <span>mobile</span>.</p>}
        </div>
    );

}

export default Resize;
