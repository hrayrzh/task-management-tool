import {useEffect, useState} from "react";

function TheGame() {
    const [board, setBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const [turn, setturn] = useState(true);
    const [turnNum, setTurnNum] = useState(1);
    const [score, setScore] = useState([0,0])
    const [winner, setWinner] = useState(null);

    const clickOnBoard = (rowIndex, cellIndex) => {

        console.log(board);
        console.log(turnNum);
        if (board[rowIndex][cellIndex] !== "") return

        const newArr = board.map((row, index) => {
            if (rowIndex === index) {
                return row.map((item, itemIndex) => {
                    if (itemIndex === cellIndex && item === '') {
                        console.log(item, rowIndex, cellIndex)
                        return turn ? 'X' : 'O'
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

                console.log(newArr);
                setWinner(turn ? "John Wins" : "Harry Wins");
                setTurnNum(1);
                turn ? setScore([score[0]+1, score[1]]) : setScore([score[0], score[1]+1])
            }else if (turnNum === 9){
                setWinner("NO WIN");
                setTurnNum(1);
            }
        }

    }

    useEffect(()=>{
        if(winner){
            console.log(board, 'effect');
            // debugger;
            setBoard([['', '', ''], ['', '', ''], ['', '', '']]);
            setTimeout(() => {alert(
                `${winner}`
            )})
            setWinner(null)
        }
    }, [winner])

    return (
        <div className="gameContainer">
            <div>
                John - {score[0]} : {score[1]} - Harry
            </div>
            <div className="gameBoard">
                {board.map((row, rowIndex) => {
                        return (
                            <div className="gameRow">
                                {row.map((item, cellIndex) => {
                                    return (
                                        <div className="gameItem"
                                             onClick={() => clickOnBoard(rowIndex, cellIndex)}>{item}</div>
                                    )
                                })}
                            </div>
                        )
                    }
                )}
            </div>
            <div className='gameInfo'>
                Hi <span>
                {turn ? "John" : "Harry"}
            </span>, it's your turn!
            </div>
        </div>

    )

}

export default TheGame