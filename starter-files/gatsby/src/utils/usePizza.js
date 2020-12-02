import { useState, useContext } from 'react';

import OrderContext from '../components/OrderContext';
import formatMoney from './formatMoney';
import calculateOrderTotal from './calculateOrderTotal';
import attachNameAndPrices from './attachNameAndPrices';

export default function usePizza({ pizzas, values }) {
  // 1. create state to hold order
  // We got rid of this line because we moved useState to provider
  // const [order, setOrder] = useState([]);
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // 2. make a function to add things to order
  function addToOder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. make a function to remove things from order
  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  // this is the function run when someone submit the form
  async function submitOrder(e) {
    e.preventDefault();

    // gether all the data
    const body = {
      order: attachNameAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    };

    setLoading(true);
    setError(null);
    setMessage(null);

    // 4. send this data to a serverless function when they checkout

    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const text = JSON.parse(await res.text());

    // check if everything worked
    if (res.status >= 400 && res.status <= 600) {
      setLoading(false);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage('Success!! Come on down for your pizza');
    }
  }

  return {
    order,
    addToOder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
