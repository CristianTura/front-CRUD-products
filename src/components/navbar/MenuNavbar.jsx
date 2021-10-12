import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./navStyles.css";
import logo from "../../assets/img/logoMtodo.png";
import { useLocation } from "react-router-dom";

import { DataContext } from "../../context/DataContext";

const Navbar = () => {
    //leer url
    let location = useLocation();

    const { data, setData, setSelectValue } = useContext(DataContext);

    const onSearchChange = ({ target }) => {
        setData(target.value.toLowerCase());
    };

    const onSelectChange = (e) => {
        setSelectValue(e.target.options[e.target.selectedIndex].text);
    };
    console.log(location.pathname);
    return (
        <div className="navContainer position-relative">
            <nav className="navbar navbar-dark">
                <div className="container-fluid d-flex w-100">
                    <div className="logo w-100  d-flex justify-content-center align-items-center mb-2 mb-sm-3">
                        <img className="img-logo me-2 " src={logo} alt="Logo" />
                        <Link
                            className="navbar-brand text-center me-0 fw-bold fs-5"
                            to="/market"
                        >
                            SUPERMERCADO MERCATODO
                        </Link>
                    </div>
                    {location.pathname === "/market" || "market/admi" ? (
                        <div className="w-100 d-flex flex-column flex-sm-row justify-content-center ">
                            <form className="m-auto d-flex align-items-center position-relative mb-2 mb-sm-3 ">
                                <input
                                    className="form-control me-sm-2 me-xs-0 rounded-pill"
                                    type="search"
                                    value={data}
                                    placeholder="Buscar"
                                    aria-label="Search"
                                    onChange={onSearchChange}
                                />
                                <span className="position-absolute end-0 me-3 me-sm-4">
                                    <i className="fas fa-search"></i>
                                </span>
                            </form>
                            <select
                                className="form-select m-auto rounded-pill mb-2 mb-sm-3"
                                aria-label="Default select "
                                defaultValue="0"
                                onChange={onSelectChange}
                            >
                                <option value="0">Categorías</option>
                                <option value="1">Cárnicos</option>
                                <option value="2">Lácteos y derivados</option>
                                <option value="3">Embutidos</option>
                                <option value="4">Licores y bebidas</option>
                                <option value="5">Granos</option>
                                <option value="6">Enlatados</option>
                                <option value="7">Frutas y verduras</option>
                                <option value="8">Dulcería</option>
                                <option value="9">Elementos de aseo</option>
                                <option value="10">Desinfectantes</option>
                                <option value="11">Aseo personal</option>
                            </select>
                        </div>
                    ) : null}
                </div>
            </nav>
            {location.pathname === "/market/admi" ? (
                <button className="btn-add p-1 rounded-circle position-absolute">
                    <Link className="text-white " to="/form">
                        <i className="fas fa-plus"></i>
                    </Link>
                </button>
            ) : null}
        </div>
    );
};

export default Navbar;
