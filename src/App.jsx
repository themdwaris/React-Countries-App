import React, { useState } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'


const App = () => {
  // const {isDark}=useThemeProvider()
  const [isDark,setIsDark]=useState(JSON.parse(localStorage.getItem("isDark")))

  return (
    <div className={`w-full min-h-lvh ${isDark?"bg-gray-900":"bg-white"}`}>
      <Header theme={[isDark,setIsDark]}/>
      <Outlet context={[isDark]}/>
    </div>
  )
}

export default App