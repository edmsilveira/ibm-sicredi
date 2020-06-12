import React from 'react'
import Header from '../template/Header'
import Nav from '../template/Nav'

import './DragonInfo.scss'

const DragonInfo = (props) => {

    return (
        <React.Fragment>
            <Nav />
            <Header text="Dragon Info"/>
            <main className="info content">
                <div className="dragon">
                    <h2 className="dragon-ttl">{props.location.info.data.name}</h2>
                    <div className="dragon-wr">
                        <span className="dragon-text">Criado em: {props.location.info.novaData}</span>
                        <span className="dragon-text">Tipo: {props.location.info.data.type}</span>
                        <button className="btn-dragon" onClick={() => {props.history.goBack()}}>Voltar</button>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )

}

export default DragonInfo

