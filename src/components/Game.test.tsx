import { fireEvent, render, screen } from "@testing-library/react"
import Game from "./Game"

describe("Game", () => {
    test("first turn X, on click change square value to X", () => {
        render(<Game />)

        fireEvent.click(screen.getAllByTestId("square")[0])

        expect(screen.getAllByTestId("square")[0].textContent).toBe("X")
    })

    test("second turn O, on click change square value to O", () => {
        render(<Game />)

        fireEvent.click(screen.getAllByTestId("square")[0])
        fireEvent.click(screen.getAllByTestId("square")[1])
        expect(screen.getAllByTestId("square")[1].textContent).toBe("O")
    })

    test("cannot change square when it has already a value", () => {
        render(<Game />)

        fireEvent.click(screen.getAllByTestId("square")[0])
        fireEvent.click(screen.getAllByTestId("square")[0])

        expect(screen.getAllByTestId("square")[0].textContent).toBe("X")
    })

    test("calculate winner", () => {
        render(<Game />)

        fireEvent.click(screen.getAllByTestId("square")[0])
        fireEvent.click(screen.getAllByTestId("square")[5])
        fireEvent.click(screen.getAllByTestId("square")[1])
        fireEvent.click(screen.getAllByTestId("square")[7])
        fireEvent.click(screen.getAllByTestId("square")[2])

        expect(screen.getByText("Winner: X")).toBeDefined()
    })

    test("go back to move", () => {
        render(<Game />)

        fireEvent.click(screen.getAllByTestId("square")[0])
        fireEvent.click(screen.getAllByTestId("square")[5])
        fireEvent.click(screen.getAllByTestId("square")[1])
        fireEvent.click(screen.getAllByTestId("square")[7])

        fireEvent.click(screen.getByRole("button", { name: "Go to move #2" }))

        expect(screen.getAllByTestId("square")[0].textContent).toBe("X")

        expect(screen.getAllByTestId("square")[5].textContent).toBe("O")
        expect(
            screen.getAllByTestId("square").filter(value => !value.textContent)
                .length
        ).toBe(7)
    })

    test("go to game start", () => {
        render(<Game />)

        fireEvent.click(screen.getAllByTestId("square")[0])
        fireEvent.click(screen.getAllByTestId("square")[5])
        fireEvent.click(screen.getAllByTestId("square")[1])
        fireEvent.click(screen.getAllByTestId("square")[7])

        fireEvent.click(
            screen.getByRole("button", { name: "Go to game start" })
        )
        expect(
            screen.getAllByTestId("square").filter(value => !value.textContent)
                .length
        ).toBe(9)
    })
})