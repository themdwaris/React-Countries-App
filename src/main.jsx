
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import CountryDetail from './components/CountryDetail.jsx'
import Home from './components/Home.jsx'
import './index.css'
import { ThemeProvider } from './context/themeContext.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/:countryDetail/",
        element:<CountryDetail/>
      }
    ]
  },
  
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
   <ThemeProvider>
    <RouterProvider router={router}/>
   </ThemeProvider>
  // </StrictMode>,
)
