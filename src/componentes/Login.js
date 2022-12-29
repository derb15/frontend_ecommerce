import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import crud from '../conexiones/crud';


const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    email: '@fivemarket.com',
    password: ''
  })

  const { email, password} = usuario;

  const onChange =(e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  const autenticarUsuario =async () => {
    const data = {
      email: usuario.email,
      password: usuario.password
    }
    console.log(data);
    const response = await crud.POST(`/api/auth`, data);
    const mensaje = response.msg;
    console.log(mensaje);
    if(mensaje === ' el usuario no existe '){
      const mensaje = "el usuario no existe";
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons:{
          confirm:{
            text:'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      })
    }else if(mensaje === 'password incorrecto') {
      const mensaje = "password incorrecto";
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons:{
          confirm:{
            text:'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      })
    }else{

      const jwt = response.token;
      
      localStorage.setItem('token', jwt);
      
      //redireccionar a la pantalla de administrador
      navigate("/admin");
    }
  }
  const onSubmit =(e) => {
    e.preventDefault();
    autenticarUsuario();
  }



    return (
    
    <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
      <div className='md-w2/3 lg:w-2/8'>
      <img src={"https://res.cloudinary.com/dil2gv5hr/image/upload/v1671319120/logo_escogido_fmarvg.png"} ></img>
        <h1 className="inline bg-gradient-to-r from-indigo-400 via-violet-900 to-indigo-400 bg-clip-text font-display text-5xl tracking-tight text-transparent">
           Iniciar sesión
        </h1>
        <form 
          className='my-10 bg-white shadow-violet-500 rounded-lg p-10'
          onSubmit={onSubmit }
          >
                          
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>          
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Email de registro'
              className='w-full mt-3 p-3 border rounded-lg bg-gray-50 icon-email'
              value={email}
              onChange={onChange}
            />
            <label className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Password de registro'
              className='w-full mt-3 p-3 border rounded-lg bg-gray-50 icon-key'
              value={password}
              onChange={onChange}
            />
          </div>
          <input
                type="submit"
                value="Iniciar Sesión"
                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
            />
            <Link
            to={"/crear-cuenta"}
            className='block text-center my-5 text-violet-500 uppercase text-sm font-bold'
            >Crear Cuenta</Link>
        </form>

      </div>
      
    </main>

    );
}

export default Login;