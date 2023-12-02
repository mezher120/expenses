import React from 'react'
import './Selection.css'

function Selection({ data, headers, type }) {

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