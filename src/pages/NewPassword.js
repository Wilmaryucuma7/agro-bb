import React from 'react';
import NewPasswordForm from "../components/NewPasswordForm";

const NewPassword = () => {
    const getParameterByName = (name) => {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(window.location.search);
        return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    const redirect = () => {
        window.location.assign("/")
    }

    return (<div>{(!getParameterByName("token")) ? <div className="flex flex-col flex-1 justify-center items-center min-h-screen bg-white">
        <div className="card flex-shrink-0 w-9/12 max-w-sm shadow-2xl backdrop-blur-sm bg-white- p-5">
            No tienes acceso a esta ubicacion!
            <button
                className="btn bg-yellow-600 hover:bg-yellow-700 text-white border-0"
                onClick={redirect}
                id="login"
            >
                inicio
            </button>
        </div>
    </div> : <div className="flex flex-col flex-1 justify-center items-center min-h-screen bg-white">
        <div className="card flex-shrink-0 w-9/12 max-w-sm shadow-2xl backdrop-blur-sm bg-white- p-5">
            <NewPasswordForm />
        </div>
    </div>}



    </div>
    );
}

export default NewPassword;