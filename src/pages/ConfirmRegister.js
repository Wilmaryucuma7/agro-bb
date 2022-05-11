import React from 'react';
const ConfirmRegister = ( ) => {
    const iniciar = () =>{
        window.location.assign("/login");
    }
    return (
        <div className="flex flex-col flex-1 justify-center items-center min-h-screen bg-white">
            <div className="card flex-shrink-0 w-9/12 max-w-sm shadow-2xl backdrop-blur-sm bg-white- p-5">
                <br />
                <span className="label-text font-semibold text-xl text-black text-center">
                    Se ha enviado un link de confirmacion a su email, por favor active su cuenta.
                </span>
                <br />
                <button className="btn bg-yellow-600 hover:bg-yellow-700 text-white border-0" onClick={iniciar}>Iniciar Sesion</button>
                <br />
            </div>
            
        </div>
    );
}
 
export default ConfirmRegister;