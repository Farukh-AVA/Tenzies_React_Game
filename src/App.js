/**
 * Extra Credit
 X CSS: put real dots on the dice. 
 X CSS: added animation 
 X Track the number of rolls 
 X Track the time it took to win
 X Sava your best time to localStorage
 X Track the number of roll
 X Sava your best number of roll to localStorage
 */



import React from "react"
import Die from "./Die.js"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

export default function App() {

  const [dices, setDices]  = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [countRolls, setCountRolls] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [isTimeRunning, setIsTimeRunning] = React.useState(false);
  const [bestTime, setBestTime] = React.useState(JSON.parse(localStorage.getItem("bestTime")) || Number.MAX_VALUE); 
  const [bestRolls, setBestRolls] = React.useState(JSON.parse(localStorage.getItem("bestRolls")) || Number.MAX_VALUE);
  React.useEffect(() => {
    let intervalId;

    if (isTimeRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isTimeRunning]);

  React.useEffect(()=>{
    const allHeld = dices.every(die => die.isHeld)
    const firstValue = dices[0].value
    const allSameValue = dices.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true);
        setIsTimeRunning(false); 
        setBestTime(prevBestTime =>{
          return prevBestTime < time? prevBestTime: time
        })
        setBestRolls(prevBestRolls =>{
          return prevBestRolls < countRolls? prevBestRolls: countRolls
        })
    }
  }, dices);

  React.useEffect(()=>{
    localStorage.setItem("bestTime", JSON.stringify(bestTime))
    localStorage.setItem("bestRolls", JSON.stringify(bestRolls))
  }, [tenzies])

  console.log(bestTime); 

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${padTime(minutes)}:${padTime(seconds)}`;
  }
  function padTime(time) {
    return time.toString().padStart(2, '0');
  }

  
  function counter(){
    setCountRolls(prevCountRolls => prevCountRolls+=1)
  }
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
      counter();
      setIsTimeRunning(true) 
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
      setCountRolls(0); 
      setIsTimeRunning(false);  
    }  
}

  function holdDice(id){
    setIsTimeRunning(true); 
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

  let showTimer = formatTime(time);
  let showBestTime = formatTime(bestTime);
   
  function rollButton(){
    if(!tenzies && countRolls === 0){
      return "Roll"
    }else if(!tenzies && countRolls > 0){
      return "Roll: "+countRolls
    }else{
      return "New Game"
    }
  }
  

    return (

          <main className="main"> 
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            {!tenzies && (<div className="timer">{showTimer}</div>)}
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dies-container">
              {diecesElements}
            </div>
            <button className="roll-dice" onClick={rollDice}><div className="rollText">{rollButton()}</div></button>
            {tenzies && (
              <div >
                <div className="score">🫵⏲️{showTimer} 🎲{countRolls}🫵</div> 
                 <div className="highestScore">🥇⏲️{showBestTime} 🎲{bestRolls}🥇 </div>
              </div>
            )}
          </main>
    )
}
