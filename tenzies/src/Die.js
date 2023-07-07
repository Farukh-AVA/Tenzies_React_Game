import React from "react"

export default function Die(props){

    const styles = {
        backgroundColor: props.dieObj.isHeld ? "#59E391": "white"
    }

    return (
        <div 
            style={styles} 
            className="die"
            onClick={props.holdDice}
        >
            <h2 className="die-num">{props.dieObj.value}</h2>
        </div>
    )
}