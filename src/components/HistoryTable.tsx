import { useState } from "react"

interface HistoryTableProps {
    squares: Array<string | null>
}

export default function HistoryTable({ squares }: HistoryTableProps) {
    const [showTable, setShowTable] = useState(false)

    function handleClick() {
        setShowTable(!showTable)
    }

    return (
        <>
            <button className='history-table' onClick={handleClick}>
                {showTable ? "⌃" : "⌄"}
            </button>

            {showTable && (
                <table>
                    {[...Array(3)].map((_, row) => (
                        <tr key={row}>
                            {[...Array(3)].map((_, column) => (
                                <td>{squares[column + row * 3]}</td>
                            ))}
                        </tr>
                    ))}
                </table>
            )}
        </>
    )
}
