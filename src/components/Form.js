import React, { useEffect } from 'react'
import { useState } from 'react';
import Selection from './Selection';
import { calculation } from '../controllers/calculation.js'
import Swal from 'sweetalert2'
import './Form.css'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';

function Form() {

    const [person, setPerson] = useState({});
    const [data, setData] = useState([]);
    const [calculate, setCalculate] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [headersCalculation, setHeadersCalculation] = useState([]);
    const [autoComplete, setAutoComplete] = useState([]);
    const [autoCompleteFiltered, setAutoCompleteFiltered] = useState([]);
    const [load, setLoad] = useState(false);

    function handleOnChange(e) {
        if (e.target.name === 'price') {
            setPerson({ ...person, [e.target.name]: parseFloat(e.target.value) })
        } else {
            setPerson({ ...person, [e.target.name]: e.target.value })
        }
        if (e.target.name === 'name' && e.target.value.length > 1) {
            const lowerCase = e.target.value.toLowerCase();
            const uperCase = e.target.value.toUpperCase();
            const filterArray = autoComplete.filter((item) => item.name.includes(lowerCase) || item.name.includes(uperCase))
            setAutoCompleteFiltered(filterArray);
            setLoad(true);

        } else {
            setLoad(false);
        }
    }

    function handleOnClick(e) {
        e.preventDefault();
        if (person.name) {
            setData([...data, person])
            let head = Object.keys(person)
            setHeaders(head)
            setPerson({
                name: "",
                price: "",
                alias: "",
            })

        } else {
            Swal.fire({
                text: 'Minimo agrega un nombre!',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    function handleOnDelete(e) {
        e.preventDefault();
        const array = [...data];
        array.pop();
        setData([...array]);
    }

    function handleCalculateEach(e) {
        e.preventDefault();
        const calculationEach = calculation(data);
        if (calculationEach.length > 0) {
            let head = Object.keys(calculationEach[0])
            setHeadersCalculation(head);
            setCalculate(calculationEach);
        } else {
            Swal.fire({
                text: 'Nada que calcular!',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    useEffect(() => {
        const dbForAutoComplete = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'persons'));
                const personArrays = [];
                querySnapshot.forEach((doc) => {
                    personArrays.push(doc.data());
                });
                setAutoComplete(personArrays);
            } catch (error) {
                console.log(error)
            }
        }
        dbForAutoComplete();
    }, [])

    function handleSetOption(e) {
        e.preventDefault();
        const value = e.target.id;
        const nameValue = document.getElementById('name').value = value;
        let alias = "";
        for (let i = 0; i < autoComplete.length; i++) {
            if (value === autoComplete[i].name) {
                alias = autoComplete[i].alias;
            }
        }
        if (alias) {
            const nameAlias = document.getElementById('alias').value = alias;
            setPerson({
                ...person,
                name: nameValue,
                alias: nameAlias
            })
        }
        setLoad(false)
    }


    return (
        <div className='formContainer'>
            <div>

                <form>
                    <div className='formInputs'>
                        <div className='formInputsIndividuals'>
                            <label>Name</label>
                            <div className='formInputsIndividuals formInputAutocomplete'>
                                <input className='input' id='name' autoComplete='off' type='text' onChange={(e) => handleOnChange(e)} name='name' value={person.name}></input>
                                {load &&
                                    <div className='autocompleteContainer'>
                                        <ul className='autocompleteList' onClick={(e) => handleSetOption(e)}>
                                            {autoCompleteFiltered && autoCompleteFiltered.map((item) => (
                                                <li className='autocompleteItemList' id={item.name} >{item.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='formInputsIndividuals'>
                            <label>Price</label>
                            <input className='input' type='number' onChange={(e) => handleOnChange(e)} name='price' value={person.price}></input>
                        </div>
                        <div className='formInputsIndividuals'>
                            <label>Alias CBU</label>
                            <input id='alias' className='input' type='text' onChange={(e) => handleOnChange(e)} name='alias' value={person.alias}></input>
                        </div>
                    </div>
                    <div className='formButtonsAlign'>
                        <div>
                            <button className='formButton' onClick={(e) => handleOnClick(e)}>Add</button>
                        </div>
                        <div>
                            <button className='formButton' onClick={(e) => handleOnDelete(e)}>Delete</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='formSelectionContainer'>
                <Selection data={data} headers={headers} type='seleccion'></Selection>
            </div>
            <button className='formButton' onClick={(e) => handleCalculateEach(e)}>Calcular cada Uno</button>
            <Selection data={calculate} headers={headersCalculation} type='calculation'></Selection>
            {/* {calculate ? calculate.map((item) => {return (
        <div>
            <p>Deudor</p>
            <p>{item.deudor}</p>
            <p>Acreedor</p>
            <p>{item.acreedor}</p>
            <p>Importe a devolver</p>
            <p>{item.importe}</p>
        </div>
    )}) :
    <div></div>

    } */}


        </div>
    )
}

export default Form