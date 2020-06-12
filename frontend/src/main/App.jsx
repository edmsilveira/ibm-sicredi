import React from 'react'
import '../components/template/Header.scss'
import '../components/template/Nav.scss'

import Routes from './Routes'
import { Router } from 'react-router-dom'

import history from "../history"
import {AuthProvider} from '../Context/AuthContext'


function App() {
    return (
        <AuthProvider>
            <Router history={history}>
                <Routes />
            </Router>
        </AuthProvider>
    )
}

export default App;