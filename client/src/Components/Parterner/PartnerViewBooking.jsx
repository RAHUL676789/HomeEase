import React, { useEffect } from 'react'
import Button from '../buttons/Button';
import { socket } from '../../socket/socket';

const PartnerViewBooking = ({ booking, handleSetViewItem }) => {
    console.log(booking)

    useEffect(() => {
        const body = document.querySelector("body");
        body.style.overflow = "hidden"
        return () => body.style.overflow = "auto"
    }, [])


    const handleAcceptBooking = (bookingId)=>{
             console.log(bookingId,"bookingId")
             socket.emit("accept-booking",{
                bookingId,
                provider:booking?.provider,
                user:booking?.user?._id
             })
    }

    return (
        <div className='bg-black/20 fixed inset-0 z-50'>

            <div className='mx-auto h-screen w-full md:w-[75%] bg-white overflow-scroll  relative rounded-sm'>
                <header className='py-3 px-2 flex justify-between sticky top-0 bg-white border-b b border-b-gray-300'>
                    <h1 className='text-xl font-semibold'>ViewBookings</h1>
                    <i onClick={() => handleSetViewItem(null)} className='ri-close-line text-lg'></i>
                </header>
                <main>
                    <div className='flex flex-col '>

                        <div className='flex-1 flex  items-center gap-1 py-3 px-2'>

                            <div className='uppercase h-12 w-12 border flex justify-center items-center flex-col rounded-full bg-teal-900 text-white font-semibold'>

                                {(booking?.user?.fullName[0] + booking?.user?.fullName[1]) || "NA"}

                            </div>
                            <div className='flex  flex-col leading-3 text-sm'>
                                <span>{booking?.user?.fullName || "unknonwn"}</span>
                                <span className='font-medium'>{booking?.user?.email || "unknown@gmail.com"}</span>
                            </div>
                            <div
                                style={{ backgroundColor: booking?.status === "pending" ? "yellow" : booking?.status === "accept" ? "green" : "red" }}
                                className='ml-auto  px-3 py-0.5 rounded-2xl font-semibold'>
                                {booking?.status || "NA"}

                            </div>

                            <span className='text-xs text-gray-400'>{new Date(booking?.service?.updatedAt).toDateString()}</span>

                        </div>

                        <div className='px-3 min-h-[60vh] flex-col flex flex-wrap '>
                            <div>
                                <p><strong>title </strong>{booking?.service?.title || "NA"}</p>
                                <p><strong>description </strong>{booking?.service?.description || "NA"}</p>
                            </div>
                            <div>
                                <p><strong>Category </strong>{booking?.service?.category || "NA"}</p>
                                <p><strong>price </strong> &#8377;{booking?.service?.price || "NA"}</p>

                            </div>
                            <div>
                                <p><strong>duration </strong>{booking?.service?.duration || "NA"}</p>
                                <p><strong>discout </strong> {booking?.service?.discount || "0"} %Off</p>

                            </div>
                            <div>
                                <p><strong>AvailableDays </strong>{booking?.service?.availableDays?.join(" ") || "NA"}</p>
                                <p><strong>price </strong> &#8377;{booking?.service?.price || "NA"}</p>

                            </div>
                        </div>
                        <div className='flex-1  '>


                            {booking?.details ?
                                <div className='px-3 mt-3 '>
                                    <h3 className='text-lg text-gray-400  font-medium'>Addtional Details</h3>
                                    <p><strong>OfferPayment </strong> <span className='font-bold'>&#8377;</span>{booking?.details?.offerPayment || 345} </p>
                                    <p><strong>Prefer-Day </strong>{booking?.details?.preferdDay || "monday"}</p>
                                    <p><strong>OfferDuration </strong>{booking?.details?.OfferDuration || "4hour"}</p>
                                    <p><strong>Message </strong>{booking?.details?.notes || "i am waiting for you"}</p>

                                </div> : <div className='px-3 mt-3  '>
                                    <h3 className='text-lg font-semibold text-gray-400 mb-3 flex-1'>No Additonal Details Availables</h3></div>}

                        </div>

                    </div>

                    <div className='flex gap-2  items-center   w-full justify-center pt-3 
                 px-3   '>
                        <Button onClick={()=>handleAcceptBooking(booking._id)} variant={"apply"}>Accept</Button>
                        <Button variant={"delete"}>Reject</Button>
                     
                           <div className='ml-auto'>
                             <Button variant={"next"}>Chat</Button>
                           </div>
                
                        
                    </div>



                </main>



            </div>



        </div>
    )
}

export default PartnerViewBooking
