import React, { useEffect, useState } from 'react'
import './Header.css'
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';
import ModalHistory from './ModalHistory';

function Header() {

    const [loading, setLoading] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [person, setPerson] = useState({});
    const [historial, setHistorial] = useState([]);

    function handleModal(e) {
        e.preventDefault();
      if (e.target.name === 'create') {
          setPerson({
              name: "",
              alias: ""
          })
          setLoading(!loading)
          setLoadingModal(false)
      }
      if (e.target.name === 'historial') {
        setLoadingModal(!loadingModal)
        setLoading(false)
      }

    }


    function handleOnChange(e) {
        e.preventDefault();
        setPerson({ ...person, [e.target.name]: e.target.value.toUpperCase() })
    }

    async function handleOnClick(e) {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'persons'), person)
            Swal.fire({
                text: 'Creado!',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(function () {
                window.location.reload();
            });
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const dbHistorial = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'historial'));
                const historialArrays = [];
                querySnapshot.forEach((doc) => {
                    historialArrays.push(doc.data());
                });
                setHistorial(historialArrays);
            } catch (error) {
                console.log(error)
            }
        }
        dbHistorial();
    }, [])


    return (
        <div className='headerContainer'>
            <div>
            <button className='formButton' onClick={() => window.location.reload()}>New</button>
            <button className='formButton' name='historial' onClick={() => setLoadingModal(!loadingModal)}>Historial</button>
            </div>
            <span>Gestor de Gastos</span>
            <button className='formButton' name='create' onClick={(e) => handleModal(e)}>Create</button>
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
            {loadingModal && <ModalHistory data={historial} />}
        </div>
    )
}

export default Header