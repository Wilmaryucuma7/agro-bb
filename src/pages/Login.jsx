import React from "react";
import LoginForm from "../components/LoginForm";


export default function Login() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center min-h-screen bg-white">
      <p className="text-4xl sm:text-5xl font-bold mb-10 text-gray-900">Iniciar sesión</p>
      <div className="2xl:w-1/4 sm:w-96">
        <LoginForm />
      </div>
    </div>
  );
}
