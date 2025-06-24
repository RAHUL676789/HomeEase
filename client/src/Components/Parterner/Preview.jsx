import React from 'react'

const Preview = ({data}) => {
  return (
    <div>
{Object.entries(data).map(([item, key]) => {
  return (
    <div key={item}>
     
      <span>{item}</span>
       <span>{key}</span>
    </div>
  );
})
}      
    </div>
  )
}

export default Preview
