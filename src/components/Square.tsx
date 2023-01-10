interface SquareProps {
    value: string | null
    onSquareClick: () => void
    winner: boolean
}

export default function Square({ value, onSquareClick, winner }: SquareProps) {
    return (
        <button
            className={`${value ? `${value}` : ""} ${
                winner ? "winner" : ""
            } square`}
            onClick={onSquareClick}
            data-testid='square'
        >
            {value}
        </button>
    )
}
