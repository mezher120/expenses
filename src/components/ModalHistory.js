import React from 'react'
import './ModalHistory.css'
import { Link } from 'react-router-dom'

function ModalHistory({data}) {

  return (
    <div className='modalHistoryContainer'>
        <div className="table-wrapper mhwrapper">
            <table className="fl-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                   {data && data.map((party, index) => {
                    return (
                        <tr key={index} className='mhbody'>
                        <Link className='linkbuttons' to={`/${party.party}`}>
                        <td>{party.party}</td>
                        </Link>
                        <td>{party.date.slice(0,2)+"-"+party.date.slice(2,4)}</td>
                        </tr>
                    )
                   })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ModalHistory