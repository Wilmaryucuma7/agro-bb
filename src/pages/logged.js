const Logged = () => {
    const logOut = () => {
        localStorage.clear();
        window.history.pushState(window.history.state, "tt", "/");
        window.location.assign("/");
    }
    const redirect = () =>{
        window.location.assign("/login")
    }

    return (<div>{(!localStorage.getItem("userToken")) ? <div><h1>No tiene acceso a esta pagina</h1> <button
    className="btn bg-yellow-600 hover:bg-yellow-700 text-white border-0"
    onClick={redirect}
    id="login"
>
    Iniciar Sesion
</button> </div> : <div>
        <h1>Logged {localStorage.getItem("userName")}</h1>
        <button
            className="btn bg-yellow-600 hover:bg-yellow-700 text-white border-0"
            onClick={logOut}
            id="login"
        >
            Cerrar Sesion
        </button>
    </div>
    }
    </div>

    );
}

export default Logged;