import React from 'react'
import './logo.less'
import logo from '../../assets/images/logo/logo.png'

export default function Logo(){
    return(
        <div className='logo-container'>
            <img src={logo} alt="log" className='logo-img'/>
        </div>
    )
}