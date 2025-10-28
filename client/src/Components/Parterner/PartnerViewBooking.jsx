import React, { useEffect, useState } from 'react'
import Button from '../buttons/Button';
import { socket } from '../../socket/socket';
import PartnerUpcomingTimer from './PartnerUpcomingTimer';
import PartnerBookingCancel from './PartnerBookingCancel';
import axios from "../../utils/axios/axiosinstance.js"
import { setToast } from '../../redux/toastSlice.js';
import { useDispatch } from 'react-redux';
import { updatePartnerBooking, deletePartnerBooking } from '../../redux/partnerSlice.js';
import Loader from '../Other/Loader.jsx';



const PartnerViewBooking = ({ booking, handleSetViewItem }) => {
    console.log(booking)
    const [cancelModal, setcancelModal] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        const body = document.querySelector("body");
        body.style.overflow = "hidden"
        return () => body.style.overflow = "auto"
    }, [])

    const acceptedDateIsValidOrnot = (bookingDate) => {
        console.log("running")
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const bookDate = new Date(bookingDate);
        bookDate.setMinutes(bookDate.getMinutes() + bookDate.getTimezoneOffset());
        const diff = bookDate.getTime() - today.getTime();
        console.log(diff);
        if (diff < 0) {
            dispatch(setToast({ type: "warning", content: "you can't accept the meeting on today date" }))
            return true;
        }

        return false;

    }

    const handleCancelAndDelete = async (bookingId) => {

        try {
            setisLoading(true)
            const response = await axios.delete(`/api/bookings/${bookingId}`);
            console.log(response);
            dispatch(deletePartnerBooking(response?.data?.data));
            dispatch(setToast({ type: "success", content: response?.data?.message || "delete from db" }))
            handleSetViewItem(null)


        } catch (error) {
            console.log(error, "this error comes from while deleting the booking")
            dispatch(setToast({ type: "error", content: error.message || "someting went wrong" }))
        } finally {
            setisLoading(false)
        }


    }



    const updateBooking = async (booking, updates) => {
         if(updates.status === "accepted"){
            if (acceptedDateIsValidOrnot(booking.createdAt)) {
                return;
            };
         }
        try {
            setisLoading(true)
            const response = await axios.put(`/api/bookings/${booking?._id}`,updates);
            console.log(response?.data)
            dispatch(updatePartnerBooking(response?.data?.data))
            dispatch(setToast({ type: "success", content: response?.data?.message || "booking accepted" }))
            handleSetViewItem(null)
        } catch (error) {
            console.log(error, "this is error while accepeting the booking")
            dispatch(setToast({ type: "error", content: error?.message || "someting went wrong while accepting the booking" }))
        } finally {
            setisLoading(false)
        }

    }


    return (
        <div className='bg-black/20 fixed inset-0 z-50'>
            {isLoading && <Loader />}
            {cancelModal && <PartnerBookingCancel cancelAndDelete={handleCancelAndDelete} close={() => setcancelModal(false)} booking={booking} />}
            <div className='mx-auto h-screen w-full md:w-[75%] bg-white overflow-hidden relative rounded-sm flex flex-col'>

                {/* Header */}
                <header className='py-3 px-2 flex justify-between sticky top-0 bg-white border-b border-b-gray-300'>
                    <h1 className='text-xl font-semibold'>ViewBookings</h1>
                    {booking?.status === "accepted" && (
                        <div>
                            <PartnerUpcomingTimer workingDate={booking?.details?.workingDate} />
                        </div>
                    )}
                    <i
                        onClick={() => handleSetViewItem(null)}
                        className='ri-close-line text-lg cursor-pointer'
                    ></i>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto pb-20 bg-white">
                    <div className="flex flex-col">

                        {/* User Header Section */}
                        <div className="flex items-center gap-3 py-4 px-3 border-b border-gray-200">
                            <div className="uppercase h-12 w-12 flex justify-center items-center rounded-full bg-teal-700 text-white text-lg font-semibold">
                                {(booking?.user?.fullName?.[0] + booking?.user?.fullName?.[1]) || "NA"}
                            </div>

                            <div className="flex flex-col text-sm">
                                <span className="font-semibold text-gray-800">
                                    {booking?.user?.fullName || "Unknown"}
                                </span>
                                <span className="text-gray-500">
                                    {booking?.user?.email || "unknown@gmail.com"}
                                </span>
                            </div>

                            <div
                                className={`ml-auto px-3 py-1 rounded-2xl text-xs font-semibold capitalize
                            ${booking?.status === "pending" ? "bg-yellow-400 text-black" :
                                        booking?.status === "accept" ? "bg-green-500 text-white" :
                                            "bg-red-500 text-white"}`}
                            >
                                {booking?.status || "NA"}
                            </div>
                        </div>

                        {/* Service Info */}
                        <div className="px-4 py-3 space-y-4 text-sm text-gray-700">

                            <div className="grid grid-cols-2 gap-y-1">
                                <p><strong className="text-teal-700">Title: </strong>{booking?.service?.title || "NA"}</p>
                                <p><strong className="text-teal-700">Description: </strong>{booking?.service?.description || "NA"}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-y-1">
                                <p><strong className="text-teal-700">Category: </strong>{booking?.service?.category || "NA"}</p>
                                <p><strong className="text-teal-700">Price: </strong>₹{booking?.service?.price || "NA"}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-y-1">
                                <p><strong className="text-teal-700">Duration: </strong>{booking?.service?.duration || "NA"}</p>
                                <p><strong className="text-teal-700">Discount: </strong>{booking?.service?.discount || "0"}% Off</p>
                            </div>

                            <div className="grid grid-cols-2 gap-y-1">
                                <p><strong className="text-teal-700">Available Days: </strong>{booking?.service?.availableDays?.join(", ") || "NA"}</p>
                                <p><strong className="text-teal-700">Created On: </strong>{new Date(booking?.createdAt).toDateString()}</p>
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="px-4 py-4 border-t border-gray-200">
                            {booking?.details ? (
                                <>
                                    <h3 className="text-lg text-teal-700 font-semibold mb-2">Additional Details</h3>
                                    <div className="space-y-1 text-gray-700 text-sm">
                                        <p><strong className="text-teal-700">Offer Payment: </strong>₹{booking?.details?.offerPayment || "NA"}</p>
                                        <p><strong className="text-teal-700">Preferred Day: </strong>{booking?.details?.preferdDay || "NA"}</p>
                                        <p><strong className="text-teal-700">Offer Duration: </strong>{booking?.details?.offerDuration || "NA"}</p>
                                        <p><strong className="text-teal-700">Message: </strong>{booking?.details?.notes || "NA"}</p>
                                        <p><strong className="text-teal-700">Working Date: </strong>{new Date(booking?.details?.workingDate).toLocaleDateString() || "NA"}</p>
                                    </div>
                                </>
                            ) : (
                                <h3 className="text-lg font-semibold text-gray-400">No Additional Details Available</h3>
                            )}
                        </div>

                    </div>
                </main>

                {/* Footer Fixed Buttons */}
                <div className='w-full bg-white border pt-2 pb-0 border-gray-300 px-3 flex gap-2 items-center justify-center sticky bottom-0'>
                    {booking.status === "pending" && booking.status !== "rejected" && (
                        <Button  onClick={() => updateBooking(booking,{status:"accepted"})} variant={"apply"}>
                            Accept
                        </Button>
                    )}
                    {booking.status !== "accepted" && booking.status !== "rejected" && (
                        <Button variant={"delete"} onClick={() => updateBooking(booking,{status:"rejected"})}>
                            Reject
                        </Button>
                    )}
                    {booking.status === "accepted" && (
                        <Button onClick={() => setcancelModal(true)} variant={"cancel"}>
                            Cancel
                        </Button>
                    )}
                    {booking.status === "rejected" && (
                        <Button onClick={() => setcancelModal(true)} variant={"delete"}>
                            Delete
                        </Button>
                    )}

                    <div className='ml-auto'>
                        <Button variant={"next"}>Chat</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PartnerViewBooking
