import { fireEvent, render, screen, within } from "@testing-library/react"
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

    test("Win case", () => {
        render(<Game />)

        fireEvent.click(screen.getAllByTestId("square")[0])
        fireEvent.click(screen.getAllByTestId("square")[5])
        fireEvent.click(screen.getAllByTestId("square")[1])
        fireEvent.click(screen.getAllByTestId("square")[7])
        fireEvent.click(screen.getAllByTestId("square")[2])

        expect(screen.getByText("Winner: X")).toBeDefined()
        expect(
            screen.getAllByTestId("square")[0].classList.contains("winner")
        ).toBeTruthy()
        expect(
            screen.getAllByTestId("square")[1].classList.contains("winner")
        ).toBeTruthy()
        expect(
            screen.getAllByTestId("square")[2].classList.contains("winner")
        ).toBeTruthy()
    })

    test("Draw case", () => {
        render(<Game />)

        fireEvent.click(screen.getAllByTestId("square")[0])
        fireEvent.click(screen.getAllByTestId("square")[2])
        fireEvent.click(screen.getAllByTestId("square")[1])
        fireEvent.click(screen.getAllByTestId("square")[3])
        fireEvent.click(screen.getAllByTestId("square")[5])
        fireEvent.click(screen.getAllByTestId("square")[4])
        fireEvent.click(screen.getAllByTestId("square")[6])
        fireEvent.click(screen.getAllByTestId("square")[7])
        fireEvent.click(screen.getAllByTestId("square")[8])

        expect(screen.getByText("Draw")).toBeDefined()
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

    test("change game history to desc order", () => {
        render(<Game />)

        fireEvent.click(screen.getAllByTestId("square")[0])
        fireEvent.click(screen.getAllByTestId("square")[5])

        fireEvent.click(screen.getByRole("button", { name: "▲" }))

        expect(screen.getByRole("button", { name: "▼" })).toBeDefined()

        const movesList = screen.getByRole("list", {
            name: /moves/i,
        })

        const { getAllByRole } = within(movesList)

        const items = getAllByRole("listitem")

        expect(items[0].textContent).toBe("You are at move #2")
        expect(items[1].textContent).toBe("Go to move #1⌄")
        expect(items[2].textContent).toBe("Go to game start⌄")
    })

    test("change back game history to asc order", () => {
        render(<Game />)

        fireEvent.click(screen.getAllByTestId("square")[0])
        fireEvent.click(screen.getAllByTestId("square")[5])

        fireEvent.click(screen.getByRole("button", { name: "▲" }))
        fireEvent.click(screen.getByRole("button", { name: "▼" }))

        const movesList = screen.getByRole("list", {
            name: /moves/i,
        })

        const { getAllByRole } = within(movesList)

        const items = getAllByRole("listitem")

        expect(items[0].textContent).toBe("Go to game start⌄")
        expect(items[1].textContent).toBe("Go to move #1⌄")
        expect(items[2].textContent).toBe("You are at move #2")
    })
})
