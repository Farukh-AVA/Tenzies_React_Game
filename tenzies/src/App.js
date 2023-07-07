
import React from "react"
import Die from "./Die.js"
import { nanoid } from 'nanoid'
export default function App() {

  const [dices, setDices]  = React.useState(allNewDice());

  
  function allNewDice(){
    
    let dice = [];
    let max = 6;
    let min = 1; 
    for(let i=0; i<10; i++){
      let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      dice[i] = {value: randomNum, 
        isHeld: false,
        id: nanoid()
      } 
    }
    return dice; 
  }

  function generateDices(){

    setDices(() => allNewDice())
  }

  function holdDice(id){
    setDices(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
  }))
  }

  const diecesElements =   dices.map(dice => 
  <Die 
    key = {dice.id} 
    dieObj = {dice}
    holdDice = {() => holdDice(dice.id)}
  />)


    return (
        <main>
          <div className="dies-container">
            {diecesElements}
          </div>
          <button className="roll-dice" onClick={generateDices}>Roll</button>
        </main>
    )
}
