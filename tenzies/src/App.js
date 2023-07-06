
import React from "react"
import Die from "./Die.js"
export default function App() {

  const [dices, setDices]  = React.useState(allNewDice());

  
  function allNewDice(){
    
    let randomNum = [];
    let max = 6;
    let min = 1; 
    for(let i=0; i<10; i++){
      randomNum[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return randomNum; 
  }

  function generateDices(){

    setDices(() => allNewDice())
  }

  const diecesElements =   dices.map(dice => <Die  value = {dice}/>)

    return (
        <main>
          <div className="dies-container">
            {diecesElements}
          </div>
          <button className="roll-dice" onClick={generateDices}>Roll</button>
        </main>
    )
}
