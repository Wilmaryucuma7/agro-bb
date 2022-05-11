import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API } from "../config";

export default function NewPasswordForm() {
  const [msg, setMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const [msgPassword, setMsgPassword] = useState("");

  const password1 = (e) =>{
    if(e.nativeEvent.key !== "Tab"){
      validation1(e.nativeEvent.key);
    }
    
  }

  const password2 = (e) =>{
    if(e.nativeEvent.key !== "Tab"){
      validation2(e.nativeEvent.key)
    }
  }
  
  const validation1 = (k) =>{
    const pass1 = document.getElementById("password1");
    const pass2 = document.getElementById("password2");
    const button = document.getElementById("recover");
    if(pass2.value!==""){
      if(pass1.value + k !== pass2.value){
        setMsg("Las contraseñas deben coincidir");
        button.disabled=true;
      }else{
        setMsg("");
        button.disabled=false;
      }
    }
  }

  const validation2 = (k) => {
    const pass1 = document.getElementById("password1");
    const pass2 = document.getElementById("password2");
    const button = document.getElementById("recover");
    if(pass1.value!==""){
      if(pass2.value + k !== pass1.value){
        setMsg("Las contraseñas deben coincidir");
        button.disabled=true;
      }else{
        setMsg("")
        button.disabled=false;
      }
    }
  }
  const getParameterByName = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(window.location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  const sendRecover = (data) =>{
    data.tokenUser = getParameterByName("token");
    let url = API + "/api/changepassword";
    var passwordValidator = require('password-validator');
    var schema = new passwordValidator();
    schema
    .is().min(8)   
    .is().max(100)   
    .has().uppercase()        
    .has().lowercase()        
    .has().digits(1)          
    .has().not().spaces()
    .has(["(?=.[!.@#\$%\^&\*])"])
    .is().not().oneOf(['Passw0rd', 'Password123']);
    if(!schema.validate(data.password1)){
      setMsgPassword("La contraseña debe tener 8 caracteres, minimo un numero, una mayuscula, una minuscula y un simbolo");
    }else{
      setMsgPassword("");
      axios.post(url, data)
      .then( response =>{
        if(response.data.error){
          setMsg(response.data.response);
        }else{
          setOkMsg(response.data.response);
          setTimeout(redirect, 3000);
        }
      })
    }
  }

  const redirect = () =>{
    window.location.assign("/login");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => sendRecover(data);

  return (
    <form
      className="card-body gap-5 rounded-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-control border-b rounded-lg border-yellow-700">
        <label className="label">
          <span className="label-text font-semibold text-xl text-black">
            Nueva contraseña
          </span>
        </label>
        <input
          type="password"
          id="password1"
          onKeyDown={password1}
          placeholder="Contraseña"
          className="input bg-gray-200 text-black"
          {...register("password1", { required: true })}
        />
        {errors.password1 && (
          <span className="text-red-500 text-center mt-2">
            Este campo es necesario
          </span>
        )}
      </div>
      <div className="form-control border-b rounded-lg border-yellow-700">
        <label className="label">
          <span className="label-text font-semibold text-xl text-black">
            Vuelva a escribir la contraseña
          </span>
        </label>
        <input
          id="password2"
          type="password"
          onKeyDown={password2}
          placeholder="Contraseña"
          className="input bg-gray-200 text-black"
          {...register("password2", { required: true })}
        />
        {errors.password2 && (
          <span className="text-red-500 text-center mt-2">
            Este campo es necesario
          </span>
        )}
      </div>
      <span className="text-red-500 text-center">{msgPassword}</span>
      <span className="text-red-500 text-center ">
            {msg}
          </span>
      <div className="form-control mt-2">
      <span className="text-green-500 text-center ">
            {okMsg}
          </span>
        <button
          className="btn bg-yellow-600 hover:bg-yellow-700 text-white border-0"
          type="submit" id="recover"
        >
          Recuperar
        </button>
      </div>
    </form>
  );
}
