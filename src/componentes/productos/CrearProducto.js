import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import crud from '../../conexiones/crud';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const CrearProducto = () => {

    const navigate = useNavigate();
    const {idCategoria} = useParams();

    const [producto, setProducto] = useState({
        nombre:'',
        descripcion:'',
        stock:'',
        precio:'',
        imagen:''
    })

    const { nombre, descripcion, stock, precio, imagen } = producto;

    const onChange = (e) => {
        setProducto ({
            ...producto,
            [e.target.name]: e.target.value   
        })
    } 

    const CrearProducto = async () =>{
        const data = {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            stock: producto.stock,
            precio: producto.precio,
            imagen: producto.imagen,
            categoriaId: idCategoria
        }
        const response = await crud.POST(`/api/producto`, data);
        const mensaje = response.msg;
        console.log(mensaje);
        const mensaje1 = "El producto se creo correctamente";  
        swal({
            title: 'Información',
            text: mensaje1,
            icon: 'success',
            buttons:{
              confirm:{
                text:'OK',
                value: true,
                visible: true,
                className: 'btn btn-primary',
                closeModal: true
              }
            }
          });
        navigate(`/home-productos/${idCategoria}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        CrearProducto();
    }

    return (
       <>
       <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
        <main className='flex-1'>
            <div className='mt-t flex justify-center'>
            <h1 className="inline bg-gradient-to-r from-indigo-400 via-violet-900 to-indigo-400 bg-clip-text font-display text-3xl tracking-tight text-transparent font-bold">
                Crear producto
            </h1>
            </div>
            <div className='mt-t flex justify-center'>
                <form 
                    className='my-10 bg-white shadow rounded-lg p-10'
                    onSubmit={onSubmit} 
                    > 
                        <div className='my-5'>
                            <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre del producto</label>
                            <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder='Nombre'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={nombre}
                            onChange={onChange}
                            />    

                            <label className='uppercase text-gray-600 block text-xl font-bold'>Descripcion</label>
                            <input
                            type="text"
                            id="descripcion"
                            name="descripcion"
                            placeholder='descripcion'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={descripcion}
                            onChange={onChange}
                            />    

                            <label className='uppercase text-gray-600 block text-xl font-bold'>stock</label>
                            <input
                            type="number"
                            id="stock"
                            name="stock"
                            placeholder='stock'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={stock}
                            onChange={onChange}
                            />   

                            <label className='uppercase text-gray-600 block text-xl font-bold'>precio</label>
                            <input
                            type="number"
                            id="precio"
                            name="precio"
                            placeholder='precio'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={precio}
                            onChange={onChange}
                            />   

                            <label className='uppercase text-gray-600 block text-xl font-bold'>Imagen del producto</label>
                            <input
                            type="text"
                            id="imagen"
                            name="imagen"
                            placeholder='Nombre'
                            className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            value={imagen}
                            onChange={onChange}
                            />       
                                            
                        </div>
                        <input
                            type="submit"
                            value="Crear producto"
                            className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                        />
                    
                </form>
            </div>
       
        </main>
      </div>
       </>
    );
  
}

export default CrearProducto; 