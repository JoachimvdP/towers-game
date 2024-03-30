import React from "react"

export default function Hint(props) {
    return (
        <div className="hint" data-position={props.position}>
            <p >{props.hint}</p>
        </div>
    )
}