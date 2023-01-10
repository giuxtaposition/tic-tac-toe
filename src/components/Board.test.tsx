import { render, screen } from "@testing-library/react"
import Board from "./Board"

describe("Board", () => {
    test("render board squares number correctly", () => {
        render(
            <Board
                xIsNext={false}
                squares={Array(9).fill(null)}
                onPlay={jest.fn()}
            />
        )

        expect(screen.getAllByTestId("square").length).toBe(9)
    })

    test("render board squares correctly", () => {
        render(
            <Board
                xIsNext={false}
                squares={[null, null, "X", "X", "X", "O", "O", null, null]}
                onPlay={jest.fn()}
            />
        )

        let squares = screen.getAllByTestId("square")
        expect(squares.filter(value => value.textContent === "X").length).toBe(
            3
        )
        expect(squares.filter(value => value.textContent === "O").length).toBe(
            2
        )
    })
})
