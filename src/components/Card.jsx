import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'

const Card = ({country}) => {
  
  const [isDark]=useOutletContext()

  return (
  <Link to={`/${country?.name?.common}`} state={country}>
    <div className={`w-full md:max-w-[250px] rounded-md cursor-pointer transition duration-200 ${isDark?"bg-gray-700 text-gray-50":"bg-gray-50 text-gray-800 border"} hover:-translate-y-3`}>
      <div><img src={country?.flags?.svg} alt="country" className='w-full object-cover md:h-[166px]'/></div>
      <div className='my-2 p-4'>
        <p className='text-2xl font-semibold'>{country.name.common}</p>
        <p className='font-semibold mt-2'>Population: <span className='font-light'> {country?.population.toLocaleString('en-IN')}</span></p>
        <p className='font-semibold mt-2'>Region: <span className='font-light'> {country?.region}</span></p>
        <p className='font-semibold mt-2'>Capital: <span className='font-light'>{country?.capital?.map((capital)=>capital).join(", ")}</span></p>
      </div>
    </div>
  </Link>
  )
}

export default Card