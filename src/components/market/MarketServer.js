const API_URL = "https://young-tor-11515.herokuapp.com/api/products/";

export const listMarket = async () => {
    return await fetch(
        API_URL
        //     , {
        //     mode: "cors",
        //     headers: {
        //         "Access-Control-Allow-Origin": "*",
        //     },
        // }
    );
};

export const getProduct = async (id) => {
    return await fetch(`${API_URL}${id}`);
};

export const registerProduct = async (newProduct) => {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // id: parseInt(newProduct.pro_id),
            // pro_id: parseInt(newProduct.pro_id),
            pro_name: String(newProduct.description).trim(),
            pro_description: String(newProduct.description).trim(),
            pro_category: String(newProduct.category).trim(),
            pro_existences: parseInt(newProduct.amount),
            pro_provider: String(newProduct.provider).trim(),
            pro_date: String(newProduct.date).trim(),
        }),
    });
};

export const updateProduct = async (id, updateMarket) => {
    return await fetch(`${API_URL}${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // id: parseInt(updateMarket.id),
            pro_id: parseInt(id),
            pro_name: String(updateMarket.name).trim(),
            pro_description: String(updateMarket.description).trim(),
            pro_category: String(updateMarket.category).trim(),
            pro_existences: parseInt(updateMarket.amount),
            pro_provider: String(updateMarket.provider).trim(),
            pro_date: String(updateMarket.date).trim(),
        }),
    });
};

export const deleteProduct = async (id) => {
    return await fetch(`${API_URL}${id}`, {
        method: "DELETE",
    });
};
