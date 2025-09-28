import React, { useEffect,useRef,useState } from 'react'
import cleaning from "../../assets/Beauty.svg"
import Button from '../buttons/Button';

const PartnerBookingCard = ({booking,setViewBookingItem}) => {
  const [ViewCardOptions, setViewCardOptions] = useState(false);
  const optionRef = useRef(null);
 
  const iconsName = booking?.user?.fullName[0] + booking?.user?.fullName[1]
 
  useEffect(()=>{
    const handleMouseDown  = (e)=>{
      console.log(e.currentTarget !== optionRef.current)
      if((e.currentTarget !== optionRef?.current) && ViewCardOptions){
        console.log("click")
          setViewCardOptions(false)
      }
    }

    window.addEventListener("click",handleMouseDown)
    return ()=>window.removeEventListener("click",handleMouseDown)
  },[ViewCardOptions])

  return (
    <div className='rounded-xl shadow-sm shadow-gray-400 relative max-h-[96vh] '>
    <header className='w-full flex rounded-t-xl  border py-3 px-1 relative bg-teal-700 text-white'>

      <div className='flex gap-1 justify-center items-center'>
        <div className='h-10 w-10 border flex justify-center items-center flex-col rounded-full bg-white text-teal-900 font-semibold uppercase'>{iconsName}</div>
        <div className='flex flex-col leading-3 justify-start text-sm items-start'>
          <span>Rahul lodhi</span>
          <span className='font-semibold'>{booking?.user?.email}</span>
        </div>
      </div>

      <div className='flex justify-center items-center  flex-1 mt-2'>
        <span className='px-3 rounded-xl bg-yellow-500 font-semibold'>{booking.status}</span>
      
      </div>
        <span className='text-xs font-semibold text-white absolute right-2 top-1'><i className="ri-more-2-line text-lg" ref={optionRef} onClick={(e)=>{
          e.stopPropagation();
        setViewCardOptions((prev)=>prev == true ? false : true )
        }}></i></span>

    </header>
    <main className='flex flex-col rounded-xl py-3 '>
      <div className='w-full'>
        <img src={cleaning} alt="" className='h-48 w-full object-cover '/>
        <div className=' rounded-b-xl flex-col  px-3 flex flex-wrap'>
          <p><strong>Category </strong>{booking?.service?.category}</p>
          <p><strong>Price </strong>{booking?.service?.price}</p>
          <p><strong>description </strong>{booking?.service?.description}</p>
      
        </div>
      </div>
      <div className=' flex justify-end px-5'>
        <Button variant={"next"}>Chat</Button>
      </div>
    </main>

    
     {ViewCardOptions &&  <div className='absolute top-2 rounded-lg bg-gray-50  right-5'>
       <ul className='flex flex-col '>
        <li onClick={()=>setViewBookingItem(booking)} className='w-full rounded-lg cursor-pointer px-3 py-1  hover:shadow hover:shadow-gray-500 transition-all duration-150'>view-more</li>
        <li className='w-full  rounded-lg  cursor-pointer  px-3 py-1  hover:shadow hover:shadow-gray-500 transition-all duration-150'>accept</li>
        <li className='w-full cursor-pointer  px-3 py-1  hover:shadow hover:shadow-gray-500  rounded-lg  transition-all duration-150'>reject</li>
       </ul>
        
      </div>}
 
      
    </div>
  )
}

export default PartnerBookingCard
