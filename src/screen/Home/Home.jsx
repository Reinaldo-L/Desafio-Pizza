import React, { useContext } from 'react';
import "./homeStyle.css";
import { AppContext } from '../../context/PizzaContext';
import PizzaCard from "../../components/PizzaCard/PizzaCard";
import LoadingCard from "../../components/PizzaCard/LoadingCard";
import Header from '../../components/Header/Header'; // Importa el componente Header

export default function Home() {
    const context = useContext(AppContext);
    const allPizzas = context.pizzas;

    return (
        <div className="home">
            <Header /> 
            <section>
                {allPizzas ? (
                    allPizzas.map((pizza) => (
                        <PizzaCard key={pizza.id} pizza={pizza} />
                    ))
                ) : (
                    <LoadingCard />
                )}
            </section>
        </div>
    );
}
