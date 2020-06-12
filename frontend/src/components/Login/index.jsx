import React, {useContext, useState} from 'react'
import Header from '../template/Header'
import {Context} from '../../Context/AuthContext'

import './Login.scss'


const initialState = () => {
    return { username: '', password: ''}
}

const Login = () =>{
    const [values, setValues] = useState(initialState)

    const { authenticated, handleLogin, hasError } = useContext(Context)


    document.body.classList.remove('home')
    document.body.classList.remove('crud')
    document.body.classList.add('login')

    const onChangeForm = (evt) => {
        const {value, name} = evt.target

        setValues({
            ...values,
            [name]: value
        })
    }

     return (
        <React.Fragment>
            <Header logo={true}></Header>
            <main className="login-content">
                <div className="login-group">
                    <input className="login-input" placeholder="Usuário" type="text" name="username" onChange={() => {onChangeForm(event)}} />
                </div>
                <div className="login-group">
                    <input className="login-input" placeholder="Senha" type="password" name="password" onChange={() => {onChangeForm(event)}} />
                </div>
                    <span className={`login-error ${hasError ? 'active' : ''}`}>Ops! Usuário ou senha inválidos.</span>
                    <button type="button" className="login-submit" onClick={() => {handleLogin(values)}}>Entrar</button>
            </main>
        </React.Fragment>
    )
}
export default Login 
    