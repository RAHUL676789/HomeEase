import {useState,useEffect} from "react"



export const useCountup = ({target = 0,duration = 0})=>{
   const [count, setcount] = useState(0);

   useEffect(()=>{
    let startTime = null;
    let startValue = null;

     const animate = (timeStamp)=>{
        if(!startTime) startTime = timeStamp;
        const progress = Math.min((startTime - target)/duration)

     }
   },[target,duration])
}