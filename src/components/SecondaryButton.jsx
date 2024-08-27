import React from 'react'
import { Link } from 'react-router-dom'

const SecondaryButton = ({text,link,background,color,border}) => {
  return (
    <>
      <Link to={link}>
        <button
          className={`{ px-8 py-4 mx-auto  flex justify-center rounded-md shadow-md items-center ${background} ${color} ${border}  border-4 font-sans text-sm font-bold tracking-wider uppercase }`}
        >
          {text}
        </button>
      </Link>
    </>
  );
}

export default SecondaryButton




