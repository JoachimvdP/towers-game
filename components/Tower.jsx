import React from "react"
import Menu from "./Menu"

export default function Tower(props) {

    const [points, setPoints] = React.useState({x: 0, y: 0,})

    function showContextMenu(setTowers, id) {
        console.log("show context menu for: " + id)
        setTowers(towers => towers.map(tower => 
            tower.id === id ? 
            {
                ...tower,
                showContextMenu: true,
            }
            : 
            {
                ...tower,
                showContextMenu: false,
            }
        ))
    }

    React.useEffect(() => {
        const handleClick = () => 
        props.setTowers(towers => towers.map(tower => {
            return (
                {
                    ...tower,
                    showContextMenu: false, 
                }
            )
        }))
        
        window.addEventListener("click", handleClick)
        return () => {
            window.removeEventListener("click", handleClick)
        }
    }, [])

    return (
        <>
        <div className="tower" 
             data-filled={props.isFilled} 
             onClick={() => props.handleClick(props.id)}
             onContextMenu={(e) => {
                e.preventDefault()
                showContextMenu(props.setTowers, props.id)
                setPoints({
                    x: e.pageX,
                    y: e.pageY,
                })
            }}>
            <p className="tower--value" 
               value={props.value}>
                    {props.value}
            </p>    
        </div>
            
            {props.showContextMenu && (
                <Menu top={points.y} left={points.x} setTowers={props.setTowers} id={props.id}/>                
            )}
        </>
    )
}