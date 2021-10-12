import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import logo from "../../assets/img/logoMtodo.png";
import "./login.css";

const Login = () => {
    const history = useHistory();

    // console.log(params);
    const API_LOGIN = "http://localhost:3001/users";

    const [users, setuser] = useState();

    const startSesion = async () => {
        const response = await fetch(API_LOGIN);
        const data = await response.json();
        setuser(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const filterdata = users.filter((user) => user.email === login.email);
        try {
            if (
                filterdata[0].email === login.email &&
                filterdata[0].password === login.password &&
                filterdata[0].cargo === login.cargo
            ) {
                if (login.cargo === "Administrador") {
                    history.push(`/market/admi`);
                } else {
                    history.push("/market");
                }
            }
        } catch (error) {
            console.log(error);
            alert("Datos incorrectos");
        }
    };

    const initialState = {
        email: "",
        password: "",
        cargo: "",
    };
    const [login, setLogin] = useState(initialState);

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
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder=""
                                    className="input-position form-control mb-2 rounded-pill float-start"
                                    value={login.email}
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
                                    placeholder=""
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
                                    name="cargo"
                                    id="cargo"
                                    className="select-position mb-2 w-100 py-2 px-3 rounded-pill"
                                    onChange={handleSelectChange}
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
        </div>
    );
};

export default Login;
