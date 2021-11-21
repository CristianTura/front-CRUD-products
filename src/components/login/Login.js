import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import logo from "../../assets/img/logoMtodo.png";
import "./login.css";

const Login = () => {
    const history = useHistory();

    const API_LOGIN = "https://safe-river-82717.herokuapp.com/user/";

    const [users, setuser] = useState();

    const startSesion = async () => {
        const response = await fetch(API_LOGIN);
        const data = await response.json();
        setuser(data.Usuarios);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (login.name === "" || login.name === "Select") {
            alert("Selecciona un cargo");
            return;
        }

        const filterdata = users.filter(
            (user) => user.username === login.usuario
        );

        try {
            if (
                filterdata[0].username === login.usuario &&
                filterdata[0].password === login.password &&
                filterdata[0].name === login.name
            ) {
                if (login.name === "admin") {
                    history.push(`/market/admi`);
                } else {
                    history.push("/market");
                }
            } else {
                alert("Datos incorrectos");
                return;
            }
        } catch (error) {
            alert("Datos incorrectos");
            console.log(error);
        }
    };

    const initialState = {
        usuario: "",
        password: "",
        name: "",
    };
    const [login, setLogin] = useState(initialState);
    useEffect(() => {
        if (login.name === "Administrador") {
            setLogin({ ...login, name: "admin" });
        } else if (login.name === "Empleado") {
            setLogin({ ...login, name: "general" });
        }
    }, [login]);

    const handleInputChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };
    const handleSelectChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.options[e.target.selectedIndex].text,
        });
    };

    useEffect(() => {
        startSesion();
    }, []);

    return (
        <div className="">
            <div className="col-md-6 offset-md-3 mt-4 d-flex flex-column ">
                <img className="logo-login mb-4" src={logo} alt="LOGO" />
                <div className="market">
                    <div className="market-body">
                        <form
                            onSubmit={handleSubmit}
                            className=" p-3 text-center"
                        >
                            <div className="form-group mb-1">
                                <label
                                    className="text-white mb-2 float-start"
                                    htmlFor="category"
                                >
                                    Usuario:
                                </label>
                                <input
                                    type="text"
                                    name="usuario"
                                    placeholder="admin"
                                    className="input-position form-control mb-2 rounded-pill float-start"
                                    value={login.usuario}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group mb-1">
                                <label
                                    className="text-white mb-2 float-start"
                                    htmlFor="category"
                                >
                                    Contraseña:
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="programate"
                                    className="form-control mb-2 rounded-pill "
                                    value={login.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group mb-1">
                                <label
                                    className="text-white mb-2 float-start"
                                    htmlFor="cargo"
                                >
                                    Cargo:
                                </label>
                                <select
                                    name="name"
                                    id="cargo"
                                    className="select-position mb-2 w-100 py-2 px-3 rounded-pill"
                                    onChange={handleSelectChange}
                                    required
                                    // defaultValue="0"
                                    // value={login.cargo}
                                >
                                    <option value="1">Select</option>
                                    <option value="2">Administrador</option>
                                    <option value="3">Empleado</option>
                                </select>
                            </div>

                            <button className="btn btn-enter text-white rounded-pill px-5 ">
                                ENTRAR
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <p className="readme">
                Ver{" "}
                <a
                    href="https://github.com/CristianTura/front-CRUD-products"
                    target="_blank"
                    rel="noreferrer"
                >
                    README
                </a>{" "}
                para datos del login
            </p>
        </div>
    );
};

export default Login;
