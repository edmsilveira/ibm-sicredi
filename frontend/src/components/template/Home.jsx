import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import ModalChange from './ModalChange'
import Nav from './Nav'
import axios from 'axios'

import './Home.scss'

const Home = () => {
    const [dragons, setDragons] = useState([])
    const [dragon, setDragon] = useState([])
    const [showModal, setUpdateShowModal] = useState(false)
    const [showRemoved, setUpdateShowRemoved] = useState(false)
    const API_URL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon'

    let loader = null

    document.body.classList.add('home')

    const dataFormat = (info) => {
        let data = new Date(info)
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
    }

    const handleChangeDragon = (data) => {
        setDragon(data)
        document.body.classList.add('lock')
        setUpdateShowModal(true)
    }

    const handleRemoveDragon = (data) => {
        axios.delete(`${API_URL}/${data.id}`)
        .then(res => {
            loadDragons(loader)
            document.body.classList.add('lock')
            setUpdateShowRemoved(true)
            setTimeout(() => {
                setUpdateShowRemoved(false)
                document.body.classList.remove('lock')
            }, 1500)
        })
    }

    const loadDragons = async (loader) => {
        loader.classList.remove('off')

        await axios.get(API_URL)
        .then(res => {    
            let newDragons = res.data

            newDragons = res.data.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))
            setDragons(newDragons)
            loader.classList.add('off')
            document.body.classList.remove('crud')      
            document.body.classList.add('home')      
        })
    }
    
    const handleHideModal = () => {
        setUpdateShowModal(false)
        document.body.classList.remove('lock')
    }

    useEffect(() => {
        loadDragons(loader)
    }, [showModal])

    return(
        <React.Fragment>
            <Nav />
            <Header text="Listagem de dragões"/>
            <div className="loader" ref={(myLoader) => {loader = myLoader}}><div className="loader-img"></div></div>
            <main className="content home">
                <ul className="content-list">
                            {dragons.map(dragon => 
                                <li className="content-list-item" key={dragon.id} id={dragon.id}>                    
                                    <div className="dragon" >
                                        <h2 className="dragon-ttl">{dragon.name}</h2>
                                        <div className="dragon-content">
                                            <span className="dragon-text">Criado em: {dataFormat(dragon.createdAt)}</span>
                                            <span className="dragon-text">Tipo: {dragon.type}</span>
                                        </div>
                                        <div className="dragon-buttons">
                                            <Link className="dragon-link" to={{ pathname: `/dragon/${dragon.id}`, info: { data: dragon, novaData: dataFormat(dragon.createdAt)} }}><button className="btn-dragon">Detalhes</button></Link>
                                            <button className="btn-dragon" onClick={()=>{handleChangeDragon(dragon)}}>Alterar</button>
                                            <button className="btn-dragon" onClick={()=>{handleRemoveDragon(dragon)}}>Remover</button>
                                        </div>
                                    </div>
                                </li>)
                            }
                </ul>
            </main>
            <div className={`remove-modal ${showRemoved ? 'active' : ''}`}>
                    <div className="remove-modal-wr">
                        <h2>O seu dragão foi removido com sucesso!</h2>
                    </div>
            </div>
            <ModalChange show={showModal} handleClose={handleHideModal} dragon={dragon} data={dataFormat(dragon.createdAt)}></ModalChange>
        </React.Fragment>
    )
}
export default Home
    