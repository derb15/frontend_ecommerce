import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";

const Header = () => {

    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/");
      }
    
    return (
        <header className=' px-4 py-3 bg-yellow-300 border-b shadow-xl sticky top-0'>
            <div className='md:flex md:justify-between'>
                <h2 className='text-4xl text-black font-bold text-center mb-5 md:mb-0'>
                    Panel de Administrador
                </h2>
                <div className='flex flex-col md:flex-row items-center gap-4'>
                
                <input
                    type="submit"
                    value="Cerrar Sesión"
                    className="bg-yellow-300 mb-1 w-full py-3 text-black uppercase font-bold rounded hover:cursor-pointer hover:bg-yellow-200 transition-colors"
                    onClick={cerrarSesion}
                    />
                    <AiOutlineLogout style={{color: 'black', fontSize: '30px'}}/> 
                </div>

            </div>
        </header>

    );
  
}

export default Header; 