import React from 'react'
import Button from '../buttons/Button'

const PartnerBookingCancel = ({booking, cancelAndDelete,close}) => {
    console.log(booking)
  return (
    <div className='h-screen w-screen bg-black/20 z-50 fixed inset-0 flex flex-col justify-center items-center'>

        <div className='shadow-md z-50  border-black bg-white rounded shadow-gray-600 px-3 py-2 flex flex-col gap-5'>
            <h2 className='font-semibold text-lg'>Do you really want to cancel the booking ?</h2>
            <div className='w-full  py-2 flex justify-between items-center '>
           
                <Button onClick={()=>cancelAndDelete(booking)} variant={"delete"} children={"cancel and delete"}/>
                <Button onClick={close} variant={"next"} children={"close"}/>
            </div>
        </div>

      
    </div>
  )
}

export default PartnerBookingCancel
