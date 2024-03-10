import React, { useContext } from 'react';
import { AppContext } from '../../context/PizzaContext';
import { NavLink } from 'react-router-dom';

export default function PizzaCard({ pizza }) {
    const { cart, setCart, calculateTotalPrice } = useContext(AppContext);

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const formattedPrice = pizza.price.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    const addToCart = () => {
        const existingPizza = cart.find((item) => item.id === pizza.id);

        if (existingPizza) {
            existingPizza.quantity += 1;
            setCart([...cart]);
        } else {
            const newPizza = { ...pizza, quantity: 1 };
            setCart([...cart, newPizza]);
        }

        calculateTotalPrice();
    };

    const handleVerMasClick = () => {
        // Navegar a PizzaDetail y luego desplazar hacia arriba
        window.scrollTo(0, 0);
    };

    return (
        <div className="pizza-card">
            <img className="pizza-image" src={pizza.img} alt={pizza.name} />
            <h2 className="pizza-name">{capitalizeFirstLetter(pizza.name)}</h2>
            <div className="pizza-ingredients">
                <p>Ingredientes: </p>
                <ul>
                    {pizza.ingredients.map((ingredient, index) => (
                        <li key={index}>{capitalizeFirstLetter(ingredient)}</li>
                    ))}
                </ul>
            </div>
            <p className="pizza-price">{formattedPrice}</p>
            <div className="button-container">
                <NavLink to={`/pizza/${pizza.id}`} className="btn btn-info" onClick={handleVerMasClick}>
                    👀 Ver más
                </NavLink>
                <button className="btn btn-danger" onClick={addToCart}>
                    Añadir 🛒
                </button>
            </div>
        </div>
    );
}
