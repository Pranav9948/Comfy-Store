import React from 'react'

const SelectBox = ({categories ,name,defaults }) => {


 
  
    
  return (
    <div>
      <select  className="select select-primary border-2 bg-white text-black w-full max-w-xs" name={name} defaultValue={defaults} >
       
       {
        categories.map((each,idx)=><option  key={idx} value={each} className='text-black'>{each}</option>)
       }
        
      </select>
    </div>
  );
}

export default SelectBox