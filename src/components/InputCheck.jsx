import React, { useState } from 'react'

const InputCheck = ({ label, name,isChecked,onCheck , size, lighter }) => {

    


  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        
        className="input input-bordered bg-white text-black border-2 border-orange-500"
        size={size}
      />

      <div className=" absolute top-3 left-4 flex items-center gap-6">
      
        <div className="bg-white w-6 h-6 rounded-full border-2 border-orange-500 border-opacity-50 flex justify-center items-center">
          <button className={` w-3 h-3 rounded-full ${isChecked ? 'bg-orange-400' : ''} `} onClick={()=>onCheck()}></button>
        </div>


        <p className='capitalize text-sm font-sans font-bold text-black tracking-wide'>

           {label}

        </p>


      </div>
    </div>
  );
};

export default InputCheck