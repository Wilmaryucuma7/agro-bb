import React from 'react';
import RecoverForm from "../components/RecoverForm";


const RecoverPassword = () => {
    return (
        <div className="flex flex-col flex-1 justify-center items-center min-h-screen bg-white">
        <div className="card flex-shrink-0 w-9/12 max-w-sm shadow-2xl backdrop-blur-sm bg-white p-5">
            <RecoverForm />
        </div>
        </div>
    );
}
 
export default RecoverPassword;