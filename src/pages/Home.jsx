import React from "react";
import background from "../images/background.jpg";
import { Link } from "react-router-dom";
import logo from '../images/logo.png'

export default function Home() {
  return (
    <div
      className="hero h-screen bg-base-200"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="hero-content flex-col lg:flex-row p-10 gap-28">
        <div>
          <img src={logo} alt="logo" className="sm:w-80 lg:w-9/12" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl backdrop-blur-sm bg-black/50 p-5">
          <Link to="/login" className="bg-yellow-600 text-white p-3 m-5 rounded-xl text-xl shadow-xl text-center">
            Ingresar
          </Link>
          <div className="divider">O</div>
          <Link to="/register" className="bg-yellow-800 text-center text-white p-3 m-5 rounded-xl text-xl shadow-xl">
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}
