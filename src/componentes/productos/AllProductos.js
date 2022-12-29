import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import crud from '../../conexiones/crud';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';


export const AllProductos = ({producto}) => {
    
 
   // const{nombre, descripcion, stock, precio, imagen} = producto;
    const [productos, setProductos] = useState([]);

    const cargarProductos = async ()=>{
      
      const response = await crud.GET(`/api/producto/home`)
      setProductos(response.producto)
    }
    console.log(productos);
    useEffect(() =>{
      cargarProductos();
    },[]);

    return(
        <>
        <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
        <main className= 'mx-auto mt-5 md:mt-5 p-5 md:justify-center '>
            <div className='mt-5 flex justify-center'>
              <h1 className="inline bg-gradient-to-r from-indigo-400 via-violet-700 to-indigo-400 bg-clip-text font-display font-bold text-3xl tracking-tight text-transparent">
              Listado de productos
              </h1>   
            </div>
        </main>
       </div>
      </>
    )
}

export default AllProductos;