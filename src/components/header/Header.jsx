import React, { useState } from 'react'
import './Header.css'
import Menu from './menu/Menu'


function Header() {

  let [width , setWidth] = useState(null)

  window.addEventListener("resize" , () => {
    setWidth(width = window.screen.width)
  })

  return (
    <header className='header'>
        <div className={width > 976 ? 'header__full-width' : 'header__container'}>
            <Menu/>
        </div>
    </header>
  )
}

export default Header