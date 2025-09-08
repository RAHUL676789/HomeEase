import React from 'react'
import { useLocation } from 'react-router-dom'

const ServiceListing = ({category}) => {
  const location = useLocation();
  console.log(location)
  return (
    <div>
        <h1>This is Cateogary filter part       {category} </h1>
 
    </div>
  )
}

export default ServiceListing
