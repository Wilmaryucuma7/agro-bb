import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API } from "../config";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [error1, setError1] = useState("");
  const [msgEmail, setMsgEmail] = useState("");

  const ola = () => {
    var tipo = document.getElementById("password");
    if (tipo.type === "password") {
      tipo.type = "text";
    } else {
      tipo.type = "password";
    }
  };

  const sendForm = (data) => {
    let url = API + "/api/login";
    const input = document.getElementById("inputEmail");
    const email = input.value;
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let result = emailPattern.test(email);
    if(!result){
      setMsgEmail("Error, email no valido");
    }else{
      setMsgEmail("");
      axios.post(url, data).then((response) => {
        if (response.data.error) {
          setError1(response.data.response);
        } else {
          localStorage.setItem("userName", response.data.userName);
          localStorage.setItem("userToken", response.data.response);
          window.location.assign("/logged");
        }
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => sendForm(data);
  return (
    <form
      className="card-body gap-5 rounded-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="padre1 inline-block">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-xl text-gray-900">
              Correo electrónico
            </span>
          </label>

          <input
            id="inputEmail"
            type="text"
            placeholder="Correo electrónico"
            className="input bg-gray-50"
            {...register("email", { required: true })}
          ></input>
          

          {errors.email && (
            <span className="text-red-500 text-center mt-2">
              Este campo es requerido
            </span>
          )}
          <span className="text-red-500 text-center mt-2">{msgEmail}</span>
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-xl text-gray-900">
            Contraseña
          </span>
        </label>
        <input
          type="password"
          id="password"
          placeholder="Contraseña"
          className="input bg-gray-50"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-500 text-center mt-2">
            Este campo es requerido
          </span>
        )}
        <div className="form-control mt-5">
          <label className="label cursor-pointer justify-center">
            <input
              type="checkbox"
              className="checkbox mr-5 checkbox-sm"
              onClick={ola}
            />
            <span className="label-text">Mostrar contraseña</span>
          </label>
          <span className="text-red-500 text-center mt-2">{error1}</span>
          
        </div>
        <div className="form-control mt-10">
          <button
            className="btn bg-yellow-600 hover:bg-yellow-700 text-white border-0"
            type="submit"
            id="login"
          >
            Ingresar
          </button>
        </div>
      </div>
      <label className="label">
        <Link
          to="/recover"
          className="label-text-alt underline link link-hover mt-4 mx-auto text-lg"
        >
          Olvidé mi contraseña
        </Link>
      </label>
    </form>
  );
}
