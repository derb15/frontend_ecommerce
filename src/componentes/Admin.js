import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import crud from '../conexiones/crud';
import swal from 'sweetalert';


const Admin = () => {

  const navigate = useNavigate(); 

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

  const [categoria, setCategorias] = useState([]);

   const cargarCategorias = async () => {
       const response = await crud.GET(`/api/categoria`);
       //console.log(response);
       setCategorias(response.categoria);
   }

   useEffect(() => {
       cargarCategorias();
   }, [])


   const borrarCategoria = async (idCategoria) =>{
    swal({
      title: "Estas seguro de eliminar la categoria?",
      text: "una vez eliminado, no se podra recuperar esta categoria",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const response = crud.DELETE(`/api/categoria/${idCategoria}`);
        
        if(response){
          swal("Tu categoria ha sido borrada correctamente", {
            icon: "success",
          });
        }
        cargarCategorias();
       
      } else {
        swal("se cancelo la acción");
      }
    });
   }

    return (
      <>
     <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
        <main className= 'mx-auto mt-5 md:mt-5 p-5 md:justify-center '>
            <div className='flex justify-center'>
              <h1 className="inline bg-gradient-to-r from-indigo-400 via-violet-700 to-indigo-400 bg-clip-text font-display font-bold text-3xl tracking-tight text-transparent">
              Listado de Categorias
              </h1>   
            </div>
            
            <div className= 'p-5 text-center'>
              <Link
                to={"/crear-categoria"}
                className='bg-violet-600 w-full p-2 text-white uppercase font-bold mt-5 text-center rounded-lg'
              >Crear categoria</Link>
            </div>
        

        <table className="table table-bordered border-separate border-spacing-1">
            <thead className='bg-violet-400'>
              <tr>      
              <th style={{ width: '12%' }}>Imagen</th>                
              <th style={{ width: '30%' }}>Nombre</th>
              <th style={{ width: '30%' }}>Opciones</th>
              </tr>
            </thead>
                              
            <tbody className="bg-white text-center">
               {
                  categoria.map(
                  item =>
                  <tr key={item._id}>
                  <td><img src={item.imagen}></img></td>
                  <td>{item.nombre}</td>
                                                    
                  <td>
                    <Link className="bg-green-600 text-white   rounded hover:cursor-pointer hover:bg-green-400 transition-colors"
                    to={`/home-productos/${item._id}`}
                    >Crear producto </Link>&nbsp;&nbsp; 
                    
                    <Link className="bg-blue-600 text-white rounded hover:cursor-pointer hover:bg-blue-400 transition-colors"
                    to={`/actualizar-categoria/${item._id}`}
                    >Editar </Link>&nbsp;&nbsp; 
                    
                    <button 
                      onClick={()=>borrarCategoria(item._id)}
                      className="bg-red-600 text-white   rounded hover:cursor-pointer hover:bg-red-400 transition-colors">Eliminar </button>&nbsp;&nbsp; 
                  </td>
                  </tr>
                  )
                }                            
            </tbody>
       </table>
   </main>
    </div>
      
    </>
    );
}

export default Admin; 