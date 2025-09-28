
import { useRef } from "react";


export const debounce = (func,delay)=>{
 let timer = null
    
    return (...args)=>{
        if(timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(()=>{func(...args)
             console.log("function calling")},delay)
    }

    
}