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
        // id: 3,
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
                if (data.message === "Success") {
                    setmarket(initialState);
                }
            } else {
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
            const {
                id,
                pro_description,
                pro_category,
                pro_existences,
                pro_provider,
                pro_date,
            } = data;
            setmarket({
                id: id,
                description: pro_description,
                category: pro_category,
                amount: pro_existences,
                provider: pro_provider,
                date: pro_date,
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
                                name="description"
                                placeholder="DESCRIPCION"
                                className="form-control"
                                value={market.description}
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
