
import React from "react"
import Die from "./Die.js"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

export default function App() {

  const [dices, setDices]  = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(()=>{
    const allHeld = dices.every(die => die.isHeld)
    const firstValue = dices[0].value
    const allSameValue = dices.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
  }, dices);

  function generateDice(){
    return { 
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  
  function allNewDice(){
    
    let dice = [];
    for(let i=0; i<10; i++){
      dice.push(generateDice())
    }  
    return dice; 
  }

  function rollDice() {
    if(!tenzies){
      setDices(prevDice => {
          let newDice = []; 
          for(let i=0; i<prevDice.length; i++){
              let currentDice = prevDice[i]; 
              if(currentDice.isHeld === false){
                  newDice.push(generateDice())
              }else{
                  newDice.push(currentDice) 
              } 
          }
          return newDice; 
      })
    }else{
      setTenzies(false);
      setDices(allNewDice()); 
    }  
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

  const rollButton = tenzies? "New Game": "Roll" 


    return (
        <main>
          {tenzies && <Confetti />}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dies-container">
            {diecesElements}
          </div>
          <button className="roll-dice" onClick={rollDice}>{rollButton}</button>
        </main>
    )
}
