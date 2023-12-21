import React from 'react'
import './Selection.css'

function Selection({ data, headers, type, setData, sum, setSum }) {

  function handleDeleteSelection(e) {
    e.preventDefault();
    let newData = [...data]
    let newSum = sum.sum - newData[e.target.id].price
    let avg = newSum / (newData.length - 1)
    setSum({sum: newSum, average: avg})
    newData.splice(e.target.id, 1)
    setData(newData);
  }

  return (
    <div className="table-wrapper">
      <table className="fl-table">
        <thead>
          <tr>
            {!headers.name ? <td></td> : <th>#</th>}
            {headers && headers.map((header) => (
              <th>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {type === 'seleccion' ? data && data.map((item, index) => (
            <tr>
              <td>#{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.alias}</td>
              <td><button id={index} className='selectionButton' onClick={(e) => handleDeleteSelection(e)}>X</button></td>
            </tr>
          )) :
            data && data.map((item, index) => (
              <tr>
                <td>#{index + 1}</td>
                <td>{item.deudor}</td>
                <td>{item.acreedor}</td>
                <td>{item.importe}</td>
                <td>{item.alias}</td>
              </tr>
            ))}

        </tbody>
      </table>
    </div>
  )
}

export default Selection