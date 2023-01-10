import Square from "./Square"

interface BoardProps {
    xIsNext: boolean
    squares: Array<string | null>
    onPlay: (nextSquares: Array<string | null>) => void
}

export default function Board({ xIsNext, squares, onPlay }: BoardProps) {
    function handleClick(i: number) {
        if (squares[i] || calculateWinner(squares)) {
            return
        }
        const nextSquares = squares.slice()
        if (xIsNext) {
            nextSquares[i] = "X"
        } else {
            nextSquares[i] = "O"
        }
        onPlay(nextSquares)
    }

    const winner = calculateWinner(squares)
    let status
    if (winner) {
        status = "Winner: " + winner
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O")
    }

    return (
        <>
            <div className='status'>{status}</div>
            {[...Array(3)].map((_, row) => (
                <div className='board-row' key={row}>
                    {[...Array(3)].map((_, column) => (
                        <Square
                            value={squares[column + row * 3]}
                            onSquareClick={() => handleClick(column + row * 3)}
                            key={column + row * 3}
                        />
                    ))}
                </div>
            ))}
        </>
    )
}

function calculateWinner(squares: Array<string | null>) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a]
        }
    }
    return null
}
