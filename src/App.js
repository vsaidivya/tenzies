import React from "react";
import Play from "./Play";

export default function App(){
  const [dice , setdice] = React.useState(allnewdice())
  const [tenzies,settenzies] = React.useState(false)
  const [count , setcount] = React.useState(0)
  const [best , setbest] = React.useState(localStorage.getItem("leastrolls"))

  function allnewdice(){
    const newdice =[]
    for(let i=0;i<10;i++){
      newdice.push({
        value:Math.ceil(Math.random()*6),
        islocked:false,
        id:i
      })
    }
    return newdice
  }

  React.useEffect(()=>{
    const islocked = dice.every(die => die.islocked)
    const first = dice[0].value
    const rest = dice.every(die => die.value===first)
    if(islocked && rest){
      settenzies(true)
    }

  }, [dice])

  function rollthedice(){
    if(!tenzies){
      setcount(count+1)
      setdice(prevdata=> {
        return prevdata.map(eachbox=>{
          return  eachbox.islocked? eachbox : {...eachbox , value: Math.ceil(Math.random()*6)} 
        })
      })
    }
    else{
      setcount(0)
      settenzies(false)
      setdice(allnewdice())
    }
  }

  React.useEffect(()=>{
    if(count<best){
      setbest(count)
      localStorage.setItem("leastrolls", JSON.stringify(count));
    }
  })

  function lockthedie(id){
    setdice(prevdata=>{
      return prevdata.map(eachsquare=>{
        return eachsquare.id===id? {...eachsquare , islocked:!eachsquare.islocked} : eachsquare
      })
    })
  }

  const playdice = dice.map(eachdie => <Play value={eachdie.value} key={eachdie.id} islocked={eachdie.islocked} 
    handle={()=>lockthedie(eachdie.id)} />)

  return (
    <div>
      <div className="dicebox" >{playdice}</div>
      <button className="roll" onClick={rollthedice} >{tenzies? "New Game" : "ROLL"}</button>
      {tenzies && <h3 className="final" >You made it in {count} rolls </h3> }
      
    </div>
  )
}