import React, { useEffect, useState } from 'react'

const PartnerServiceModal = () => {
  const daysOptions = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const [tagName, settagName] = useState("")
  useEffect(() => {
    let body = document.querySelector("body");
    body.style.overflow = "hidden"
  }, [])

  const [tag, setTag] = useState([]);


  const handleTagKeyDown = (e)=>{
    console.log(tagName)

    if((e.key === "Enter" || e.key === " ") && tagName.trim() != ""){
 console.log(e);
      e.preventDefault();
      if(!tag.includes(tagName.trim())){
        setTag([...tag,tagName.trim()]);
      }
      settagName("")

      console.log(tag)
    }

    // setTag((prev)=>{
    //   return[...prev,tagName]
    // })
  }


  const handleCrossClick = (e,i)=>{
    e.preventDefault();
    setTag((prev)=>prev.filter((item,i)=> i != i))
  }

  const divClass = "flex flex-col gap-1 "
  const inputClass = `px-4 py-3 border border-gray-400 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-500`
  const labelClass = `text-gray-800  font-medium text-sm`
  return (
    <div className='fixed  top-0 w-screen h-screen bg-white/0.5 z-50'>

      <div className='h-screen overflow-y-scroll  w-full md:w-[75%] bg-white shadow-sm shadow-gray-900 mx-auto rounded-lg  py-3 '>

        <div className='sticky top-0 z-30 w-full bg-white flex justify-between border-b border-gray-300 py-2 px-4'>
          <h2 className='text-2xl font-semibold'>Add Service</h2>
          <p className='text-lg font-semibold cursor-pointer'><i className="ri-close-line"></i></p>
        </div>


        <div className=' px-5 py-4 mt-5 '>

          <p className='text-sm text-gray-400 mb-4'> *indicate required</p>
          <form className=' flex flex-col gap-3 '>
            <div className={divClass}>
              <label className={labelClass} htmlFor="title">* title</label>
              <input className={inputClass} id='title' type="text" placeholder='Service title' />
            </div>

            <div className={divClass}>
              <label className={labelClass} htmlFor="description">description</label>
              <textarea className={inputClass} type="text" id='description' placeholder='Service description' />
            </div>

            <div className={divClass}>
              <label className={labelClass} htmlFor="price">* title</label>
              <input className={inputClass} type="number" min={0} placeholder='Service price' />
            </div>

            <div className={divClass}>
              <label className={labelClass} htmlFor="cateogary">* cateogary</label>
              <select id='cateogary' className={inputClass} type="text" placeholder='Service title' name='cateogary' >
                <option value="">choose Cateogary</option>
                <option value="plumbing">plumbing</option>
                <option value="electrical">electrical</option>
                <option value="cleaning">cleaning</option>
                <option value="repair">repair</option>
                <option value="other">other</option>


              </select>
            </div>

            <div className={divClass}>
              <label className={labelClass} htmlFor="location">
                * location</label>
              <input type="text" className={inputClass} placeholder='state,city,country' />

            </div>

            <div className={"flex gap-4 flex-col"}>
              {/* <label className={labelClass} htmlFor="availableDays">availableDays</label> */}
              <label htmlFor="">* Available Days</label>

              <div className='flex gap-3'>
                {daysOptions.map((day, i) => (
                  <label key={i} className="flex  items-center gap-2 text-sm capitalize ">
                    <input
                      type="checkbox"
                      // checked={availableDays.includes(day)}
                      // onChange={() => handleDayChange(day)}
                      className="accent-teal-500"
                    />
                    {day}
                  </label>
                ))}
              </div>


            </div>

            <div className={divClass}>

              <label htmlFor="tags" className={labelClass}>Tags</label>
              <input
              value={tagName}
              onChange={(e)=>settagName(e.target.value)}
                 onKeyDown={handleTagKeyDown}
                type="text" className={inputClass} placeholder='enter tag and press enter' />

              {tag.length > 0 && (
                <div className="flex flex-wrap gap-2 text-sm ">
                  {tag.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full  ">
                      #{tag}
                  <button type='button' onClick={(e)=>handleCrossClick(e,index)} className='ml-2 text-red-600'>x</button>

                    </span>
                  ))}

                </div>
              )}


            </div>



          </form>
        </div>

      </div>



    </div>
  )
}

export default PartnerServiceModal
