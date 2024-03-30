import React from "react"
import Tower from "./components/Tower"
import HintsContainer from "./components/HintsContainer"
import { nanoid } from "nanoid"
import { generateSolution, checkNumberOfTowers, checkAnswer, printField } from "./TowersLogic"

export default function App() {

    const [solution, setSolution] = React.useState(generateSolution)
    const [towers, setTowers] = React.useState(createTowers)
    const [hints, setHints] = React.useState(getHints(solution))
    const [hasWon, setWon] = React.useState(false)
    const [allFilled, setFilled] = React.useState(false)

    function getPlayerInput() {
        let playersAnswers = []
        let temp = []

        for (let i = 0; i < towers.length;) {

            for (let j = 0; j < 5; j++) {
                if (i < 5) {
                    temp.push(towers[i].value)
                    i++
                } else if (i >= 5 && i < 10) {
                    temp.push(towers[i].value)
                    i++
                } else if (i >= 10 && i < 15) {
                    temp.push(towers[i].value)
                    i++
                } else if (i >= 15 && i < 20) {
                    temp.push(towers[i].value)
                    i++
                } else if (i >= 20 && i < 25) {
                    temp.push(towers[i].value)
                    i++
                }
            }
            playersAnswers.push(temp)
            temp = []
        }

        return playersAnswers
        // console.log("Players answers: ")
        // console.log(playersAnswers)
        // return towers.map(tower => tower.value)
    }

    function getHints(solution) {
        let hints = checkNumberOfTowers(solution)

        hints = hints.map(hint => {
            return ({
                id: nanoid(),
                hint: hint,
                position: ""
            })
        })

        for (let i = 0; i < 20; i++) {
            if (i < 5) {
                hints[i].position = "top"
            } else if (i >= 5 && i < 10) {
                hints[i].position = "right"
            } else if (i >= 10 && i < 15) {
                hints[i].position = "bottom"
            } else {
                hints[i].position = "left"
            }
        }

        return hints
    }


    function createTowers() {
        let newArray = []

        for (let i = 0; i < 25; i++) {
            newArray.push({
                id: nanoid(),
                value: 0,
                isFilled: false,
                showContextMenu: false,
            })
        }
        return newArray
    }

    function handleClick(id) {
        setTowers(towers => towers.map(tower =>
            tower.id === id ?
                {
                    ...tower,
                    value: (tower.value < 5) ? tower.value + 1 : 0,
                    isFilled: tower.value + 1 > 0 && tower.value + 1 != 6 ? true : false
                }
                : tower
        ))

        // console.log("value: ")
        // towers.forEach(tower => tower.id === id ? console.log(tower.value) : "")
        // console.log("isFilled: ")
        // towers.forEach(tower => tower.id === id ? console.log(tower.isFilled) : "")
    }

    function newGame() {
        setWon(hasWon => !hasWon)

        let newSolution = generateSolution()
        console.log("New Game")

        setSolution(oldSolution => [...newSolution])
        setTowers(towers => towers.map(tower =>
            tower.value != 0 ?
                {
                    ...tower,
                    isFilled: false,
                    value: 0
                }
                : tower))
    }

    function resetTowers() {
        setTowers(towers => towers.map(tower =>
            tower.value != 0 ?
                {
                    ...tower,
                    isFilled: false,
                    value: 0
                }
                : tower))
    }

    const towerElements = towers.map(tower =>
        <Tower
            key={tower.id}
            id={tower.id}
            value={tower.value}
            handleClick={handleClick}
            isFilled={tower.isFilled}
            showContextMenu={tower.showContextMenu}
            setTowers={setTowers}
        />
    )

    let hintsElement = <HintsContainer hints={hints} />

    React.useEffect(() => {
        // console.log("solution changed")

        let newHints = checkNumberOfTowers(solution);

        setHints(hints => hints.map((hint, index) => ({
            ...hint,
            hint: newHints[index]
        })))

    }, [solution])

    React.useEffect(() => {
        // console.log("updating hints container")
        hintsElement = <HintsContainer hints={hints} />
    }, [hints])

    React.useEffect(() => {
        console.log("checking filled")
        towers.every(tower => tower.isFilled) ? setFilled(true) : setFilled(false)
    }, [towers])

    // console.log(solution)


    //Add a start screen explaining towers? Click start game, and load the app. 

    return (
        <main>
            {/* <MenuBar />  */}
            <div className="container">
                <div className="game--info">
                    <h1>{hasWon ? 'YOU WIN!' : 'TOWERS!'}</h1>
                    {/* <p>Hey, dit is towers. Het doel van het spel is om alle torens op de juiste plek te krijgen. In elk blokje komt een toren te staan van 1 tot 5 hoog.
                        In een willekeurige rij of kolom, mag hetzelfde nummer niet twee keer voorkomen. De nummers langs de kant geven aan hoeveel torens je vanaf die plek kunt zien.
                        Succes!</p> */}
                </div>
                <div className="game--container">
                    {hintsElement}
                    <div className="towers--container">
                        {towerElements}
                    </div>
                </div>
                <div className="buttons--container">
                    <button className="new-game"
                        onClick={resetTowers}>
                        Reset Towers
                    </button>
                    {hasWon ?
                        <button className="new-game"
                            onClick={newGame}>
                            New Game
                        </button>
                        :
                        <button className={`check-answer ${allFilled ? 'enabled' : 'disabled'}`}
                            disabled={!allFilled}
                            onClick={() => checkAnswer(getPlayerInput(), solution) ? setWon(hasWon => !hasWon) : setWon(hasWon => false)}>
                            Check Answer
                        </button>}
                </div>
            </div>
        </main>
    )
}