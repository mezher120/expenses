import React, { useState } from 'react'
import './Header.css'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';

function Header() {

    const [loading, setLoading] = useState(false)
    const [person, setPerson] = useState({});
    
    function handleModal(e) {
        e.preventDefault();
        setPerson({
            name:"",
            alias:""
        })
        setLoading(!loading)
    }
    
    
    function handleOnChange(e) {
        e.preventDefault();
        setPerson({...person, [e.target.name]: e.target.value.toUpperCase()})
    }

    async function handleOnClick(e) {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, 'persons'), person)
            console.log(docRef.id)
            Swal.fire({
                text: 'Creado!',
                icon: 'success',
                confirmButtonText: 'Aceptar'
                }).then(function(){ 
                    window.location.reload();
                });
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

 
  return (
    <div className='headerContainer'>
        <button className='formButton' onClick={() => window.location.reload()}>New</button>
        <span>Gestor de Gastos</span>
        <button className='formButton' onClick={(e) => handleModal(e)}>Create</button>
        
        {loading && 
        <div className='headerCreateContainer'>
        <div className='formInputsIndividuals'>
        <label>Name</label>
        <input className='input' type='text' placeholder='Name' onChange={(e) => handleOnChange(e)} name='name' value={person.name}></input>
        </div>
        <div className='formInputsIndividuals'>
        <label>Alias CBU</label>
        <input className='input' type='text' placeholder='Alias CBU' onChange={(e) => handleOnChange(e)} name='alias' value={person.alias}></input>
        </div>
        <div className='headerCreateButtonContainer'>
        <button className='formButton' onClick={(e) => handleOnClick(e)}>Add</button>
        </div>
        </div>
        }
    </div>
  )
}

export default Header