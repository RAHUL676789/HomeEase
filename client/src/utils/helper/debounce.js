
import { useRef } from "react";


export const debounce = (func,delay)=>{
 let timer = useRef(null)
    
    return (...args)=>{
        console.log(args)
        if(timer?.current) clearTimeout(timer?.current);
        timer.current = setTimeout(()=>{func(...args)
             console.log("function calling")},delay)
    }

    
}