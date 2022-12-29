import React from "react";
import swal from 'sweetalert';
import crud from '../../conexiones/crud';
import { Link } from 'react-router-dom';


export const ViewProductos = ({producto}) => {
    
 
    const{nombre, descripcion, stock, precio, imagen} = producto;

    const borrarProducto = async (idProducto) =>{
        swal({
          title: "Estas seguro de eliminar el producto?",
          text: "una vez eliminado, no se podra recuperar este producto",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            const response = crud.DELETE(`/api/producto/${idProducto}`);
            
            if(response){
              swal("Tu producto ha sido borrado correctamente", {
                icon: "success",
              });
            }
            window.location.reload();
            //cargarProductos();
           
          } else {
            swal("se cancelo la acción");
          }
        });
       }

    return(
        <div >
        <table className="table table-bordered border-separate border-spacing-1">
            <thead className='bg-violet-400'>
              <tr>      
              <th style={{ width: '12%' }}>Imagen</th>                
              <th style={{ width: '30%' }}>Caracteristicas</th>
              <th style={{ width: '30%' }}>Opciones</th>
              </tr>
            </thead>
                              
            <tbody className="bg-white text-center">
               {
                
                  <tr>
                  <td><img src={imagen}></img></td>
                  <td>
                      <p className="mb-1 text-xm text-black font-bold">Producto: {nombre}</p>
                      <p className="mb-1 text-xm  text-black">Descripción: {descripcion}</p>
                      <p className="mb-1 text-xm  text-black">Stock: {stock}</p>   
                      <p className="mb-1 text-xm  text-black">Precio: {precio}</p>
                  </td>
                                                    
                  <td>                   
                    <Link className="bg-blue-600 text-white rounded hover:cursor-pointer hover:bg-blue-400 transition-colors"
                    to={`/actualizar-producto/${producto._id}`}
                    >Editar </Link>&nbsp;&nbsp; 
                    
                    <button 
                    onClick={()=>borrarProducto(producto._id)}
                    className="bg-red-600 text-white   rounded hover:cursor-pointer hover:bg-red-400 transition-colors">Eliminar </button>&nbsp;&nbsp; 
                  </td>
                  </tr>
                  
                }                            
            </tbody>
       </table>
    </div>
    )
}

export default ViewProductos