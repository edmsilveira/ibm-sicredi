import React, {useState} from 'react'

import axios from 'axios'

import './ModalChange.scss'

const initialState = () => {
    return {name: '', type: ''}
}

const ModalChange = (props) => {
   
    const API_URL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon'

    const [values, setValues] = useState(initialState)
    
    const handleOnChange = (evt) => {     

        const {value, name} = evt.target

        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmitDragon = () => {
        axios.put(`${API_URL}/${props.dragon.id}`, {
            name: values.name != '' ? values.name : props.dragon.name,
            type: values.type != '' ? values.type : props.dragon.type
        })
        .then(res => {
            document.getElementById("modal-form").reset()
            props.handleClose()
        })
    }

    const showHideClassName = props.show ? 'active' : ''
  

    return(
            <div className={`modal-content ${showHideClassName}`}>
                <form className="modal-form" id="modal-form">
                        <div className="modal-wr">
                            <div className="modal-group">
                                <span className="modal-txt">Criado em: {props.data}</span>
                            </div>
                            <div className="modal-group">
                                <span className="modal-txt">Nome: </span><input name="name" onChange={()=>{handleOnChange(event)}} defaultValue={props.dragon.name} className="modal-input" type="text"/>
                            </div>
                            <div className="modal-group">
                                <span className="modal-txt">Tipo: </span><input name="type" onChange={()=>{handleOnChange(event)}} defaultValue={props.dragon.type} className="modal-input" type="text"/>
                            </div>
                            <div className="modal-group">
                                <button type="button" className="modal-button btn-dragon" onClick={()=>{handleSubmitDragon()}}>Alterar</button>
                                <button type="button" className="modal-button btn-dragon" onClick={props.handleClose}>Fechar</button>
                            </div>
                        </div>
                </form>
            </div>
    )
}
export default ModalChange
    