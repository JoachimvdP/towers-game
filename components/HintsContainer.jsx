import React from "react"
import Hint from "./Hint"

export default function HintsContainer(props) {

    function topHints(hints) {
        let elements = []

        for(let i = 0; i < 5; i++) {
            let hint = hints[i]

             if(hint.position === "top") {
                elements.push(
                    <Hint
                        key={hint.id}
                        hint={hint.hint}
                        position={hint.position}
                    />
                ) 
            }
        }
        return elements
    }

    function rightHints(hints) {
        let elements = []

        for(let i = 5; i < 10; i++) {
            let hint = hints[i]

             if(hint.position === "right") {
                elements.push(
                    <Hint
                        key={hint.id}
                        hint={hint.hint}
                        position={hint.position}
                    />
                ) 
            }
        }
        return elements
    }

    function bottomHints(hints) {
        let elements = []

        for(let i = 10; i < 15; i++) {
            let hint = hints[i]

             if(hint.position === "bottom") {
                elements.push(
                    <Hint
                        key={hint.id}
                        hint={hint.hint}
                        position={hint.position}
                    />
                ) 
            }
        }
        return elements
    }

    function leftHints(hints) {
        let elements = []

        for(let i = 15; i < 20; i++) {
            let hint = hints[i]

             if(hint.position === "left") {
                elements.push(
                    <Hint
                        key={hint.id}
                        hint={hint.hint}
                        position={hint.position}
                    />
                ) 
            }
        }
        return elements
    }

    return (
        <>
            <div className="hints hints--top">
                {topHints(props.hints)}
            </div>
            <div className="hints hints--right">
                {rightHints(props.hints)}
            </div>
            <div className="hints hints--bottom">
                {bottomHints(props.hints)}
            </div>
            <div className="hints hints--left">
                {leftHints(props.hints)}
            </div>
        </>
    )
}