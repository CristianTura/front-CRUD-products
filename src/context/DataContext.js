import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState("");
    const [selectValue, setSelectValue] = useState("Categorías");

    return (
        <DataContext.Provider
            value={{
                data,
                setData,
                selectValue,
                setSelectValue,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
