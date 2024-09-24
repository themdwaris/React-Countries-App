import React from 'react'
import { useOutletContext } from 'react-router-dom'

const DetailShimmer = () => {

  // const {isDark}=useThemeProvider()
  const [isDark]=useOutletContext()
  return (
    <div className={`w-full min-h-lvh ${isDark?"bg-gray-900":"bg-gray-50"}`}>
        <div className='max-w-6xl mx-auto py-8 px-6 xl:px-0'>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className={`items-start w-full h-[360px] md:max-w-xl md:max-h-[500px] rounded-md ${isDark?"bg-gray-700":"bg-gray-100 border"}`}>
              
            </div>
            <div className={`items-start w-full h-[360px] md:max-w-xl md:max-h-[500px] rounded-md ${isDark?"bg-gray-700":"bg-gray-100 border"}`}>
            
            </div>
          </div>
        </div>
    </div>
    

  )
}

export default DetailShimmer