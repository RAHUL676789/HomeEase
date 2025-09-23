import React ,{useState} from 'react'
import ServiceCard from '../../Components/Service/ServiceCard'
import PartnerBookingCard from '../../Components/Parterner/PartnerBookingCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PartnerViewBooking from '../../Components/Parterner/PartnerViewBooking'

const PartnerBookings = () => {

    const {partner} = useSelector((state)=>state.partner);
    const navigate = useNavigate()
    

    if(!partner){
       navigate("/login")
    }

let {bookings} = partner;
const [viewBooking, setviewBooking] = useState(null)

    return (
        <div className='bg-gray-50 h-screen w-screen'>
            {<PartnerViewBooking/>}

            <div className='flex gap-6 max-w-[100vw] px-3'>
                {/* left-panel */}
                <div className=' w-64 h-screen overflow-scroll no-scrollbar bg-white shadow-sm shadow-gray-400 hidden md:block'>
                    <header className='bg-gray-100 shadow shadow-gray-200 rounded'>
                        <div className='flex px-1 gap-1 py-3 '>
                            <div className=' h-12 w-12 bg-teal-700 font-semibold text-xl text-white flex justify-center items-center flex-col rounded-full'>
                                RA
                            </div>
                            <div className=' flex flex-col items-start justify-center leading-3 text-sm overflow-scroll no-scrollbar'>
                                <span>Rahul Lodhi</span>
                                <span className='font-semibold'>rahullodhi3814@gmail.com</span>
                            </div>
                        </div>
                    </header>
                    <main className='px-1 py-2'>
                        <div>

                            <div>
                                <div className='flex flex-col'>


                                    <h3 className='text-lg font-semibold text-teal-700  border-b '>Status</h3>
                                    {["Accepted", "Rejected", "Request", "Pending"].map((item, i) => (
                                        <label className='m-1 shadow-sm shadow-gray-200 hover:shadow-gray-400 transition-all duration-150 py-2 px-3 rounded '>
                                            <input type="checkbox" name='status' className='accent-teal-400 m-1 ' />
                                            {item}

                                        </label>
                                    ))}
                                </div>
                                <div className='flex flex-col'>

                     

                                    <h3 className='font-semibold text-lg  text-teal-700 border-b'>Category</h3>
                                    {["Cleaing", "plumber", "beauty","car-wash"].map((item, i) => (
                                        <label className='m-1 shadow-sm shadow-gray-200 hover:shadow-gray-400 transition-all duration-150 py-2 px-3 rounded '>
                                            <input type="checkbox" name='Category' className='accent-teal-400 p-3 m-1' />
                                            {item}

                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                {/* right panel */}
                <div className=' flex-1 overflow-scroll no-scrollbar max-h-screen '>
                  <header className='w-[90%] mx-auto shadow-sm shadow-gray-500  rounded-3xl  mt-3'>
                  
                        <input type="text" placeholder='search here...' className=' bg-white outline-0 px-5 py-3 w-full rounded-3xl' />
                       
                
                  </header>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-3'>

                {bookings?.map((booking,i)=>(
                    <PartnerBookingCard booking={booking} key={booking._id}/>
                ))}
                 
                  </div>


                </div>

            </div>

        </div>
    )
}

export default PartnerBookings
