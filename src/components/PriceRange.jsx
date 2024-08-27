import React, { useState } from 'react'
import { formatPrice } from '../utils';

const PriceRange = ({minValue,maxValue,step,defaults}) => {

const [value,setValue]=useState(defaults || maxValue)

  return (
    <>
      <div className="mb-5">
        <label htmlFor="price" className="text-sm font-medium tracking-wide ">
          Select Price
        </label>
      </div>
      <input
        type="range"
        min={minValue}
        max={maxValue}
        value={value}
        name="price"
        id="price"
        size={"xs"}
        className="range range-accent"
        step={step}
        onChange={(e) => setValue(e.target.value)}
        defaultValue={defaults}
      />

      <p className="my-5 text-orange-600 tracking-wide">
        {" "}
        Price : {formatPrice(value)}
      </p>
    </>
  );
}

export default PriceRange