import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "./marketStyles.css";
import { Link } from "react-router-dom";

import * as MarketServer from "./MarketServer";

const MarketForm = () => {
    const history = useHistory();
    const params = useParams();

    // console.log(params);

    const initialState = {
        id: null,
        name: "",
        description: "",
        category: "",
        amount: "",
        privider: "",
        date: "",
    };
    const [market, setmarket] = useState(initialState);

    const handleInputChange = (e) => {
        // console.log(e.target.name);
        setmarket({ ...market, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            if (!params.id) {
                res = await MarketServer.registerProduct(market);
                const data = await res.json();
                if (data.message === "Exito") {
                    setmarket(initialState);
                }
            } else {
                // console.log(market);
                await MarketServer.updateProduct(params.id, market);
            }

            history.push("/market/admi");
        } catch (error) {
            console.log(error);
        }
    };

    const getProduct = async (idProduct) => {
        try {
            const res = await MarketServer.getProduct(idProduct);
            const data = await res.json();
            // console.log(data.producto);
            const {
                prod_id,
                prod_name,
                prod_description,
                prod_category,
                prod_existences,
                prod_provider,
                prod_date,
            } = data.producto;
            setmarket({
                id: prod_id,
                name: prod_name,
                description: prod_description,
                category: prod_category,
                amount: prod_existences,
                provider: prod_provider,
                date: prod_date,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params.id) {
            getProduct(params.id);
        }
        // console.log(market);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="col-md-6 offset-md-3 mt-4">
            <div className="market">
                <div className="market-body">
                    <form onSubmit={handleSubmit} className=" p-3">
                        <div className="form-group mb-1">
                            <input
                                type="text"
                                name="name"
                                placeholder="DESCRIPCION"
                                className="form-control"
                                value={market.name}
                                onChange={handleInputChange}
                                autoFocus
                                required
                            />
                        </div>
                        <div className="form-group mb-1">
                            <input
                                type="text"
                                name="amount"
                                placeholder="CANTIDAD"
                                className="form-control"
                                value={market.amount}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group mb-1">
                            <input
                                type="text"
                                name="category"
                                placeholder="CATEGORIA"
                                className="form-control"
                                value={market.category}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group mb-1">
                            <input
                                type="text"
                                name="provider"
                                placeholder="PROVEEDOR"
                                className="form-control"
                                value={market.provider}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group mb-1">
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                value={market.date}
                                onChange={handleInputChange}
                            />
                        </div>
                        {params.id ? (
                            <button className="btn btn-primary mt-2 rounded-pill ms-3">
                                ACTUALIZAR
                            </button>
                        ) : (
                            <button className="btn btn-light mt-2 rounded-pill ms-3">
                                AGREGAR
                            </button>
                        )}

                        <Link
                            to="/market/admi"
                            className="btn btn-back text-white mt-2 float-end rounded-pill me-3"
                        >
                            VOLVER
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MarketForm;
