import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import axios from "../../utils/axios/axiosinstance.js"

const PartnerServiceModal = ({modal,handleAddService}) => {
  const daysOptions = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const [tagName, settagName] = useState("")
  useEffect(() => {
    let body = document.querySelector("body");
    body.style.overflow = "hidden"

    return ()=>{
      body.style.overflow = "auto"
    }
  }, [])

  const {handleSubmit,register,formState:{errors}} = useForm();

  const [tag, setTag] = useState([]);


  const handleTagKeyDown = (e) => {
    console.log(tagName)

    if ((e.key === "Enter" || e.key === " ") && tagName.trim() != "") {
      console.log(e);
      e.preventDefault();
      if (!tag.includes(tagName.trim())) {
        setTag([...tag, tagName.trim()]);
      }
      settagName("")

      console.log(tag)
    }

 
  }




  const handleCrossClick = (e, i) => {
    e.preventDefault();
    setTag((prev) => prev.filter((item, i) => i != i))
  }


  
  const divClass = "flex flex-col gap-1 "
  const inputClass = `px-4 py-3 border border-gray-400 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-500`
  const labelClass = `text-gray-800  font-medium text-sm`
  const errorClass = "text-red-600 font-semibold text-sm"
  return (
    <div className='fixed  top-0 w-screen h-screen bg-white/0.5 z-50'>

      <div className='h-screen overflow-y-scroll  w-full md:w-[75%] bg-white shadow-sm shadow-gray-900 mx-auto rounded-lg  pb-3 '>

        <div className='sticky top-0 z-30 w-full bg-white flex justify-between border-b border-gray-300 py-2 px-4'>
          <h2 className='text-2xl font-semibold'>Add Service</h2>
          <p onClick={()=>modal()} className='text-lg font-semibold cursor-pointer'><i className="ri-close-line"></i></p>
        </div>


        <div className=' px-5 py-4 mt-5 '>

          <p className='text-sm text-gray-400 mb-4'> *indicate required</p>
          <form onSubmit={handleSubmit(handleAddService)} className=' flex flex-col gap-3 '>
            <div className={divClass}>
              <label className={labelClass} htmlFor="title">* title</label>
              <input
              {...register("title",{
                required:"service title required",
                minLength:{value:3,message:"title should be atleast 3 character"},
                maxLength:{value:20,message:"title should be less than 20 character"}
              })}
               className={inputClass} id='title' type="text" placeholder='Service title' />
               {errors.title && <p className={errorClass}>{errors.title.message} </p>}
            </div>

            <div className={divClass}>
              <label className={labelClass} htmlFor="description">description</label>
              <textarea
                  {...register("description",{
                    required:"description is required",
                    minLength:{value:10,message:"minLength is 10"}
                  })}
               className={inputClass} type="text" id='description' placeholder='Service description' />
               {errors.description && <p className={errorClass}>{errors.description.message}</p>}
            </div>

            <div className={divClass}>
              <label className={labelClass} htmlFor="price">* price</label>
              <input
             
              {...register("price",{
                required:"price is required",
                min:{value:0,message:"price should be valid"},
                
              })} 
                className={inputClass} type="number" min={0} placeholder='Service price' />
                {errors.price && <p className={errorClass}>{errors.price.message}</p>}
            </div>

            <div className={divClass}>
              <label className={labelClass} htmlFor="cateogary">* cateogary</label>
              <select {...register("category",{
                required:"service category is required"
              })} id='category' className={inputClass} type="text" placeholder='Service cateogary' name='category' >
                <option value="">choose Cateogary</option>
                <option value="plumbing">plumbing</option>
                <option value="electrical">electrical</option>
                <option value="cleaning">cleaning</option>
                <option value="repair">repair</option>
                <option value="other">other</option>


              </select>
                 {errors.category && <p className={errorClass}>{errors.category.message}</p>}


            </div>

            <div className={divClass}>
              <label className={labelClass} htmlFor="duration">* duration</label>
              <select {...register("duration",{
                required:"service duration is required"
              })} id='duration' className={inputClass} type="text" placeholder='Service duration' name='duration' >
                <option value="">choose duration</option>
                <option value="1hour">1 hour</option>
                <option value="3hour">3 hour</option>
                <option value="half-Day">half-Day</option>
                <option value="full-Day">full-Day</option>
                <option value="other">other</option>


              </select>
                {errors.duration && <p className={errorClass}>{errors.duration.message}</p>}
            </div>

            <div className={divClass}>
              <label className={labelClass} htmlFor="location">
                * location</label>
              <input {...register("location",{
                required:"location is required"
              })} type="text" className={inputClass} placeholder='state,city,country' />

                   {errors.location && <p className={errorClass}>{errors.location.message}</p>}

            </div>

            <div className={"flex gap-4 flex-col"}>
              {/* <label className={labelClass} htmlFor="availableDays">availableDays</label> */}
              <label htmlFor="">* Available Days</label>

              <div className='flex gap-3'>
                {daysOptions.map((day, i) => (
                  <label key={i} className="flex  items-center gap-2 text-sm capitalize ">
                    <input
                 
                    value={day}
                      type="checkbox"
                      {...register("availableDays",{
                        required:"please select at least one day to available"
                      })}
                      // checked={availableDays.includes(day)}
                      // onChange={() => handleDayChange(day)}
                      className="accent-teal-500"
                    />
                    {day}
                  </label>
                ))}

          
              </div>
                    {errors.availableDays && <p className={errorClass}>{errors.availableDays.message}</p>}


            </div>

            <div className={divClass}>

              <label htmlFor="tags" className={labelClass}>Tags</label>
              <input
                value={tagName}
                  {...register("tags")}
                onChange={(e) => settagName(e.target.value)}
                onKeyDown={handleTagKeyDown}
                type="text" className={inputClass} placeholder='enter tag and press enter' />

              {tag.length > 0 && (
                <div className="flex flex-wrap gap-2 text-sm ">
                  {tag.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full  ">
                      #{tag}
                      <button type='button' onClick={(e) => handleCrossClick(e, index)} className='ml-2 text-red-600'>x</button>

                    </span>
                  ))}

                </div>
              )}


            </div>


            <button className='w-full py-2 border rounded-lg font-semibold bg-teal-700 text-white cursor-pointer'>Add-Service</button>
          </form>
        </div>

      </div>



    </div>
  )
}

export default PartnerServiceModal
