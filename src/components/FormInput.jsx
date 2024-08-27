import React from "react";

const FormInput = ({ label, name, type, defaultValue, size ,lighter}) => {

  console.log(`lighter`,lighter);
  


  return (
    < >
      <label className="form-control ">
        <div className="label">
          <span
            className={`text-base font-medium tracking-wide  ${
              lighter ? "text-black opacity-80" : "text-white"
            } `}
          >
            {label}
          </span>
        </div>
        <input
          type={type}
          name={name}
          placeholder="Type here"
          defaultValue={defaultValue}
          className={`input input-bordered bg-white text-black border-2 border-green-500 ${lighter ? 'opacity-40' : '' }`}
          size={size}
        />
      </label>
    </>
  );
};

export default FormInput;
