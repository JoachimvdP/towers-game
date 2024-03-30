import React from "react"

export default function Menu(props) {

    function handleClick(id, setTowers, e) {
        setTowers(towers => towers.map(tower => 
            tower.id === id ? {
                ...tower,
                value: e.target.value,
                isFilled: e.target.value === 0 ? false : true
            } 
            : tower
        ))
    }
     
    return (
        <>
        <div className="menu--context" style={{top: props.top, left: props.left}}>
            <ul>
                {/* <li onClick={(e) => handleClick(props.id, props.setTowers, e)} value={0}>0</li> */}
                <li onClick={(e) => handleClick(props.id, props.setTowers, e)} value={1}>1</li>
                <li onClick={(e) => handleClick(props.id, props.setTowers, e)} value={2}>2</li>
                <li onClick={(e) => handleClick(props.id, props.setTowers, e)} value={3}>3</li>
                <li onClick={(e) => handleClick(props.id, props.setTowers, e)} value={4}>4</li>
                <li onClick={(e) => handleClick(props.id, props.setTowers, e)} value={5}>5</li>
            </ul>
        </div>
        </>
    )
}