import React from 'react'

const SectionTitle = ({ text }) => {
  return (
    <div className=" ">
      <h2 className=" text-3xl medium smallTablet:text-4xl smallTablet:font-bold  text-center tracking-wider capitalize">{text}</h2>
    </div>
  );
};

export default SectionTitle

