import React from 'react'
import { Link } from 'react-router-dom'

const PrimaryButtons = ({text,link,background,color}) => {
  return (
    <Link to={link}>
      <button
        className={`{ px-8 py-4 mx-auto  flex justify-center rounded-md shadow-md items-center ${background} ${color}  font-sans text-sm font-bold tracking-wider uppercase }`}
      >
        {text}
      </button>
    </Link>
  );
}

export default PrimaryButtons