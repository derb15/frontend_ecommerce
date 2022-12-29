import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import logo from '../assets/logo_escogido.png';
import crud from '../conexiones/crud';


const Home = () => {

  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async ()=>{
    
    const response = await crud.GET(`/api/categoria/home`)
    setCategorias(response.categoria)
  }

  useEffect(() =>{
    cargarCategorias();
  },[]);

  const [productos, setProductos] = useState([]);

  const cargarProductos = async ()=>{
    
    const response = await crud.GET(`/api/producto/home`)
    setProductos(response.producto)
  }
  console.log(productos);
  useEffect(() =>{
    cargarProductos();
  },[]);

  /*const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async =>{
     const response = await crud.GET(`/api/categoria/home`)
     setCategorias(response.categoria)
  }
  useEffect(()=>{
    
  })*/

    return (
      <>
      <header className=' px-4 py-3 bg-yellow-300 border-b shadow-xl'>
            <div className='md:flex md:justify-between'>
                <h2 className='text-4xl text-black font-bold text-center mb-5 md:mb-0'>
                    <img src={logo} width="250" height="300"></img>
                </h2>
                <div className='flex flex-col md:flex-row items-center gap-4'>
                {/*<FaUser style={{color: 'blue', fontSize: '15px'}}/>*/}
                <Link
                  to={"/Login"}
                  className="bg-yellow-300 mb-1 w-full py-3 text-black uppercase font-bold rounded hover:cursor-pointer hover:bg-yellow-200 transition-colors icon-user"
                  >Inicio de sesión</Link>
                </div>
            </div>
        </header>
        <Carousel/>

    <main className='container mx-auto mt-5 md:mt-10 p-5 md:flex md:justify-center text-center'>
      <div className="mt-4 flow-root">
        <div className="inline bg-gradient-to-r from-indigo-400 via-violet-700 to-indigo-400 bg-clip-text font-display text-3xl font-bold tracking-tight text-transparent">
           Compra por categorias
      </div>
          <div className="-my-2 relative mt-5">
            <div className="relative box-content h-auto overflow-x-auto py-2 xl:overflow-visible">
              <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                {categorias.map((category) => (
                  <a
                    key={category.nombre}
                    href={category.href}
                    className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                  >
                    <span aria-hidden="true" className="absolute inset-0">
                      <img src={category.imagen} alt="" className="h-full w-full object-cover object-center" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                    />
                    <span className="relative mt-auto text-center text-xl font-bold text-white">{category.nombre}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>      

        
      
        
        
    </main>

    <div className="bg-gray-500">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-xl font-bold text-gray-900 text-center">Ver productos</h1>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {productos.map((product) => (
            <div key={product._id}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={product.imagen}
                    
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.nombre}</h3>
                  <p className="mt-1 text-sm text-gray-900">{product.descripcion}</p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">{product.precio}</p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={product.href}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Añadir al carro<span className="sr-only">, {product.nombre}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    </> 
    );
}

export default Home; 