import React, { useEffect } from 'react'
import { useState } from 'react';
import Selection from './Selection';
import { calculation } from '../controllers/calculation.js'
import Swal from 'sweetalert2'
import './Form.css'
import { addDoc, collection, getDocs } from 'firebase/firestore';
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
    const [sum, setSum] = useState("")
    const [party, setParty] = useState("");
    const [date, setDate] = useState("");

    function handleOnChange(e) {
        if (e.target.name === 'price') {
            if (e.target.value === 0) {
                setPerson({ ...person, [e.target.name]: ""})
            } else {
                setPerson({ ...person, [e.target.name]: parseFloat(e.target.value) }) 
            }
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
        let sumY = Number(person.price);
        data.map(data => sumY = sumY + Number(data.price))
        let avg = sumY / (data.length + 1);
        setSum({
            sum: sumY,
            average: avg
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
        if (party && date) {
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
            
        } else {
            Swal.fire({
                text: 'Falta Nombre del Party y/o Fecha',
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

    async function handleSaveData(e) {
        e.preventDefault();
        if (!party || !date) {
            return;
        }
        
        const newData = {
            party: party,
            calculate: calculate,
            headers: headersCalculation, 
            date: date.replace("-", "")
        }
        if (!newData.calculate.alias) {
            newData.calculate.alias = null
        }
        console.log(newData)
        try {
            await addDoc(collection(db, 'historial'), newData)
            Swal.fire({
                text: 'Save it!',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(function () {
                window.location.reload();
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                text: "revisa la fecha DD-MM",
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    return (
        <div className='formContainer'>
            <div className='formTitleInputs'>
                <label>Party</label>
                <input id='party' name='party' className='input' type='text' value={party} onChange={(e) => setParty(e.target.value)}></input>
                <label>Date</label>
                <input id='date' name='date' className='input' type='text' value={date}  placeholder="DD-MM" onChange={(e) => setDate(e.target.value)}></input>
            </div>
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
                <Selection data={data} headers={headers} type='seleccion' setData={setData} sum={sum} setSum={setSum}></Selection>
                {sum ? <div className='formSelectionTotals'>
                    <span>Total: {sum.sum}</span>
                    <span>Cada Uno: {sum.average}</span>
                </div>
                : <div></div>}
            </div>
            <button className='formButton' onClick={(e) => handleCalculateEach(e)}>Calcular cada Uno</button>
            <Selection data={calculate} headers={headersCalculation} type='calculation'></Selection>
            <button className='formButton' onClick={(e) => handleSaveData(e)}>Ok. Save data</button>
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