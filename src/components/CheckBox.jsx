import React from 'react'

const CheckBox = ({ defaults }) => {
  return (
    <div className="form-control">
      <label
        htmlFor="shipping"
        className="cursor-pointer label flex items-center justify-start gap-5 text-white"
      >
        <input
          type="checkbox"
          className="checkbox checkbox-info"
          name="shipping"
          id="shipping"
          value={"on"}
          defaultChecked={defaults}
        />
        <span className="label-text text-white">Free Shipping</span>
      </label>
    </div>
  );
};

export default CheckBox