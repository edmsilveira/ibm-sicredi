import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {Context} from '../../Context/AuthContext'
import Logo from './Logo'

import './Nav.scss'

const Nav = () => {

    const { handleLogout } = useContext(Context)

    return (
        <aside className="menu">
            <nav className="menu-nav">
                <Link className="menu-nav-item" to="/home">
                    <i className="fa fa-home"></i> Home
                </Link>
                <Link className="menu-nav-item" to="/adicionar">
                    <i className="fas fa-users"></i> Cadastrar dragão
                </Link>
                <a className="menu-nav-item" onClick={handleLogout}>Logout</a>
                <Logo logged={true}></Logo>

                
            </nav>
        </aside>
    )
}

export default Nav