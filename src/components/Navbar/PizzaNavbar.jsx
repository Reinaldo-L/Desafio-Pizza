import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import pizzaImage from '../../img/pizza.png';
import carroImage from '../../img/carrito-de-compras.png';
import { useAppContext } from '../../context/PizzaContext';
import './navStyles.css';

export default function PizzaNavbar() {
    const { cart, calculateTotalPrice } = useAppContext();

    // Función para formatear el precio sin decimales
    const formatPrice = (price) => {
        return price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    };

    return (
        <div className="nav bg-info text-light fixed-top">
            <Container>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex align-items-center">
                        <NavLink to="/" className="nav-link text-light text-link" style={{ fontSize: '24px' }}>
                            <img
                                src={pizzaImage}
                                alt="Pizza"
                                style={{ width: '35px', height: '35px', marginRight: '10px' }}
                            />
                            Pizzería Mamma Mia!
                        </NavLink>
                    </div>
                    <div className="d-flex">
                        <NavLink to="/carrito" className="nav-link text-light cart-link" style={{ fontSize: '30px' }}>
                            <img
                                src={carroImage}
                                alt="carro"
                                style={{ width: '35px', height: '35px', marginBottom: '10px' }}
                            />
                            <span className="cart-text">
                                {cart.length > 0 && `${formatPrice(calculateTotalPrice())}`}
                            </span>
                        </NavLink>
                    </div>
                </div>
            </Container>
        </div>
    );
}
