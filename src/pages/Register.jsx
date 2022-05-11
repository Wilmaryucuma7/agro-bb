import React from 'react'
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center min-h-screen bg-white">
      <p className="text-4xl sm:text-5xl font-bold mb-10 text-gray-900">Crear cuenta</p>
      <p className='text-gray-900 text-lg text-center'>Rellena los campos con la información correspondiente</p>
      <div className="2xl:w-1/4 sm:w-96">
        <RegisterForm />
      </div>
    </div>
  )
}
