import './Logo.scss'
import logo from '../../assets/imgs/logo.png'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
        <Link to={props.logged === true ? '/home' : '/'} className={`${props.center ? 'logo center' : 'logo menu-nav-item'}`}>
            <img src={`${logo}`} alt="logo" className="logo-img"/>
        </Link>
