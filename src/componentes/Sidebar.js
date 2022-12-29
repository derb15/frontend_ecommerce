import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    return (
        <aside className='md:w-60 lg:w-70 px-5 py-10 inline bg-gradient-to-r from-indigo-200 via-violet-300 to-indigo-200 '>
            <img src={"https://res.cloudinary.com/dil2gv5hr/image/upload/v1671319120/logo_escogido_fmarvg.png"} ></img>
            <Link
            to={"/admin"}
            className='bg-yellow-300 w-full p-3 text-black uppercase font-bold block mt-5 text-center rounded-lg hover:cursor-pointer hover:bg-yellow-200 transition-colors'
            >Categorias</Link>
            <div>

            <Link
            to={"/all-productos"}
            className='bg-yellow-300 w-full p-3 text-black uppercase font-bold block mt-5 text-center rounded-lg hover:cursor-pointer hover:bg-yellow-200 transition-colors'
            >Productos</Link>
            </div>
        </aside>
        
    );
  
}

export default Sidebar; 