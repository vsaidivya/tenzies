import React from "react";

export default function Play(props){
   const name=  props.islocked? "lock" : "die"
    return (
        <div className={name} onClick={props.handle} >
            <h1>{props.value}</h1>
        </div>
    )
}