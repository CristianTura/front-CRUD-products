import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";

// Components:
import MarketItem from "./MarketItem";

import * as MarketServer from "./MarketServer";

const ListMarket = () => {
    const { data, selectValue } = useContext(DataContext);
    const [products, setProducts] = useState([]);

    //obteniendo productos del API
    const listProducts = async () => {
        try {
            const res = await MarketServer.listMarket();
            const data = await res.json();
            console.log(data.productos);
            setProducts(data.productos);
        } catch (error) {
            console.log(error);
        }
    };

    //filtrando productos
    const filteredChallenges = () => {
        // Si hay algo en el buscador
        if (data.length !== 0) {
            const filtered = products.filter((product) =>
                product.prod_description.toLowerCase().includes(data)
            );
            return filtered;
        } else if (selectValue !== "Categorías") {
            const filterSelect = products.filter((product) =>
                product.prod_category.includes(selectValue)
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
                            key={product.prod_id}
                            id={product.prod_id}
                            description={product.prod_name}
                            category={product.prod_category}
                            amount={product.prod_existences}
                            provider={product.prod_provider}
                            date={product.prod_date}
                            listProducts={listProducts}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListMarket;
