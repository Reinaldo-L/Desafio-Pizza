import React, { createContext, useContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export default function PizzaContext({ children }) {
    const [pizzas, setPizzas] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('/pizzas.json')
            .then((response) => response.json())
            .then((data) => setPizzas(data))
            .catch((error) => console.error('Error loading pizzas:', error));
    }, []);

    const calculateTotalPrice = () => {
        const totalPrice = cart.reduce((total, pizza) => total + pizza.price * pizza.quantity, 0);
        return totalPrice;
    };

    return (
        <AppContext.Provider value={{ pizzas, cart, setCart, calculateTotalPrice }}>
            {children}
        </AppContext.Provider>
    );
}
