import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API } from '../config';
import axios from 'axios';

export default function RecoverForm() {
  
  

  const [error1, setError1] = useState("");
  const [msg, setMsg] = useState("");
  const [msgEmail, setMsgEmail] = useState("");

  const recover = (data) => {
    let url = API + "/api/generate";
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let result = emailPattern.test(data.email);
    if(!result){
      setMsgEmail("Error, email no valido");
    }else{
      setMsgEmail("");
      data.link = "https://agrosoft.vercel.app/newpassword/?token="
      axios.post(url, data)
      .then( response =>{
        if(response.data.error){
          setError1(response.data.response);
        }else{
          setMsg(response.data.response);
          setError1("");
          const button = document.getElementById("recover");
          button.disabled = true;
        }
      })
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => recover(data);

  return (
    <form
      className="card-body gap-5 rounded-xl p-2 sm:p-5"
      onSubmit={handleSubmit(onSubmit)}
    >

      <div className="form-control border-b rounded-lg border-yellow-700">
      <label className="label">
          <span className="label-text font-semibold text-xl text-black">
            Ingrese el correo de la cuenta a recuperar
          </span>
        </label>
        <br />
        <br />
        <input
          type="text"
          placeholder="Correo electrónico"
          className="input bg-gray-200 text-black"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500 text-center mt-2">
            This field is required
          </span>
        )}
        
      </div>
      <span className="text-red-500 text-center mt-2">{msgEmail}</span>
          <span className="text-red-500 text-center mt-2">
            {error1}
          </span>
          
        <div className="form-control mt-10">
        <span className="text-green-500 text-center mt-2">
            {msg}
          </span>
          <button
            className="btn bg-yellow-600 hover:bg-yellow-700 text-white border-0" id="recover"
            type="submit"
          >
            Recuperar
          </button>
        </div>
    </form>
  );
}
