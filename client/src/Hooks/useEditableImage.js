import { useState } from "react"
const initialState = {
  url: "",
  pid: "",
  filter: {
    filterType: "",
    brightness: 0,
    contrast: 0,
    saturation: 0,
    hue: 0,
    grayscale: 0,
    sepia: 0,
  }


}


export const useEditableImage = (defaultState = initialState) => {
  const [backImage, setimage] = useState(defaultState)

  const updateField = (field, value) => {
    console.log(field, value)
    setimage((prev) => {
      return {
        ...prev,
        [field]: value
      }

    })

  }

  const updateFilter = (obj) => {
     setimage((prev)=>{
      console.log(prev)
    return{
      ...prev,
      filter:obj
    }
     })
  };


  const adjustFilterField = (field ,value)=>{
    console.log(field,value)

    setimage((prev)=>{
      console.log(prev)
      return {
        ...prev,
        filter:{...prev.filter,[field]:value}
      }
    })
  }
  const reset = () => setimage(defaultState);

  return { backImage, setimage, updateFilter, reset, updateField,adjustFilterField }
}