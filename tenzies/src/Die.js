import React from "react"
import Dots from "./Dots.js" 

export default function Die(props){

    const styles = {
        backgroundColor: props.dieObj.isHeld ? "#59E391": "white"
    }
/**    
    function numToDots(){
        let num = props.dieObj.value;
        for(let i=1; i<7; i++){
            if(i === num)
        }
    }
*/ 
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