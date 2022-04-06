import React, { useState } from 'react'
import './css/AppHeader.scss'

function AppHeader() {
  const [name, setName] = useState("Zach")
  return (
    <div className='AppHeader'>
      <h1 className="title">{name}</h1>
    </div>
  )
}

export default AppHeader