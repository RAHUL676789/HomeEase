import { useState } from "react"





export const useEditableImage = (defaultState = initialState) => {
  const [backImage, setimage] = useState(defaultState)
  console.log("file run")

  const updateField = (field, value) => {
    console.log(field, value)
    setimage((prev) => {
      console.log(prev)
      return {
        ...prev,
        [field]: value
      }

    })

  }

  const updateFilter = (obj) => {
     setimage((prev)=>{
      // console.log(prev)
    return{
      ...prev,
      filter:obj
    }
     })
  };


  const adjustFilterField = (field ,value)=>{
    console.log(field,value)

    setimage((prev)=>{
      // console.log(prev)
      return {
        ...prev,
        filter:{...prev.filter,[field]:value}
      }
    })
  }
  const reset = () => setimage(defaultState);

  return { backImage, setimage, updateFilter, reset, updateField,adjustFilterField }
}