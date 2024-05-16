import { createContext } from "react";
import axios from "axios";

export const Contexts = createContext(null);

export const ContextProver = ({ children }) => {
    const axiosObj = axios.create({
        baseURL: "http://localhost:5080"
    });

    const contextObj = {
        axiosObj
    };

    return (
        <Contexts.Provider value={contextObj}>
            {children}
        </Contexts.Provider>
    );
}