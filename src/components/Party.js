import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase';
import Selection from './Selection';
import html2canvas from 'html2canvas';
import './Party.css'

function Party() {

    const {id} = useParams();
    const [data, setData] = useState([]);
    const screenShot = useRef(null)
    console.log(id, data)
    
    useEffect(() => {
        const dbHistorial = async () => {
            try {
                console.log(id)
                const querySnapshot = await getDocs(query(collection(db, "historial"), where("party", "==", id)));
                const dataArray = [];
                console.log(querySnapshot)
                querySnapshot.forEach((doc) => {
                    dataArray.push(doc.data());
                });
                console.log(dataArray)
                setData(dataArray);
            } catch (error) {
                console.log(error)
            }
        }
        dbHistorial();
    },[data])

    const handleOnShare = () => {
        html2canvas(screenShot.current).then(canvas => {
          // Convert canvas to base64 image
          const image = canvas.toDataURL('image/jpeg');
            
          const link = document.createElement('a'); // element link
            link.href = image;  // url of image
            link.download = 'party_image.png'; // name of image
            document.body.appendChild(link); // we ensure to put it into the dom
            link.click(); // simulate a click
            document.body.removeChild(link); // remove the link

        });
      };

  return (
    <div className='partyContainer'>
        <div className='partyTitle'>
            {data[0] ? <span >Party: {data[0]?.party}</span> : "Sin Data"}
        </div>
        <div ref={screenShot}>
        {data[0] ? <Selection data={data[0]?.calculate} headers={data[0]?.headers} type='calculation'></Selection> : "Sin Data"}
        </div>
        <div>
            <button className='formButton' onClick={() => handleOnShare()}>Share it in WhatsApp</button>
        </div>
    </div>
  )
}

export default Party