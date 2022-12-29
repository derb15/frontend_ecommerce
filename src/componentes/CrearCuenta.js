import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import crud from '../conexiones/crud';

const CrearCuenta = () => {
  
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre:'',
    email:'@fivemarket.com',
    password:'',
    confirmar:''
  })
  
  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  const crearCuenta = async () => {
   //los 2 password deben ser iguales 
    if (password !== confirmar){
      console.log("son diferentes");
      const mensaje = "Las contraseñas son diferentes.";
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
      const data = {
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password
      }
      console.log(data);
      const response = await crud.POST(`/api/usuarios`, data);
      const mensaje = response.msg;
      console.log(mensaje);
      if(mensaje === ' el usuario ya existe '){
        const mensaje = "el usuario ya existe";
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
        const mensaje = "El usuario fue creado correctamente";
        swal({
          title: 'Información',
          text: mensaje,
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

        setUsuario({
          nombre:'',
          email:'',
          password:'',
          confirmar:''
        })
        //redireccionar a la pantalla de login
        navigate("/Login");

      }
    }
  } 

  const onSubmit = (e) => {
    e.preventDefault();
    crearCuenta();
  }
  
  return (
      <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
      <div className='md-w2/3 lg:w-2/8'>
      <img src={"https://res.cloudinary.com/dil2gv5hr/image/upload/v1671319120/logo_escogido_fmarvg.png"} ></img>
        <h1 className="inline bg-gradient-to-r from-indigo-400 via-violet-900 to-indigo-400 bg-clip-text font-display text-5xl tracking-tight text-transparent">
          Crear cuenta FiveMarket
        </h1>

        <form 
          onSubmit={onSubmit}
          className='my-10 bg-white shadow-orange-500 rounded-lg p-10'
          >
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
            <input
              type="nombre"
              id="nombre"
              name="nombre"
              placeholder='Ingrese su nombre'
              className='w-full mt-3 p-3 border rounded-lg bg-gray-50 icon-user'
              value={nombre}
              onChange={onChange}
            />

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

            <label className='uppercase text-gray-600 block text-xl font-bold'>Confirmación</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder='Confirme su password'
              className='w-full mt-3 p-3 border rounded-lg bg-gray-50 icon-key'
              value={confirmar}
              onChange={onChange}
            />
          </div>
          <input
                type="submit"
                value="Crear Cuenta"
                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
            />
            
            <Link
            to={"/"}
            className='block text-center my-5 text-violet-500 uppercase text-sm font-bold'
            >Regresar</Link>
        </form>

      </div>
      
    </main>
    );

}

export default CrearCuenta;