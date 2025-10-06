import React,{useState,useEffect} from 'react'

const PartnerUpcomingTimer = ({workingDate}) => {

     const [counterTime, setcounterTime] = useState(null)
     const [dateCounter, setdateCounter] = useState(null)

     useEffect(()=>{
      if(workingDate){
        const targetTimer = new Date(workingDate);
        const now = Date.now();
        const diff = (targetTimer - now) / 100;
        console.log(diff)
        if(diff < 0){
          console.log("time is not valid")
        }else{
          setcounterTime(Math.floor(diff));
        }
      }

     },[])

     useEffect(()=>{
      
     },[counterTime])
  return (
    <div className='w-24 py-2 px-3 bg-pink-400 '>

      
    </div>
  )
}

export default PartnerUpcomingTimer
