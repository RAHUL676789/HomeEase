import React,{useEffect} from 'react'

const PartnerViewBooking = ({booking}) => {

    useEffect(()=>{
        const body = document.querySelector("body");
        body.style.overflow="hidden"
        return ()=>body.style.overflow = "auto" 
    },[])
  return (
    <div className='bg-black/20 fixed inset-0 z-50'>

        <div className='mx-auto h-screen w-full md:w-[75%] bg-white overflow-scroll no-scrollbar'>
            <header className='py-3 px-2 flex justify-between sticky top-0 bg-white'>
                <h1 className='text-xl font-semibold'>ViewBookings</h1>
                <i className='ri-close-line text-lg'></i>
            </header>
            <main>
                <div>

                    <div>
                        <div className='uppercase'>{(booking?.user?.fullName[0]+booking?.user?.fullName[1])|| "NA"}</div>
                    </div>

                </div>
            </main>

        </div>
      
    </div>
  )
}

export default PartnerViewBooking
