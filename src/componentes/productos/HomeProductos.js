import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import crud from '../../conexiones/crud';
import { ViewProductos } from './ViewProductos';


const HomeProductos = () => {
  
  const navigate = useNavigate(); 

  const {idCategoria} = useParams();
 
  useEffect(() =>{
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token")
      //console.log(token)
      if(!token){
        navigate("/login");
      }
    }
    autenticarUsuario()
  },[navigate]);// [] hacen que solo se ejecute una vez el useEffect
  
    const [productos, setProductos] = useState([]);
    const cargarProductos = async () => {
      const response = await crud.GET(`/api/producto/${idCategoria}`);
      //console.log(response);
      setProductos(response);
    }
    console.log(productos);
    
    useEffect(() => {
      cargarProductos();
    },[]);


    console.log(idCategoria);

    const [categoria, setCategoria] = useState({
        nombre:'',
        imagen:''
    })

    const cargarCategoria = async () =>{
        const response = await crud.GET(`/api/categoria/${idCategoria}`);
        //console.log(response);
        setCategoria(response.categoria);
    }
    useEffect(() =>{
        cargarCategoria();
    },[]);  

    const { nombre, imagen } = categoria;



    
    return (
      <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
        <main className= 'mx-auto mt-5 md:mt-5 p-5 md:justify-center '>
            <div className=' flex justify-center'>
              <h1 className="inline bg-gradient-to-r from-indigo-400 via-violet-700 to-indigo-400 bg-clip-text font-display font-bold text-3xl tracking-tight text-transparent">
              Listado de productos {nombre}
              </h1>   
            </div>

            <div className= 'p-5 text-center'>
              <Link
                to={`/crear-producto/${idCategoria}`}
                className='bg-violet-600 w-full p-2 text-white uppercase font-bold mt-5 text-center rounded-lg'
              >Crear Producto</Link>
            </div>
            <div className='bg-gray-600 shadow mt-5 rounded-lg'>
              {productos.map(producto =>
                <ViewProductos
                key={producto._id}
                producto={producto}
                />                        
              )}
            </div>


        </main> 
      </div>
      
    </>
    );
}

export default HomeProductos; 