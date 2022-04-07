import React, { useState } from 'react'
import './css/AppHeader.scss'

function AppHeader( { name } : { name: string } ) {
  return (
    <div className='AppHeader'>
      <h1 className="title">{name}</h1>
    </div>
  )
}

export default AppHeader