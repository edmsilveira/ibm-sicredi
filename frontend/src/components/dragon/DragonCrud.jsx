import React, {useState} from 'react'
import axios from 'axios'
import Header from '../template/Header'
import Nav from '../template/Nav'

import './DragonCrud.scss'
import '../../components/template/ModalChange.scss'

const DragonCrud = () => {
    const API_URL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon'

    document.body.className = ''
    document.body.classList.add('crud')

    const [show, setShow] = useState(false)
    const [showError, setShowError] = useState(false)
    let nameDragon = null, typeDragon = null
    
    const handleSubmitDragon = () => {
        if (nameDragon.value || typeDragon.value !== '') {
            setShowError(false)
            axios.post(API_URL, {
                name: nameDragon.value,
                type: typeDragon.value
            })
            .then(res => {
                document.body.classList.add('lock')
                document.getElementById("crud-form").reset()
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                    document.body.classList.remove('lock')
                }, 1000)
            })
        } else {
            setShowError(true)
        }
    }

         return (
             <React.Fragment>
                <Nav />
                <Header text="Adicionar um dragão"/>
                <main className="content crud">
                    <form className="crud-form" id="crud-form">
                            <div className="crud-wr">
                                <div className="crud-group">
                                    <input placeholder="Nome do dragão" ref={(nameForm) => {nameDragon = nameForm}} className="crud-input" type="text"/>
                                </div>
                                <div className="crud-group">
                                    <input placeholder="Tipo do dragão" ref={(typeForm) => {typeDragon = typeForm}} className="crud-input" type="text"/>
                                </div>
                                <div className="crud-group">
                                    <span className={`crud-error ${showError ? 'active' :  ''}`}>Ops! Preencha os campos.</span>
                                    <button type="button" className="save-btn" onClick={()=>{handleSubmitDragon()}}>Salvar</button>
                                </div>
                            </div>
                    </form>
                </main>
                <div className={`crud-modal ${show ? 'active' : ''}`}>
                    <div className="crud-modal-wr">
                        <h2>O seu dragão foi adicionado com sucesso!</h2>
                    </div>
                </div>
             </React.Fragment>
         )

}

export default DragonCrud

