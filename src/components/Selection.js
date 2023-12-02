import React from 'react'
import './Selection.css'

function Selection({data, headers, type}) {

  return (
    // <div>
    //     {data ? data.map((item, index) => (
    //         <div className='selectionContainer'>
    //             <span>#{index + 1}</span>
    //             <span>{item.name}</span>
    //             <span>{item.price}</span>
    //             <span>{item.alias}</span>
    //         </div>
    //     ))
    //     :
    //     <div></div>
    //     }
    // </div>
    <div class="table-wrapper">
    <table class="fl-table">
        <thead>
        <tr>
            {!headers.name ? <div></div> : <th>#</th>}
            {headers && headers.map((header) => (
              <th>{header}</th>
            )) }
        </tr>
        </thead>
        
        <tbody>
          {type === 'seleccion' ? data && data.map((item, index) => (
          <tr>
            <td>#{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.alias}</td>
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