import {useEffect, useState} from "react";

function TheGame() {
    const [board, setBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const [turn, setturn] = useState(true);
    const [turnNum, setTurnNum] = useState(1);
    const [score, setScore] = useState([0,0])
    const [checkWin, setCheckWin] = useState(null);

    const clickOnBoard = (rowIndex, cellIndex, turn) => {
        if (board[rowIndex][cellIndex] !== "") return

        const newArr = board.map((row, index) => {
            if (rowIndex === index) {
                return row.map((item, itemIndex) => {
                    if (itemIndex === cellIndex && item === '') {
                        console.log(item, rowIndex, cellIndex)
                        return turn ? 'x' : 'o'
                    }
                    return item
                })
            }
            return row
        });

        // newArr[rowIndex][cellIndex] = 'X';
        setBoard(newArr);
        // debugger;
        setturn(!turn)
        setTurnNum(turnNum + 1);
        console.log(newArr);


        if (turnNum >= 5) {
            console.table(newArr[rowIndex][0], newArr[rowIndex][1], newArr[rowIndex][2]);
            if (((newArr[rowIndex][0] === newArr[rowIndex][1]) && (newArr[rowIndex][0] === newArr[rowIndex][2]))
                || ((newArr[0][cellIndex] === newArr[1][cellIndex]) && (newArr[0][cellIndex] === newArr[2][cellIndex]))
                || ((newArr[0][0] === newArr[1][1]) && (newArr[0][0] === newArr[2][2]))
                || ((newArr[0][2] === newArr[1][1]) && (newArr[0][2] === newArr[2][0]))) {
                setCheckWin(turn ? 'X' : 'Y');
                setTurnNum(1);
                turn ? setScore([score[0]+1, score[1]]) : setScore([score[0], score[1]+1])
            }
        }

    }

    useEffect(()=>{
        if(checkWin){
            console.log(board, 'effect');
            // debugger;
            setBoard([['', '', ''], ['', '', ''], ['', '', '']]);
            alert(
                `${checkWin} Wins`
            )
        }
    }, [checkWin])

    return (
        <div>
            <div>
                John - {score[0]} : {score[1]} - Harry
            </div>
            <div className='gameInfo'>
                Hi <span>
                {turn ? "John" : "Harry"}
            </span>, it's your turn!
            </div>
            <div className="gameBoard">
                {board.map((row, rowIndex) => {
                        return (
                            <div className="gameRow">
                                {row.map((item, cellIndex) => {
                                    return (
                                        <div className="gameItem"
                                             onClick={() => clickOnBoard(rowIndex, cellIndex, turn)}>{item}</div>
                                    )
                                })}
                            </div>
                        )
                    }
                )}
            </div>
        </div>

    )

}

export default TheGame