import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const DefaultLayout = ({children}) => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='container'>
        <Sidebar />
        <div className='content'>{children}</div>
      </div>
    </div>
  )
}

export default DefaultLayout
