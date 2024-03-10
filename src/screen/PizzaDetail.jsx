import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/PizzaContext";
import './pizzaStyle.css';

export default function PizzaDetail() {
    const { id } = useParams();
    const context = useContext(AppContext);
    const { pizzas, cart, setCart, calculateTotalPrice } = context;

    const selectedPizza = pizzas.find((pizza) => pizza.id === id);

    if (!selectedPizza) {
        return <div>Pizza no encontrada.</div>;
    }

    // Función para capitalizar la primera letra
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Formatear el precio con "$" y separadores de miles
    const formattedPrice = selectedPizza.price.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    // Función para agregar la pizza al carrito
    const addToCart = () => {
        // Verificar si la pizza ya está en el carrito
        const pizzaIndex = cart.findIndex((item) => item.id === selectedPizza.id);

        if (pizzaIndex !== -1) {
            // Si la pizza ya está en el carrito, actualiza la cantidad en lugar de agregarla nuevamente
            const updatedCart = [...cart];
            updatedCart[pizzaIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            // Si la pizza no está en el carrito, agrégala con una cantidad inicial de 1
            const newCart = [...cart, { ...selectedPizza, quantity: 1 }];
            setCart(newCart);
        }
        calculateTotalPrice(); // Actualiza el precio total
    };

    return (
        <div className="card pizza-detail-card">
            <img className="card-img-top" src={selectedPizza.img} alt={selectedPizza.name} />
            <div className="card-body">
                <h5 className="card-title">{capitalizeFirstLetter(selectedPizza.name)}</h5>
                <p className="card-text"><strong></strong> {capitalizeFirstLetter(selectedPizza.desc)}</p>
                <p className="card-text">
                    <strong>Ingredientes:</strong>
                </p>
                <ul className="card-text pizza-ingredients">
                    {selectedPizza.ingredients.map((ingredient, index) => (
                        <li key={index}>
                            🍕 {capitalizeFirstLetter(ingredient)}
                        </li>
                    ))}
                </ul>
                <p className="card-text">
                    <strong>Precio:</strong> {formattedPrice}
                </p>
                <div className="button">
                    <button className="btn btn-danger" onClick={addToCart}>
                        Añadir 🛒
                    </button>
                </div>
            </div>
        </div>
    );
}



