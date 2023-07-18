import React from "react"
import Dots from "./Dots.js" 


export default function Die(props){

    const styles = {
        backgroundColor: props.dieObj.isHeld ? "#4ea5db": "white"
    }
 
    return (
        <div 
            style={styles} 
            className="dice"
            onClick={props.holdDice}
        >
            <h2><Dots value={props.dieObj.value}/></h2>
        </div>
    )
}