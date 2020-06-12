import React from 'react'
import Logo from '../../components/template/Logo'

export default props =>
    <header className="header">
        {props.logo ? <Logo center={true}/> : <h1>{props.text}</h1>}
    </header>
