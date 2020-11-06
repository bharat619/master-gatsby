import { useState, useContext } from 'react';

import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. create state to hold order
  // We got rid of this line because we moved useState to provider
  // const [order, setOrder] = useState([]);
  const [order, setOrder] = useContext(OrderContext);

  // 2. make a function to add things to order
  function addToOder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. make a function to remove things from order
  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }
  // 4. send this data to a serverless function when they checkout

  return {
    order,
    addToOder,
    removeFromOrder,
  };
}
