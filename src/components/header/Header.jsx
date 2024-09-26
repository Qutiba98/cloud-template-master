import React, { useState } from 'react'
import './Header.css'
import Menu from './menu/Menu'
import Banner from './banner/Banner'
import Ban from '../../assets/images/undraw_co-working_825n.svg';
function Header() {

  let [width , setWidth] = useState(null)

  window.addEventListener("resize" , () => {
    setWidth(width = window.screen.width)
  })

  return (
    <header className='header'>
        <div className={width > 976 ? 'container' : 'header__container'}>
            <Menu/>
            <Banner Ban={Ban}/>
        </div>
    </header>
  )
}

export default Header