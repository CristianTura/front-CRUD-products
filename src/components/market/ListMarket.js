import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";

// Components:
import MarketItem from "./MarketItem";

import * as MarketServer from "./MarketServer";

const ListMarket = () => {
    const [products, setProducts] = useState([]);

    //obteniendo productos del API
    const listProducts = async () => {
        try {
            const res = await MarketServer.listMarket();
            const data = await res.json();
            setProducts(data);
            // return data;
        } catch (error) {
            console.log(error);
        }
    };

    const { data, selectValue } = useContext(DataContext);

    //filtrando productos
    const filteredChallenges = () => {
        // Si hay algo en el buscador
        if (data.length !== 0) {
            const filtered = products.filter((product) =>
                product.pro_description.toLowerCase().includes(data)
            );
            return filtered;
        } else if (selectValue !== "Categorías") {
            const filterSelect = products.filter((product) =>
                product.pro_category.includes(selectValue)
            );
            return filterSelect;
        } else {
            return products;
        }
    };

    useEffect(() => {
        listProducts();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="table-responsive-md ">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">DESCRIPCION</th>
                        <th scope="col">CATEGORIA</th>
                        <th scope="col">CANT.</th>
                        <th scope="col">PROVEEDOR</th>
                        <th scope="col">FECHA LLEGADA</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredChallenges().map((product) => (
                        <MarketItem
                            key={product.id}
                            id={product.id}
                            description={product.pro_description}
                            category={product.pro_category}
                            amount={product.pro_existences}
                            provider={product.pro_provider}
                            date={product.pro_date}
                            listProducts={listProducts}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListMarket;
