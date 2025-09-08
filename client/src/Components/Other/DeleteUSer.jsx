import React, { useEffect,useState } from 'react'
import Button from '../buttons/Button';

const DeleteUSer = ({user,cancel,deleteUser}) => {
    const [isDisable, setisDisable] = useState(true);
    const [inpValue, setinpValue] = useState("");
    console.log(user)
    useEffect(()=>{
        const body = document.querySelector("body");
        body.style.overflow="hidden";
        return ()=>body.style.overflow="auto"
    },[])


    useEffect(()=>{
        if(inpValue.trim() === user?.fullName?.trim()){
            setisDisable(false)
        }else{

            setisDisable(true)
        }

    },[inpValue])
   

  return (
    <div className='fixed inset-0 bg-black/20 h-screen w-screen flex justify-center flex-col items-center z-50'>
        <div className='h-48 w-96 bg-zinc-900 text-white px-6 py-2 shadow-sm shadow-gray-50 rounded-lg flex flex-col gap-5 '>

          <div className='flex flex-col gap-3'>
              <h1 className='text-lg font-medium'>Do You Really Want To Profile type <span className='text-red-800 select-none'>{user?.fullName}</span> To Confirm</h1>
            <input onChange={(e)=>setinpValue(e.target.value)} type="text" className='px-4 py-2 text-sm border-none outline-0 font-semibold rounded-lg bg-gray-100 text-black' placeholder='Type here...'/>
          </div>
          <div className='flex justify-between'>
          
            <Button type="delete" children="Delete"  onClick={()=>deleteUser()} disabled={isDisable} />
            <Button disabled={false} type="cancel" children="Cancel" onClick={()=>cancel()} />
          </div>

        </div>

      
    </div>
  )
}

export default DeleteUSer
