import React from 'react'

import { useOutletContext } from 'react-router-dom'

const ShimmerLoading = () => {
  // const {isDark}=useThemeProvider()
  const [isDark]=useOutletContext()

  return (
    <div className={`w-full md:w-[260px] rounded-md h-[360px] ${isDark?"bg-gray-700":"bg-gray-100 border"}`}>
     
    </div>
  )
}

export default ShimmerLoading