import { useState } from "react"
import Board from "./Board"

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const currentSquares = history[currentMove]
    const xIsNext = currentMove % 2 === 0

    function handlePlay(nextSquares: Array<string | null>) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove)
    }

    const moves = history.map((_, move) => {
        if (move === currentMove) {
            return (
                <li key={move} className='current'>
                    You are at move #{move}
                </li>
            )
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>
                    {move > 0 ? "Go to move #" + move : "Go to game start"}
                </button>
            </li>
        )
    })

    return (
        <div className='game'>
            <div className='game-board'>
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </div>
            <div className='game-info'>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}
