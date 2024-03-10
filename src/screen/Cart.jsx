import React, { useContext } from 'react';
import { AppContext } from '../context/PizzaContext';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './CartStyle.css';

export default function Cart() {
    const { cart, calculateTotalPrice, setCart } = useContext(AppContext);

    const decrementQuantity = (pizza) => {
        const updatedCart = [...cart];
        const pizzaIndex = updatedCart.findIndex((item) => item.id === pizza.id);

        if (pizzaIndex !== -1) {
            if (updatedCart[pizzaIndex].quantity > 1) {
                updatedCart[pizzaIndex].quantity -= 1;
            } else {
                // Si la cantidad es 1, simplemente elimina la pizza del carrito si llega a 0.
                updatedCart.splice(pizzaIndex, 1);
            }
            setCart(updatedCart);
        }
    };

    const incrementQuantity = (pizza) => {
        const updatedCart = [...cart];
        const pizzaIndex = updatedCart.findIndex((item) => item.id === pizza.id);

        if (pizzaIndex !== -1) {
            updatedCart[pizzaIndex].quantity += 1;
        }
        setCart(updatedCart);
    };

    const formatTotalPrice = (price) => {
        // Formatear el precio sin decimales y con punto como separador de miles
        return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
    };

    return (
        <Card className="cart">
            <Card.Body>
                <Card.Title>Detalles del pedido:</Card.Title>
                {cart.map((pizza, index) => (
                    <div key={index} className="pizza-cart">
                        <Row>
                            <Col xs={2}>
                                <img src={pizza.img} alt={pizza.name} className="pizza-img" />
                            </Col>
                            <Col xs={7}>
                                <p>{pizza.name.charAt(0).toUpperCase() + pizza.name.slice(1)}</p>
                            </Col>
                            <Col xs={3}>
                                <div className="quantity-control">
                                    <p>{formatTotalPrice(pizza.price * pizza.quantity)}</p>
                                    <Button variant="danger" size="sm" onClick={() => decrementQuantity(pizza)}>-</Button>
                                    <span>{pizza.quantity}</span>
                                    <Button variant="primary" size="sm" onClick={() => incrementQuantity(pizza)}>+</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))}
                <Card.Text>Total: {formatTotalPrice(calculateTotalPrice())}</Card.Text>
                <Button variant="success">Ir a pagar</Button>
            </Card.Body>
        </Card>
    );
}



