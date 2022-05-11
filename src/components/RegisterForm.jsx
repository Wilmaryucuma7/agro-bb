import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { API } from "../config";

export default function RegisterForm() {
  const [error1, setError1] = useState("");
  const [msgName, setMsgName] = useState("");
  const [msgLastName, setMsgLastName] = useState("");
  const [MsgIdIdentifier, setMsgIdIdentifier] = useState("");
  const [msgPhoneNumber, setMsgPhoneNumber] = useState("");
  const [msgEmail, setMsgEmail] = useState("");
  const [msgPassword, setMsgPassword] = useState("");
  const [identifiers, setIdentifiers] = useState([]);

  const loadIdentifiers = () =>{
    const urlIdentifiers = API + "/api/identifiers"
    axios.get(urlIdentifiers).then(response=>{
      setIdentifiers(response.data);
      //console.log(response.data[200])
    })
  }



  const sendForm = (data) => {
    let url = API + "/api/register";
    var namePattern = /^[a-zA-Z ]+$/;
    if (!namePattern.test(data.name)) {
      setMsgName("Error, nombre no valido");
    } else {
      setMsgName("");
      if (!namePattern.test(data.lastName)) {
        setMsgLastName("Error, Apellido no valido");
      } else {
        setMsgLastName("");
        const idIdentifier = data.idIdentifier;
        if(idIdentifier=="0"){
          setMsgIdIdentifier("Error, Seleccione un identificador");
        }else{
          setMsgIdIdentifier("");
          const phoneNumber = data.phoneNumber;
          if (phoneNumber.length < 10 || phoneNumber.length > 10) {
            setMsgPhoneNumber("Error, el telefono debe tener 10 caracteres");
          } else {
            setMsgPhoneNumber("");
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailPattern.test(data.email)) {
              setMsgEmail("Error, email no valido");
            } else {
              setMsgEmail("");
              var passwordValidator = require("password-validator");
              var schema = new passwordValidator();
              schema
                .is()
                .min(8)
                .is()
                .max(100)
                .has()
                .uppercase()
                .has()
                .lowercase()
                .has()
                .digits(1)
                .has()
                .not()
                .spaces()
                .has(["(?=.[!.@#$%^&*])"])
                .is()
                .not()
                .oneOf(["Passw0rd", "Password123"]);
              //console.log(schema.validate('asassassA11'));
              if (!schema.validate(data.password)) {
                setMsgPassword(
                  "La contraseña debe tener 8 caracteres, minimo un numero, una mayuscula, una minuscula y un simbolo"
                );
              } else {
                setMsgPassword("");
                axios.post(url, data).then((response) => {
                  if (response.data.error) {
                    setError1(response.data.response);
                  } else {
                    window.location.assign("/confirm");
                  }
                });
              }
            }
          }
        }
      }
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => sendForm(data);
  useEffect(() => {
    loadIdentifiers()
  });
  return (
    <form
      className="card-body gap-5 rounded-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-control border-b rounded-lg border-yellow-700">
        <input
          id="name"
          type="text"
          placeholder="Nombres"
          className="input bg-gray-50"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-red-500 text-center mt-2">
            Este campo es requerido!
          </span>
        )}
        <span className="text-red-500 text-center">{msgName}</span>
      </div>
      <div className="form-control border-b rounded-lg border-yellow-700">
        <input
          id="lastName"
          type="text"
          placeholder="Apellidos"
          className="input bg-gray-50"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && (
          <span className="text-red-500 text-center mt-2">
            Este campo es requerido!
          </span>
        )}
        <span className="text-red-500 text-center">{msgLastName}</span>
      </div>
      <div className="form-control border-b rounded-lg border-yellow-700">
        <select
          className="input form-select
      block
      px-3
      text-gray-400
      bg-gray-50
      transition
      ease-in-out
      my-0
      
      focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
          aria-label="Default select example"
          {...register("idIdentifier", { required: true })}
        >
          <option defaultValue value="0">Identificador</option>
          {
            identifiers.map((identifier=>{
              return(<option className="form-control border-b rounded-lg border-yellow-700" key={identifier.idIdentifier} value={identifier.idIdentifier}>+{identifier.identifier} - {identifier.countryName}</option>);
            }))
          }
          
        </select>
        <span className="text-red-500 text-center">{MsgIdIdentifier}</span>
      </div>
      
      <div className="form-control border-b rounded-lg border-yellow-700">
        <input
          id="phoneNumber"
          type="number"
          placeholder="Celular"
          className="input bg-gray-50"
          {...register("phoneNumber", { required: true })}
        />
        {errors.phoneNumber && (
          <span className="text-red-500 text-center mt-2">
            Este campo es requerido!
          </span>
        )}
        <span className="text-red-500 text-center">{msgPhoneNumber}</span>
      </div>

      <div className="form-control border-b rounded-lg border-yellow-700">
        <input
          id="email"
          type="text"
          placeholder="Correo electrónico"
          className="input bg-gray-50"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500 text-center mt-2">
            Este campo es requerido!
          </span>
        )}
        <span className="text-red-500 text-center">{msgEmail}</span>
      </div>
      <div className="form-control border-b rounded-lg border-yellow-700">
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          className="input bg-gray-50"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-500 text-center mt-2">
            Este campo es requerido!
          </span>
        )}
      </div>
      <span className="text-red-500 text-center">{msgPassword}</span>
      <span className="text-red-500 text-center">{error1}</span>
      <div className="form-control mt-2">
        <button
          className="btn bg-yellow-600 hover:bg-yellow-700 text-white border-0"
          type="submit"
        >
          Registrarse
        </button>
      </div>

    </form>
  );
}
