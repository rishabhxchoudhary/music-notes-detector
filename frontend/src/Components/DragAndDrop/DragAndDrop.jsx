import React, { useContext, useState } from 'react'
import axios from 'axios';
import { fileContext } from '../../Context/fileContext';
import './DragAndDrop.css'

const DragAndDrop = () => {
    const [newFile, setNewFile] = useState(null)
    const { setLyrics, setFile }= useContext(fileContext)

   const handleSubmit = (e)=>{
    e.preventDefault();
    let formData = new FormData();
    formData.append('file',newFile);
    axios.post('/',formData, { baseURL:"http://localhost:8000" }).then((res)=>{
        setLyrics(res.data);
        console.log(res.data);
        setFile(URL.createObjectURL(newFile));
    })
   }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
            <input type="file" className='file-input' onChange={(e)=>{setNewFile(e.target.files[0])}} required/>
            <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}
export default DragAndDrop
