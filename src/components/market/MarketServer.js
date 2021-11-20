const API_URL = "https://safe-river-82717.herokuapp.com/product/";

export const listMarket = async () => {
    return await fetch(API_URL);
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
            prod_name: String(newProduct.name).trim(),
            prod_description: String(newProduct.description).trim(),
            prod_category: String(newProduct.category).trim(),
            prod_existences: parseInt(newProduct.amount),
            prod_provider: String(newProduct.provider).trim(),
            prod_date: String(newProduct.date).trim(),
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
            prod_id: parseInt(updateMarket.id),
            // prod_id: parseInt(id),
            prod_name: String(updateMarket.name).trim(),
            prod_description: String(updateMarket.description).trim(),
            prod_category: String(updateMarket.category).trim(),
            prod_existences: parseInt(updateMarket.amount),
            prod_provider: String(updateMarket.provider).trim(),
            prod_date: String(updateMarket.date).trim(),
        }),
    });
};

export const deleteProduct = async (id) => {
    return await fetch(`${API_URL}${id}`, {
        method: "DELETE",
    });
};
