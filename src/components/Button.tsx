import React, { ReactChildren } from 'react'
import onEnter from '../onEnter'
import './css/Button.scss'

function Button( { onClick = () => {}, children }: {onClick?: Function, children: ReactChildren | string} ) {
  return (
    <div className='Button' onClick={e => onClick()} onKeyDown={onEnter(onClick)}>
      {children}
    </div>
  )
}

export default Button